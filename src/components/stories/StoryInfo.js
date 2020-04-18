import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ThemeContext from '../context/ThemeContext.js';

export default function StoryInfo({ info }) {
	const { by, timeStr, id, descendants } = info;
	const { theme } = useContext(ThemeContext);

	return (
		<div className={`meta-info-${theme}`}>
			<span>
				by{' '}
				<Link
					className={`link-dec-${theme}`}
					to={{
						pathname: '/user',
						search: `?id=${by}`,
					}}
				>
					{by}
				</Link>{' '}
			</span>
			<span>on {timeStr} </span>
			<span>
				with{' '}
				<Link
					className={`link-dec-${theme}`}
					to={{
						pathname: '/comments',
						search: `?id=${id}`,
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
	info: PropTypes.object.isRequired,
};
