import React from 'react';

import Loader from './Loader.js';

export default function Stories({ stories }) {
	return <pre>{JSON.stringify(stories, null, 2)}</pre>;
}
