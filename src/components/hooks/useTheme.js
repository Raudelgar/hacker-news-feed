import { useState } from 'react';

/**
 * Using sessionStorage instead of localStorage because this is
 * just a POC, no need to persist this value in user's browser
 * for more than a session.
 */
function initialTheme() {
	let sessionTheme = window.sessionStorage.getItem('hn-theme');

	if (!sessionTheme) {
		window.sessionStorage.setItem('hn-theme', 'light');
		sessionTheme = window.sessionStorage.getItem('hn-theme');
	}

	return sessionTheme;
}

export default function useTheme() {
	const [theme, setTheme] = useState(initialTheme());

	const toggleTheme = () => {
		setTheme((curr) => {
			let newTheme = curr === 'light' ? 'dark' : 'light';
			window.sessionStorage.setItem('hn-theme', newTheme);
			return newTheme;
		});
	};

	return [theme, toggleTheme];
}
