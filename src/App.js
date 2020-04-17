import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/nav/NavBar.js';
import Loader from './components/loader/Loader.js';
import ThemeContext from './components/context/ThemeContext.js';

const CommentsContent = lazy(() =>
	import('./components/comments/CommentsContent.js')
);
const Comments = lazy(() => import('./components/comments/Comments.js'));
const PostsContent = lazy(() => import('./components/posts/PostsContent.js'));
const Posts = lazy(() => import('./components/posts/Posts.js'));
const Stories = lazy(() => import('./components/stories/Stories.js'));
const TopContent = lazy(() => import('./components/stories/TopContent.js'));
const NewContent = lazy(() => import('./components/stories/NewContent.js'));
const ErrorHandler = lazy(() => import('./components/ErrorHandler.js'));

function App() {
	const [theme, setTheme] = useState('light');

	const toggleTheme = () =>
		setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));

	return (
		<Router>
			<ThemeContext.Provider value={{ theme, toggleTheme }}>
				<div className={theme}>
					<div className='container'>
						<NavBar />
						<Suspense fallback={<Loader label='Loading App' />}>
							<Switch>
								<Route
									exact
									path='/'
									render={(props) => (
										<TopContent {...props}>
											{(store) => <Stories {...store} />}
										</TopContent>
									)}
								/>
								<Route
									path='/new'
									render={(props) => (
										<NewContent {...props}>
											{(store) => <Stories {...store} />}
										</NewContent>
									)}
								/>
								<Route
									path='/comments'
									render={(props) => (
										<CommentsContent {...props}>
											{(store) => <Comments {...store} />}
										</CommentsContent>
									)}
								/>
								<Route
									path='/user'
									render={(props) => (
										<PostsContent {...props}>
											{(store) => <Posts {...store} />}
										</PostsContent>
									)}
								/>
								<Route>
									<ErrorHandler />
								</Route>
							</Switch>
						</Suspense>
					</div>
				</div>
			</ThemeContext.Provider>
		</Router>
	);
}

export default App;
