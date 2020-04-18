import React from 'react';
import './Loader.css';

export default function Loader({ label = 'Loading' }) {
	return (
		<div className='loader theme-light'>
			<h2>{label}</h2>
		</div>
	);
}
