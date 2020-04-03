import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getStoriesFromId } from '../api/hn/hn-api';
import Loader from './Loader.js';
import ErrorHandler from './ErrorHandler.js';
import StoryInfo from './StoryInfo.js';
import Comment from './Comment.js';
import { ThemeConsumer } from './ThemeContext.js';
import CommentsContent from './CommentsContent';

export default class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			error: null
		};
	}

	componentDidMount() {
		const { commentsIds } = this.props;
		if (!commentsIds) {
			this.setState({ comments: null });
		} else if (commentsIds && commentsIds.length) {
			this.updatePosts(commentsIds);
		}
	}

	updatePosts = Ids => {
		getStoriesFromId(Ids)
			.then(data => this.setState({ comments: data, error: null }))
			.catch(err => this.setState({ error: err }));
	};

	render() {
		const { comments, error } = this.state;
		const { header } = this.props;
		return (
			<ThemeConsumer>
				{({ theme }) => (
					<React.Fragment>
						{!header && !error && <Loader />}
						{error && <ErrorHandler error={error} />}
						{!error && (
							<React.Fragment>
								<h1 className={`header-${theme}`}>
									<a
										href={header.url}
										target='_blank'
										className={`link-${theme}`}
									>
										{header.title}
									</a>
								</h1>
								<StoryInfo info={header} />
								<br></br>
								{comments && !comments.length && (
									<Loader label='Fetching Posts' />
								)}
								{comments && (
									<React.Fragment>
										{comments.map(comment => {
											if (comment)
												return <Comment key={comment.id} comment={comment} />;
										})}
									</React.Fragment>
								)}
							</React.Fragment>
						)}
					</React.Fragment>
				)}
			</ThemeConsumer>
		);
	}
}

CommentsContent.propTypes = {
	commentsIds: PropTypes.array,
	header: PropTypes.object
};
