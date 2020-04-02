import React, { Component } from 'react';

import Loader from './Loader.js';
import Story from './Story.js';
import { ThemeConsumer } from './ThemeContext.js';

import { getStoriesFromId } from '../api/hn/hn-api';
import { insertInnerHtml } from '../util/insertInnerHtml.js';

export default class Posts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: []
		};
	}
	componentDidMount() {
		const { postIds } = this.props;
		this.updateUserPosts(postIds);
	}

	updateUserPosts = Ids => {
		getStoriesFromId(Ids)
			.then(data => this.setState({ posts: data }))
			.catch(error => console.log(error));
	};

	render() {
		const { posts } = this.state;
		const { user } = this.props;

		return (
			<ThemeConsumer>
				{({ theme }) => (
					<React.Fragment>
						{!user ? (
							<Loader label='Loading User' />
						) : (
							<React.Fragment>
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
							</React.Fragment>
						)}
						{!posts.length ? (
							<Loader label='Fetching Posts' />
						) : (
							<React.Fragment>
								<h2>Posts</h2>
								<ul>
									{posts.map(post => {
										if (post) {
											return (
												<li key={post.id} style={{ margin: '20px 0' }}>
													<Story story={post} />
												</li>
											);
										}
									})}
								</ul>
							</React.Fragment>
						)}
					</React.Fragment>
				)}
			</ThemeConsumer>
		);
	}
}
