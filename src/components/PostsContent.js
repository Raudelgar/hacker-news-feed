import React, { Component } from 'react';
import queryString from 'query-string';
import { fetchUserById } from '../api/hn/hn-api.js';

import ErrorHandler from './ErrorHandler.js';
import Loader from './Loader.js';

export default class PostsContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			postIds: [],
			error: null,
			loading: true
		};
	}
	componentDidMount() {
		this.updateUserById();
	}

	updateUserById = () => {
		const { id } = queryString.parse(this.props.location.search);

		fetchUserById(id)
			.then(data =>
				this.setState({ user: data, postIds: data.submitted, loading: false })
			)
			.catch(err => this.setState({ error: err, loading: false }));
	};

	render() {
		const { user, postIds, error, loading } = this.state;

		return (
			<React.Fragment>
				{loading && <Loader />}
				{error && <ErrorHandler error={error} />}
				{!error &&
					!loading &&
					this.props.children({
						user,
						postIds,
						loading
					})}
			</React.Fragment>
		);
	}
}
