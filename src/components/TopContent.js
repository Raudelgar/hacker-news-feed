import React, { Component } from 'react';

import { fetchAllStories } from '../api/hn/hn-api.js';

import ErrorHandler from './ErrorHandler.js';
import Loader from './Loader.js';

export default class TopContent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'topstories',
			storiesIds: [],
			error: null,
			loading: true
		};
	}
	componentDidMount() {
		this.updateStoriesIds();
	}

	updateStoriesIds = () => {
		const { type } = this.state;
		fetchAllStories(type)
			.then(data =>
				this.setState({ storiesIds: data, error: null, loading: false })
			)
			.catch(err => this.setState({ error: err, loading: false }));
	};

	render() {
		const { storiesIds, error, loading } = this.state;

		return (
			<React.Fragment>
				{loading && <Loader />}
				{error && <ErrorHandler error={error} />}
				{!error &&
					!loading &&
					this.props.children({
						storiesIds,
						loading
					})}
			</React.Fragment>
		);
	}
}
