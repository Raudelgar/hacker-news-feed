import React from 'react';

export default function Loader({ label = 'Loading' }) {
	return (
		<div className='loader theme-light'>
			<h2>{label}</h2>
		</div>
	);
}
