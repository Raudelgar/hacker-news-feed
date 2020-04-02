import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ThemeConsumer } from './ThemeContext.js';

export default function StoryInfo({ info }) {
	const { by, time, id, descendants } = info;

	return (
		<ThemeConsumer>
			{({ theme }) => (
				<div className={`meta-info-${theme}`}>
					<span>
						by{' '}
						<Link
							className={`link-dec-${theme}`}
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
							className={`link-dec-${theme}`}
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
			)}
		</ThemeConsumer>
	);
}

StoryInfo.propTypes = {
	info: PropTypes.object.isRequired
};
