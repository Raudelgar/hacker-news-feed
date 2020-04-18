import React, { useReducer, useEffect } from 'react';

import { fetchAllStories } from '../../api/hn/hn-api.js';

import ErrorHandler from '../errorHandler/ErrorHandler.js';
import Loader from '../loader/Loader.js';

function newContentReducer(state, action) {
	switch (action.type) {
		case 'resolve':
			return {
				storiesIds: action.payload,
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
	type: 'newstories',
	storiesIds: [],
	error: null,
	loading: true,
};

export default function NewContent(props) {
	const [state, dispatch] = useReducer(newContentReducer, initialState);

	useEffect(() => {
		updateStoriesIds();
	}, []);

	const updateStoriesIds = () => {
		const { type } = state;
		fetchAllStories(type)
			.then((data) => dispatch({ type: 'resolve', payload: data }))
			.catch((err) => dispatch({ type: 'reject', payload: err }));
	};

	const { storiesIds, error, loading } = state;

	return (
		<>
			{loading && <Loader />}
			{error && <ErrorHandler error={error} />}
			{!error &&
				!loading &&
				props.children({
					storiesIds,
					loading,
				})}
		</>
	);
}
