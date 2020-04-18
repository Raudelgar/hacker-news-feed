import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import Loader from '../loader/Loader.js';
import Story from '../stories/Story.js';
import ThemeContext from '../context/ThemeContext.js';
import './Posts.css';

import { getStoriesFromId } from '../../api/hn/hn-api';
import { insertInnerHtml } from '../../util/insertInnerHtml.js';

export default function Posts(props) {
	const [posts, setPosts] = useState([]);
	const { theme } = useContext(ThemeContext);

	useEffect(() => {
		const { postIds } = props;
		updateUserPosts(postIds);
	}, []);

	const updateUserPosts = (Ids) => {
		getStoriesFromId(Ids)
			.then((data) => setPosts(data))
			.catch((error) => console.log(error));
	};

	const { user } = props;
	return (
		<>
			{!user ? (
				<Loader label='Loading User' />
			) : (
				<>
					<h1 className={`header post-${theme}`}>{user.id}</h1>
					<div className={`meta-info-${theme}`}>
						<span>
							joined {new Date(user.created * 1000).toLocaleString()}{' '}
						</span>
						<span>has {user.karma.toLocaleString()} karma</span>
					</div>
					{user.about && (
						<p dangerouslySetInnerHTML={insertInnerHtml(user.about)}></p>
					)}
				</>
			)}
			{!posts.length ? (
				<Loader label='Fetching Posts' />
			) : (
				<>
					<h2>Posts</h2>
					<ul>
						{posts.map((post) => {
							if (post) {
								return (
									<li key={post.id} style={{ margin: '20px 0' }}>
										<Story story={post} />
									</li>
								);
							}
						})}
					</ul>
				</>
			)}
		</>
	);
}

Posts.propTypes = {
	postIds: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
};
