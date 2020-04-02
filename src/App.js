import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar.js';
import Loader from './components/Loader.js';
const Comments = lazy(() => import('./components/Comments.js'));
const Posts = lazy(() => import('./components/Posts.js'));
const Store = lazy(() => import('./components/Store.js'));
const Stories = lazy(() => import('./components/Stories.js'));

export default function App(props) {
	const today = new Date().toLocaleString().toLocaleLowerCase();
	return (
		<Router>
			<div className='light'>
				<div className='container'>
					<NavBar />
					<div className='today-light'>last updated {today} </div>
					<Switch>
						<Suspense fallback={<Loader label='Loading App' />}>
							<Route
								exact
								path='/'
								render={props => (
									<Store {...props}>{store => <Stories {...store} />}</Store>
								)}
							/>
							<Route
								path='/new'
								render={props => (
									<Store {...props}>{store => <Stories {...store} />}</Store>
								)}
							/>
							<Route
								path='/comments'
								render={props => {
									const newProps = { ...props, loading: true };
									return (
										<Store {...newProps}>
											{store => <Comments {...store} />}
										</Store>
									);
								}}
							/>
							<Route path='/user' component={Posts} />
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
		</Router>
	);
}
