import React, { useReducer, useEffect } from 'react';
import queryString from 'query-string';
import { fetchStorieById } from '../api/hn/hn-api.js';

import ErrorHandler from './ErrorHandler.js';
import Loader from '../loader/Loader.js';

function commentsContentReducer(state, action) {
	switch (action.type) {
		case 'resolve':
			return {
				header: action.header,
				commentsIds: action.commentsIds,
				error: null,
				loading: false,
			};
		case 'reject':
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return new Error(`The ${action.type} is not supported`);
	}
}

const initialState = {
	header: null,
	commentsIds: [],
	error: null,
	loading: true,
};

export default function CommentsContent(props) {
	const [state, dispatch] = useReducer(commentsContentReducer, initialState);

	useEffect(() => {
		updatePostId();
	}, []);

	const updatePostId = () => {
		const { id } = queryString.parse(props.location.search);

		fetchStorieById(id)
			.then((data) =>
				dispatch({
					type: 'resolve',
					header: data,
					commentsIds: data.kids ? data.kids : null,
				})
			)
			.catch((err) => dispatch({ type: 'reject', payload: err }));
	};

	const { header, commentsIds, error, loading } = state;
	return (
		<>
			{loading && <Loader />}
			{error && <ErrorHandler error={error} />}
			{!error &&
				!loading &&
				props.children({
					header,
					commentsIds,
					loading,
				})}
		</>
	);
}
