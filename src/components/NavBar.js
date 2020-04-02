import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';

import { ThemeConsumer } from './ThemeContext.js';

export default function NavBar() {
	return (
		<ThemeConsumer>
			{({ theme, toggleTheme }) => (
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
			)}
		</ThemeConsumer>
	);
}
