import React from 'react';

import { insertInnerHtml } from '../util/insertInnerHtml.js';

export default function Comment({ comment }) {
	const { by, time, text } = comment;
	return (
		<div className='comment'>
			<div className='meta-info-light'>
				<span>by {by} </span>
				<span>on {new Date(time * 1000).toLocaleString()} </span>
			</div>
			<p dangerouslySetInnerHTML={insertInnerHtml(text)}></p>
		</div>
	);
}
