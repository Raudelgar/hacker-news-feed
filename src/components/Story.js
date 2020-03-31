import React from 'react';
import PropTypes from 'prop-types';

export default function Story({ story }) {
	console.log(story);
	const { by, descendants, kids, score, time, title, type, url } = story;

	return (
		<React.Fragment>
			<a href={url} target='_blank' className='link'>
				{title}
			</a>
			<div className='meta-info-light'>
				<span>by {by} </span>
				<span>on {new Date(time * 1000).toLocaleString()} </span>
				<span>with {descendants} comments </span>
			</div>
		</React.Fragment>
	);
}

Story.propTypes = {
	story: PropTypes.object.isRequired
};
