import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar.js';
import Loader from './components/Loader.js';
import { ThemeProvider } from './components/ThemeContext.js';

const CommentsContent = lazy(() => import('./components/CommentsContent'));
const Comments = lazy(() => import('./components/Comments.js'));
const PostsContent = lazy(() => import('./components/PostsContent'));
const Posts = lazy(() => import('./components/Posts.js'));
const Stories = lazy(() => import('./components/Stories.js'));
const TopContent = lazy(() => import('./components/TopContent'));
const NewContent = lazy(() => import('./components/NewContent'));
const ErrorHandler = lazy(() => import('./components/ErrorHandler.js'));

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			theme: 'light',
			toggleTheme: () => {
				this.setState(({ theme }) => {
					const newTheme = theme === 'light' ? 'dark' : 'light';
					return {
						theme: newTheme
					};
				});
			}
		};
	}
	render() {
		const { theme } = this.state;
		return (
			<Router>
				<ThemeProvider value={this.state}>
					<div className={theme}>
						<div className='container'>
							<NavBar />
							<Suspense fallback={<Loader label='Loading App' />}>
								<Switch>
									<Route
										exact
										path='/'
										render={props => (
											<TopContent {...props}>
												{store => <Stories {...store} />}
											</TopContent>
										)}
									/>
									<Route
										path='/new'
										render={props => (
											<NewContent {...props}>
												{store => <Stories {...store} />}
											</NewContent>
										)}
									/>
									<Route
										path='/comments'
										render={props => (
											<CommentsContent {...props}>
												{store => <Comments {...store} />}
											</CommentsContent>
										)}
									/>
									<Route
										path='/user'
										render={props => (
											<PostsContent {...props}>
												{store => <Posts {...store} />}
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
				</ThemeProvider>
			</Router>
		);
	}
}
