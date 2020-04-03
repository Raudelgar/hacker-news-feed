import React from 'react';

export default function ErrorHandler({ error = '404 - Page Not Found' }) {
	return (
		<div style={{ textAlign: 'center' }}>
			<h3>{String(error)}</h3>
		</div>
	);
}
