import React, { Component } from 'react';

import { fetchAllStories, getStoriesFromId } from '../api/hn/hn-api.js';

import Loader from './Loader.js';
import Stories from './Stories.js';

export default class NewStories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'newstories',
			storiesIds: [],
			stories: []
		};
	}
	componentDidMount() {
		const { type } = this.state;
		fetchAllStories(type)
			.then(data => this.setState({ storiesIds: data }))
			.catch(err => console.log(err));
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.storiesIds.length !== this.state.storiesIds.length) {
			const { storiesIds } = this.state;
			getStoriesFromId(storiesIds)
				.then(data => this.setState({ stories: data }))
				.catch(error => console.log(error));
		}
	}

	render() {
		const { stories } = this.state;
		return (
			<React.Fragment>
				{!stories.length ? <Loader /> : <Stories stories={stories} />}
			</React.Fragment>
		);
	}
}
