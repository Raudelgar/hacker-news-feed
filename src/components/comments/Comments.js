import React, { useReducer, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { getStoriesFromId } from '../../api/hn/hn-api.js';
import Loader from '../loader/Loader.js';
import ErrorHandler from '../errorHandler/ErrorHandler.js';
import StoryInfo from '../stories/StoryInfo.js';
import Comment from './Comment.js';
import ThemeContext from '../context/ThemeContext.js';
import CommentsContent from './CommentsContent';

function commentsReducer(state, action) {
	switch (action.type) {
		case 'resolve':
			return {
				comments: action.payload,
				error: null,
			};
		case 'reject':
			return {
				...state,
				err: action.payload,
			};
		case 'init':
			return {
				comments: null,
				error: null,
			};
		default:
			return new Error(`The ${action.type} is not supported`);
	}
}

const initialState = {
	comments: [],
	error: null,
};

export default function Comments(props) {
	const [state, dispatch] = useReducer(commentsReducer, initialState);
	const { theme } = useContext(ThemeContext);

	useEffect(() => {
		const { commentsIds } = props;
		if (!commentsIds) {
			dispatch({ type: 'init' });
		} else if (commentsIds && commentsIds.length) {
			updatePosts(commentsIds);
		}
	}, [props]);

	const updatePosts = (Ids) => {
		getStoriesFromId(Ids)
			.then((data) => dispatch({ type: 'resolve', payload: data }))
			.catch((err) => dispatch({ type: 'reject', payload: err }));
	};

	const { comments, error } = state;
	const { header } = props;
	return (
		<>
			{!header && !error && <Loader />}
			{error && <ErrorHandler error={error} />}
			{!error && (
				<>
					<h1 className={`header-${theme}`}>
						<a
							href={header.url}
							rel='noopener noreferrer'
							target='_blank'
							className={`link-${theme}`}
						>
							{header.title}
						</a>
					</h1>
					<StoryInfo info={header} />
					<br></br>
					{comments && !comments.length && <Loader label='Fetching Posts' />}
					{comments && (
						<>
							{comments.map((comment) => {
								if (comment) {
									return <Comment key={comment.id} comment={comment} />;
								}

								return null;
							})}
						</>
					)}
				</>
			)}
		</>
	);
}

CommentsContent.propTypes = {
	commentsIds: PropTypes.array,
	header: PropTypes.object,
};
