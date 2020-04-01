import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function StoryInfo({ info }) {
	const { by, time, id, descendants } = info;
	return (
		<div className='meta-info-light'>
			<span>
				by{' '}
				<Link
					className='link-dec-light'
					to={{
						pathname: '/user',
						search: `?id=${by}`
					}}
				>
					{by}
				</Link>{' '}
			</span>
			<span>on {new Date(time * 1000).toLocaleString()} </span>
			<span>
				with{' '}
				<Link
					className='link-dec-light'
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
