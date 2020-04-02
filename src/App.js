import React, { Component, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar.js';
import Loader from './components/Loader.js';
import { ThemeProvider } from './components/ThemeContext.js';

const Comments = lazy(() => import('./components/Comments.js'));
const Posts = lazy(() => import('./components/Posts.js'));
const Store = lazy(() => import('./components/Store.js'));
const Stories = lazy(() => import('./components/Stories.js'));

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
							<Switch>
								<Suspense fallback={<Loader label='Loading App' />}>
									<Route
										exact
										path='/'
										render={props => (
											<Store {...props}>
												{store => <Stories {...store} />}
											</Store>
										)}
									/>
									<Route
										path='/new'
										render={props => (
											<Store {...props}>
												{store => <Stories {...store} />}
											</Store>
										)}
									/>
									<Route
										path='/comments'
										render={props => (
											<Store {...props}>
												{store => <Comments {...store} />}
											</Store>
										)}
									/>
									<Route
										path='/user'
										render={props => (
											<Store {...props}>{store => <Posts {...store} />}</Store>
										)}
									/>
								</Suspense>
								<Route
									render={() => (
										<div>
											<h3>404 - Page Not Found</h3>
										</div>
									)}
								/>
							</Switch>
						</div>
					</div>
				</ThemeProvider>
			</Router>
		);
	}
}
