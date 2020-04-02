import React, { Component } from 'react';

import { getStoriesFromId } from '../api/hn/hn-api';
import CommentsContent from './CommentsContent.js';
import Loader from './Loader.js';

export default class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: []
		};
	}

	componentDidMount() {
		const { commentsIds } = this.props;
		if (!commentsIds) {
			this.setState({ comments: null });
		} else if (commentsIds && commentsIds.length) {
			this.updatePosts(commentsIds);
		}
	}

	updatePosts = Ids => {
		getStoriesFromId(Ids)
			.then(data => this.setState({ comments: data }))
			.catch(error => console.log(error));
	};

	render() {
		const { comments } = this.state;
		const { header } = this.props;
		return (
			<React.Fragment>
				{!header ? (
					<Loader />
				) : (
					<CommentsContent content={{ header, comments }} />
				)}
			</React.Fragment>
		);
	}
}
