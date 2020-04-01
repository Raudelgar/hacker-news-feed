import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function StoryInfo({ info }) {
	const { by, time, id, descendants } = info;
	return (
		<div className='meta-info-light'>
			<span>by {by} </span>
			<span>on {new Date(time * 1000).toLocaleString()} </span>
			<span>
				with{' '}
				<Link
					to={{
						pathname: '/comments',
						search: `?id=${id}`
					}}
				>
					{descendants}
				</Link>{' '}
				comments{' '}
			</span>
		</div>
	);
}

StoryInfo.propTypes = {
	info: PropTypes.object.isRequired
};
