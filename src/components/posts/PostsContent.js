import React, { useReducer, useEffect } from 'react';
import queryString from 'query-string';
import { fetchUserById } from '../../api/hn/hn-api.js';

import ErrorHandler from '../errorHandler/ErrorHandler.js';
import Loader from '../loader/Loader.js';

function postsContentReducer(state, action) {
	switch (action.type) {
		case 'resolve':
			return {
				user: action.user,
				postIds: action.postIds,
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
	user: null,
	postIds: [],
	error: null,
	loading: true,
};

export default function PostsContent(props) {
	const [state, dispatch] = useReducer(postsContentReducer, initialState);

	useEffect(() => {
		updateUserById();
	}, []);

	const updateUserById = () => {
		const { id } = queryString.parse(props.location.search);

		fetchUserById(id)
			.then((data) =>
				dispatch({ type: 'resolve', user: data, postIds: data.submitted })
			)
			.catch((err) => dispatch({ type: 'reject', payload: err }));
	};

	const { user, postIds, error, loading } = state;

	return (
		<>
			{loading && <Loader />}
			{error && <ErrorHandler error={error} />}
			{!error &&
				!loading &&
				props.children({
					user,
					postIds,
					loading,
				})}
		</>
	);
}
