import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

import Story from './Story.js';
import Loader from '../loader/Loader.js';
import ErrorHandler from '../errorHandler/ErrorHandler.js';
import { getStoriesFromId } from '../../api/hn/hn-api.js';
import useContent from '../hooks/useContent.js';

import './Story.css';

function storiesReducer(state, action) {
	switch (action.type) {
		case 'load':
			return {
				...state,
				loading: true,
			};
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
		case 'init':
			return {
				stories: [],
				error: null,
				loading: true,
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
	const data = useContent(props.type);

	useEffect(() => {
		const { storiesIds, error, loading } = data;

		if (loading) {
			dispatch({ type: 'load' });
		} else if (error) {
			dispatch({ type: 'reject', payload: error });
		} else {
			updateStories(storiesIds);
		}

		return () => dispatch({ type: 'init' });
	}, [data]);

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
	type: PropTypes.string.isRequired,
};
