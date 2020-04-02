import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Story from './Story.js';
import Loader from './Loader.js';
import { getStoriesFromId } from '../api/hn/hn-api.js';

export default class Stories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stories: [],
			loading: true
		};
	}

	componentDidMount() {
		this.updateStories();
	}

	updateStories = () => {
		const { storiesIds } = this.props;
		getStoriesFromId(storiesIds)
			.then(data => this.setState({ stories: data, loading: false }))
			.catch(error => console.log(error));
	};

	render() {
		const { stories, loading } = this.state;
		return (
			<React.Fragment>
				{loading ? (
					<Loader />
				) : (
					<ul>
						{stories.map(story => {
							if (story)
								return (
									<li key={story.id} style={{ margin: '20px 0' }}>
										<Story story={story} />
									</li>
								);
						})}
					</ul>
				)}
			</React.Fragment>
		);
	}
}

Stories.propTypes = {
	storiesIds: PropTypes.array.isRequired
};
