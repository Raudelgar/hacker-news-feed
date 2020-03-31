import React, { Component } from 'react';

import { fetchTopStories, getStoriesFromId } from '../api/hn/hn-api.js';

import Loader from './Loader.js';
import Stories from './Stories.js';

export default class Top extends Component {
	constructor(props) {
		super(props);
		this.state = {
			storiesIds: [],
			stories: []
		};
	}
	componentDidMount() {
		fetchTopStories()
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
		const { storiesIds, stories } = this.state;
		return (
			<div className='container'>
				{!stories.length ? <Loader /> : <Stories stories={stories} />}
			</div>
		);
	}
}
