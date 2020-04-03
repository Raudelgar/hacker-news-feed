import React from 'react';
import PropTypes from 'prop-types';

import { insertInnerHtml } from '../util/insertInnerHtml.js';
import { ThemeConsumer } from './ThemeContext.js';
import Comments from './Comments.js';

export default function Comment({ comment }) {
	const { by, time, text } = comment;
	return (
		<ThemeConsumer>
			{({ theme }) => (
				<div className={`comment-${theme}`}>
					<div className={`meta-info-${theme}`}>
						<span>by {by} </span>
						<span>on {new Date(time * 1000).toLocaleString()} </span>
					</div>
					<p dangerouslySetInnerHTML={insertInnerHtml(text)}></p>
				</div>
			)}
		</ThemeConsumer>
	);
}

Comment.propTypes = {
	comment: PropTypes.object.isRequired
};
