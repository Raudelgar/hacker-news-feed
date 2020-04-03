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
		console.log('--componentDidMount/Top--');
		this.updateStoriesIds();
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('--componentDidUpdate/Top--');
		// if (prevProps.match.path !== this.props.match.path) {
		// 	this.setState({ error: null, loading: true });
		// 	this.updateStoriesIds();
		// }
	}

	componentWillUnmount() {
		console.log('--componentWillUnmount/Top--');
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
		console.log('--render/Top--');
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
