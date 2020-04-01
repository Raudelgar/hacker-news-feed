import React from 'react';
import PropTypes from 'prop-types';

import StoryInfo from './StoryInfo.js';

export default function Story({ story }) {
	// console.log(story);
	const { by, descendants, id, kids, score, time, title, type, url } = story;

	return (
		<React.Fragment>
			{title && (
				<React.Fragment>
					<a href={url} target='_blank' className='link'>
						{title}
					</a>
					<StoryInfo info={{ by, time, id, descendants }} />
				</React.Fragment>
			)}
		</React.Fragment>
	);
}

Story.propTypes = {
	story: PropTypes.object.isRequired
};
