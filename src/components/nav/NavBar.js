import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';

import ThemeContext from '../context/ThemeContext.js';

export default function NavBar() {
	const { theme, toggleTheme } = useContext(ThemeContext);
	return (
		<nav className='row space-between'>
			<ul className='row nav'>
				<li>
					<NavLink
						to='/'
						activeClassName='selected'
						className={`navbar-${theme}`}
						exact
					>
						Top
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/new'
						activeClassName='selected'
						className={`navbar-${theme}`}
						exact
					>
						New
					</NavLink>
				</li>
			</ul>
			<button className='btn-clear' onClick={toggleTheme}>
				{theme === 'light' ? (
					<FaToggleOff color='#414344' size={27} />
				) : (
					<FaToggleOn color='#dedee0' size={27} />
				)}
			</button>
		</nav>
	);
}
