import React, { Component } from 'react';

import { getStoriesFromId } from '../api/hn/hn-api';
import CommentsContent from './CommentsContent.js';
import Loader from './Loader.js';
import ErrorHandler from './ErrorHandler.js';

export default class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			error: null
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
			.then(data => this.setState({ comments: data, error: null }))
			.catch(err => this.setState({ error: err }));
	};

	render() {
		const { comments, error } = this.state;
		const { header } = this.props;
		return (
			<React.Fragment>
				{!header && !error && <Loader />}
				{error && <ErrorHandler error={error} />}
				{!error && <CommentsContent content={{ header, comments }} />}
			</React.Fragment>
		);
	}
}
