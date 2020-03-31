import React from 'react';
import PropTypes from 'prop-types';

import Story from './Story.js';

export default function Stories({ stories }) {
	return (
		<ul>
			{stories.map(story => (
				<li key={story.id} style={{ margin: '20px 0' }}>
					<Story story={story} />
				</li>
			))}
		</ul>
	);
}

Stories.propTypes = {
	stories: PropTypes.array.isRequired
};
