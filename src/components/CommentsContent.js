import React, { Component } from 'react';
import queryString from 'query-string';
import { fetchStorieById } from '../api/hn/hn-api.js';

import ErrorHandler from './ErrorHandler.js';
import Loader from './Loader.js';

export default class CommentsContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			header: null,
			commentsIds: [],
			error: null,
			loading: true
		};
	}
	componentDidMount() {
		this.updatePostId();
	}

	updatePostId = () => {
		const { id } = queryString.parse(this.props.location.search);

		fetchStorieById(id)
			.then(data =>
				this.setState({
					header: data,
					commentsIds: data.kids ? data.kids : null,
					error: null,
					loading: false
				})
			)
			.catch(err => this.setState({ error: err, loading: false }));
	};

	render() {
		const { header, commentsIds, error, loading } = this.state;

		return (
			<React.Fragment>
				{loading && <Loader />}
				{error && <ErrorHandler error={error} />}
				{!error &&
					!loading &&
					this.props.children({
						header,
						commentsIds,
						loading
					})}
			</React.Fragment>
		);
	}
}
