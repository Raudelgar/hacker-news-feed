import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/nav/NavBar.js';
import Loader from './components/loader/Loader.js';
import ThemeContext from './components/context/ThemeContext.js';
import useTheme from './components/hooks/useTheme.js';

const CommentsContent = lazy(() =>
	import('./components/comments/CommentsContent.js')
);
const Comments = lazy(() => import('./components/comments/Comments.js'));
const PostsContent = lazy(() => import('./components/posts/PostsContent.js'));
const Posts = lazy(() => import('./components/posts/Posts.js'));
const Stories = lazy(() => import('./components/stories/Stories.js'));
const ErrorHandler = lazy(() =>
	import('./components/errorHandler/ErrorHandler.js')
);

function App() {
	const [theme, toggleTheme] = useTheme();

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
									render={(props) => <Stories {...props} type='topstories' />}
								/>
								<Route
									path='/new'
									render={(props) => <Stories {...props} type='newstories' />}
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
