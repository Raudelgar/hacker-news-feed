import React, { Component } from 'react';
import queryString from 'query-string';

import { fetchAllStories, fetchStorieById } from '../api/hn/hn-api.js';

import Loader from './Loader.js';

export default class Store extends Component {
	constructor(props) {
		super(props);
		this.state = {
			types: ['topstories', 'newstories'],
			storiesIds: [],
			header: null,
			commentsIds: [],
			loading: true
		};
	}
	componentDidMount() {
		this.updateStoriesIds();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.path !== this.props.match.path) {
			this.setState({ loading: true });
			this.updateStoriesIds();
		}
	}

	updateStoriesIds = () => {
		const { path } = this.props.match;
		const { types } = this.state;

		switch (path) {
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
			.then(data => this.setState({ storiesIds: data, loading: false }))
			.catch(err => console.log(err));
	};

	updatePostId = () => {
		const { id } = queryString.parse(this.props.location.search);

		fetchStorieById(id)
			.then(data =>
				this.setState({ header: data, commentsIds: data.kids, loading: false })
			)
			.catch(err => console.log(err));
	};

	render() {
		const { loading, storiesIds, header, commentsIds } = this.state;
		return (
			<React.Fragment>
				{loading ? (
					<Loader />
				) : (
					this.props.children({ storiesIds, header, commentsIds })
				)}
			</React.Fragment>
		);
	}
}
