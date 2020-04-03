import React, { Component } from 'react';
import queryString from 'query-string';

import {
	fetchAllStories,
	fetchStorieById,
	fetchUserById
} from '../api/hn/hn-api.js';

import Loader from './Loader.js';
import ErrorHandler from './ErrorHandler.js';

export default class Store extends Component {
	constructor(props) {
		super(props);
		this.state = {
			types: ['topstories', 'newstories'],
			storiesIds: [],
			header: null,
			commentsIds: [],
			user: null,
			postIds: [],
			loading: true,
			error: null
		};
	}
	componentDidMount() {
		this.updateStoriesIds();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.path !== this.props.match.path) {
			this.setState({ loading: true, error: null });
			this.updateStoriesIds();
		}
	}

	updateStoriesIds = () => {
		const { path } = this.props.match;
		const { types } = this.state;

		switch (path) {
			case '/user':
				this.updateUserById();
				break;
			case '/comments':
				this.updatePostId();
				break;
			case '/new':
				this.fetchByType(types[1]);
				break;
			default:
				this.fetchByType(types[0]);
				break;
		}
	};

	fetchByType = type => {
		fetchAllStories(type)
			.then(data =>
				this.setState({ storiesIds: data, loading: false, error: null })
			)
			.catch(err => this.setState({ loading: false, error: err }));
	};

	updatePostId = () => {
		const { id } = queryString.parse(this.props.location.search);

		fetchStorieById(id)
			.then(data =>
				this.setState({
					header: data,
					commentsIds: data.kids ? data.kids : null,
					loading: false,
					error: null
				})
			)
			.catch(err => this.setState({ loading: false, error: err }));
	};

	updateUserById = () => {
		const { id } = queryString.parse(this.props.location.search);

		fetchUserById(id)
			.then(data =>
				this.setState({ user: data, postIds: data.submitted, loading: false })
			)
			.catch(err => this.setState({ loading: false, error: err }));
	};

	render() {
		const {
			loading,
			storiesIds,
			header,
			commentsIds,
			user,
			postIds,
			error
		} = this.state;
		return (
			<React.Fragment>
				{loading && <Loader />}
				{error && !loading && <ErrorHandler error={error} />}
				{!loading &&
					!error &&
					this.props.children({
						storiesIds,
						header,
						commentsIds,
						user,
						postIds
					})}
			</React.Fragment>
		);
	}
}
