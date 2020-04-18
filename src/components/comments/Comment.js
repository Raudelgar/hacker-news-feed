import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Comment.css';

import { insertInnerHtml } from '../../util/insertInnerHtml.js';
import ThemeContext from './../context/ThemeContext.js';

export default function Comment({ comment }) {
	const { theme } = useContext(ThemeContext);
	const { by, time, text } = comment;
	return (
		<div className={`comment-${theme}`}>
			<div className={`meta-info-${theme}`}>
				<span>by {by} </span>
				<span>on {new Date(time * 1000).toLocaleString()} </span>
			</div>
			<p dangerouslySetInnerHTML={insertInnerHtml(text)}></p>
		</div>
	);
}

Comment.propTypes = {
	comment: PropTypes.object.isRequired,
};
