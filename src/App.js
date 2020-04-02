import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar.js';
import Comments from './components/Comments.js';
import Posts from './components/Posts.js';
import Store from './components/Store.js';
import Stories from './components/Stories.js';

export default function App(props) {
	return (
		<Router>
			<div className='light'>
				<div className='container'>
					<NavBar />
					<Switch>
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
