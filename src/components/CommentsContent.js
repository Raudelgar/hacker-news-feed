import React from 'react';
import PropTypes from 'prop-types';

import Loader from './Loader.js';
import StoryInfo from './StoryInfo.js';
import Comment from './Comment.js';
import { ThemeConsumer } from './ThemeContext.js';

export default function CommentsContent({ content }) {
	const { header, comments } = content;
	return (
		<ThemeConsumer>
			{({ theme }) => (
				<React.Fragment>
					<h1 className={`header-${theme}`}>
						<a href='' className={`link-${theme}`}>
							{header.title}
						</a>
					</h1>
					<StoryInfo info={header} />
					<br></br>
					{comments && !comments.length && <Loader label='Fetching Posts' />}
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
		</ThemeConsumer>
	);
}

CommentsContent.propTypes = {
	content: PropTypes.object.isRequired
};
