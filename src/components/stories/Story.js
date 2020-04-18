import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import StoryInfo from './StoryInfo.js';
import ThemeContext from '../context/ThemeContext.js';

export default function Story({ story }) {
	const { theme } = useContext(ThemeContext);
	const { by, descendants, id, time, title, url } = story;

	return (
		<>
			{title && (
				<>
					<a href={url} target='_blank' className={`link-${theme}`}>
						{title}
					</a>
					<StoryInfo info={{ by, time, id, descendants }} />
				</>
			)}
		</>
	);
}

Story.propTypes = {
	story: PropTypes.object.isRequired,
};
