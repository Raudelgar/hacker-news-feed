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
			error: null,
			loading: true
		};
	}

	componentDidMount() {
		console.log('--componentDidMount/Stories--');
		this.updateStories();
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('--componentDidUpdate/Stories--');
		console.log('prevProps', prevProps);
		console.log('this.props', this.props);
		if (prevProps.storiesIds.lenght !== this.props.storiesIds.length) {
			// this.updateStories();
		}
	}

	componentWillUnmount() {
		console.log('--componentWillUnmount/Stories--');
	}

	updateStories = () => {
		const { storiesIds } = this.props;
		// console.log(storiesIds);
		getStoriesFromId(storiesIds)
			.then(data =>
				this.setState({ stories: data, loading: false, error: null })
			)
			.catch(err => this.setState({ loading: false, error: err }));
	};

	render() {
		console.log('--render/Stories--');
		const { stories, loading, error } = this.state;
		console.log('Stories loading', loading);
		return (
			<React.Fragment>
				{loading && <Loader />}
				{error && !loading && <ErrorHandler error={error} />}
				{!loading && (
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
