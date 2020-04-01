import React, { Component } from 'react';

import { fetchAllStories } from '../api/hn/hn-api.js';

import Loader from './Loader.js';
import Stories from './Stories.js';

export default class Store extends Component {
	constructor(props) {
		super(props);
		this.state = {
			types: ['topstories', 'newstories'],
			storiesIds: [],
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
		let type;
		switch (path) {
			case '/new':
				type = types[1];
				break;
			default:
				type = types[0];
				break;
		}
		fetchAllStories(type)
			.then(data => this.setState({ storiesIds: data, loading: false }))
			.catch(err => console.log(err));
	};

	render() {
		const { storiesIds, loading } = this.state;
		return (
			<React.Fragment>
				{loading ? <Loader /> : <Stories storiesIds={storiesIds} />}
			</React.Fragment>
		);
	}
}
