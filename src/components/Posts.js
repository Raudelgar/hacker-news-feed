import React, { Component } from 'react';
import queryString from 'query-string';

import Loader from './Loader.js';
import Story from './Story.js';

import { fetchUserById, getStoriesFromId } from '../api/hn/hn-api';
import { insertInnerHtml } from '../util/insertInnerHtml.js';

export default class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			postIds: [],
			posts: []
		};
	}
	componentDidMount() {
		const { id } = queryString.parse(this.props.location.search);

		fetchUserById(id)
			.then(data => this.setState({ user: data, postIds: data.submitted }))
			.catch(err => console.log(err));
	}

	componentDidUpdate(prevProps, prevState) {
		const { postIds } = this.state;
		if (prevState.postIds.length !== postIds.length) {
			getStoriesFromId(postIds)
				.then(data => this.setState({ posts: data }))
				.catch(error => console.log(error));
		}
	}

	render() {
		const { user, posts } = this.state;

		return (
			<React.Fragment>
				{!posts.length ? (
					<Loader />
				) : (
					<React.Fragment>
						<h1 className='header post-light'>{user.id}</h1>
						<div className='meta-info-light'>
							<span>
								joined {new Date(user.created * 1000).toLocaleString()}{' '}
							</span>
							<span>has {user.karma.toLocaleString()} karma</span>
						</div>
						<p dangerouslySetInnerHTML={insertInnerHtml(user.about)}></p>
						<h2>Posts</h2>
						<ul>
							{posts.map(post => (
								<li key={post.id} style={{ margin: '20px 0' }}>
									<Story story={post} />
								</li>
							))}
						</ul>
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}
