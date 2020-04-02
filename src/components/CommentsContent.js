import React from 'react';
import PropTypes from 'prop-types';

import Loader from './Loader.js';
import StoryInfo from './StoryInfo.js';
import Comment from './Comment.js';

export default function CommentsContent({ content }) {
	const { header, comments } = content;
	return (
		<React.Fragment>
			<h1 className='header'>
				<a href='' className='link'>
					{header.title}
				</a>
			</h1>
			<StoryInfo info={header} />
			<br></br>
			{!comments.length ? (
				<Loader label='Fetching Posts' />
			) : (
				<React.Fragment>
					{comments.map(comment => {
						if (comment) return <Comment key={comment.id} comment={comment} />;
					})}
				</React.Fragment>
			)}
		</React.Fragment>
	);
}

CommentsContent.propTypes = {
	content: PropTypes.object.isRequired
};
