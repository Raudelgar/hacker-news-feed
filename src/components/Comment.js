import React from 'react';

export default function Comment({ comment }) {
	const { by, time, text } = comment;
	function insertInnerHtml() {
		return { __html: text };
	}

	return (
		<div className='comment'>
			<div className='meta-info-light'>
				<span>by {by} </span>
				<span>on {new Date(time * 1000).toLocaleString()} </span>
			</div>
			<p dangerouslySetInnerHTML={insertInnerHtml()}></p>
		</div>
	);
}
