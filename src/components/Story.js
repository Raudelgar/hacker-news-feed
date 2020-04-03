import React from 'react';
import PropTypes from 'prop-types';

import StoryInfo from './StoryInfo.js';
import { ThemeConsumer } from './ThemeContext.js';

export default function Story({ story }) {
	const { by, descendants, id, time, title, url } = story;
	console.log('--return/Story--');
	return (
		<ThemeConsumer>
			{({ theme }) => (
				<React.Fragment>
					{title && (
						<React.Fragment>
							<a href={url} target='_blank' className={`link-${theme}`}>
								{title}
							</a>
							<StoryInfo info={{ by, time, id, descendants }} />
						</React.Fragment>
					)}
				</React.Fragment>
			)}
		</ThemeConsumer>
	);
}

Story.propTypes = {
	story: PropTypes.object.isRequired
};
