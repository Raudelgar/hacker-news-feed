import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar.js';
import Top from './components/Top.js';

export default function App(props) {
	return (
		<Router>
			<div className='light'>
				<div className='container'>
					<NavBar />
					<Switch>
						<Route exact path='/' component={Top} />
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
