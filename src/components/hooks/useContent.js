import { useReducer, useEffect } from 'react';

import { fetchAllStories } from '../../api/hn/hn-api.js';

function reducer(state, action) {
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
	storiesIds: [],
	error: null,
	loading: true,
};

export default function useContent(type) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		updateStoriesIds(type);
	}, [type]);

	const updateStoriesIds = (type) => {
		fetchAllStories(type)
			.then((data) => dispatch({ type: 'resolve', payload: data }))
			.catch((err) => dispatch({ type: 'reject', payload: err }));
	};

	return state;
}
