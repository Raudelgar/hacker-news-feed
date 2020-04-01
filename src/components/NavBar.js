import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
	const navLinkStyle = {
		fontWeight: 'bold',
		color: '#bb2e1f',
		textDecoration: 'none'
	};
	return (
		<nav className='row space-between'>
			<ul className='row nav'>
				<li>
					<NavLink
						to='/'
						activeClassName='selected'
						className='navbar-light'
						exact
					>
						Top
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/new'
						activeClassName='selected'
						className='navbar-light'
						exact
					>
						New
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}
