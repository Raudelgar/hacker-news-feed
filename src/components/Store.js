import React, { Component } from 'react';
import queryString from 'query-string';

import {
	fetchAllStories,
	fetchStorieById,
	fetchUserById
} from '../api/hn/hn-api.js';

import ErrorHandler from './ErrorHandler.js';
import Loader from './Loader.js';

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
			error: null,
			loading: true
		};
	}
	componentDidMount() {
		console.log('--componentDidMount/Store--');
		this.updateStoriesIds();
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('--componentDidUpdate/Store--');
		if (prevProps.match.path !== this.props.match.path) {
			this.setState({ error: null, loading: true });
			this.updateStoriesIds();
		}
	}

	componentWillUnmount() {
		console.log('--componentWillUnmount/Store--');
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
				this.setState({ storiesIds: data, error: null, loading: false })
			)
			.catch(err => this.setState({ error: err, loading: false }));
	};

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

	updateUserById = () => {
		const { id } = queryString.parse(this.props.location.search);

		fetchUserById(id)
			.then(data =>
				this.setState({ user: data, postIds: data.submitted, loading: false })
			)
			.catch(err => this.setState({ error: err, loading: false }));
	};

	render() {
		console.log('--render/Store--');
		const {
			storiesIds,
			header,
			commentsIds,
			user,
			postIds,
			error,
			loading
		} = this.state;

		return (
			<React.Fragment>
				{loading && <Loader />}
				{error && <ErrorHandler error={error} />}
				{!error &&
					!loading &&
					this.props.children({
						storiesIds,
						header,
						commentsIds,
						user,
						postIds,
						loading
					})}
			</React.Fragment>
		);
	}
}
