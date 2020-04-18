import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import Story from './Story.js';
import Loader from '../loader/Loader.js';
import ErrorHandler from '../errorHandler/ErrorHandler.js';
import { getStoriesFromId } from '../../api/hn/hn-api.js';

import './Story.css';

function storiesReducer(state, action) {
	switch (action.type) {
		case 'resolve':
			return {
				stories: action.payload,
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
	stories: [],
	error: null,
	loading: true,
};

export default function Stories(props) {
	const [state, dispatch] = useReducer(storiesReducer, initialState);

	useEffect(() => {
		const { storiesIds } = props;
		updateStories(storiesIds);
	}, [props]);

	const updateStories = (storiesIds) => {
		getStoriesFromId(storiesIds)
			.then((data) => dispatch({ type: 'resolve', payload: data }))
			.catch((err) => dispatch({ type: 'reject', payload: err }));
	};

	const { stories, loading, error } = state;

	return (
		<>
			{loading && <Loader />}
			{error && !loading && <ErrorHandler error={error} />}
			{!loading && (
				<ul>
					{stories.map((story) => {
						if (story) {
							return (
								<li key={story.id} style={{ margin: '20px 0' }}>
									<Story story={story} />
								</li>
							);
						}

						return null;
					})}
				</ul>
			)}
		</>
	);
}

Stories.propTypes = {
	storiesIds: PropTypes.array.isRequired,
};
