import React, { Component } from 'react';
import queryString from 'query-string';

import Loader from './Loader.js';
import StoryInfo from './StoryInfo.js';
import Comment from './Comment.js';
import { fetchStorieById, getStoriesFromId } from '../api/hn/hn-api';

export default class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			header: null,
			commentsIds: [],
			comments: []
		};
	}
	componentDidMount() {
		const { id } = queryString.parse(this.props.location.search);

		fetchStorieById(id)
			.then(data => this.setState({ header: data, commentsIds: data.kids }))
			.catch(err => console.log(err));
	}

	componentDidUpdate(prevProps, prevState) {
		const { commentsIds } = this.state;
		if (prevState.commentsIds.length !== commentsIds.length) {
			getStoriesFromId(commentsIds)
				.then(data => this.setState({ comments: data }))
				.catch(error => console.log(error));
		}
	}

	render() {
		const { header, comments } = this.state;

		return (
			<React.Fragment>
				{!comments.length ? (
					<Loader />
				) : (
					<React.Fragment>
						<h1 className='header'>
							<a href='' className='link'>
								{header.title}
							</a>
						</h1>
						<StoryInfo info={header} />
						<br></br>
						{comments.map(comment => (
							<Comment key={comment.id} comment={comment} />
						))}
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}
