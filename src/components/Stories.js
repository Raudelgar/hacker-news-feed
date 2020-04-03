import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Story from './Story.js';
import Loader from './Loader.js';
import ErrorHandler from './ErrorHandler.js';
import { getStoriesFromId } from '../api/hn/hn-api.js';

export default class Stories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			stories: [],
			loading: true,
			error: null
		};
	}

	componentDidMount() {
		this.updateStories();
	}

	updateStories = () => {
		const { storiesIds } = this.props;
		getStoriesFromId(storiesIds)
			.then(data =>
				this.setState({ stories: data, loading: false, error: null })
			)
			.catch(err => this.setState({ loading: false, error: err }));
	};

	render() {
		const { stories, loading, error } = this.state;
		return (
			<React.Fragment>
				{loading && <Loader />}
				{error && !loading && <ErrorHandler error={error} />}
				{!loading && !error && (
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
