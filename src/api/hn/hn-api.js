const BASE_HOST = 'https://hacker-news.firebaseio.com/v0';
const JSON_PRETTY_PARAMS = '?print=pretty';
const TOP_STORIES = 'topstories.json';
const NEW_STORIES = 'newstories.json';
const GENERIC_ERROR_MSG =
	'Something went wrong on the server. Please, try it againg in a few minutes. If the error persist, cooncatct suppport at US-Toll-free: 8888';

export function fetchTopStories() {
	const url = `${BASE_HOST}/${TOP_STORIES}${JSON_PRETTY_PARAMS}`;

	return fetch(url)
		.then(res => {
			if (!res.ok) {
				throw new Error(getErrorMessages(res.status, null));
			}
			return res.json();
		})
		.then(data => {
			if (!data) {
				throw new Error(
					getErrorMessages(null, 'Error fetching Top Stories Data')
				);
			}
			let top50 = [];
			for (let i = 0; i < 50; i++) {
				top50.push(data[i]);
			}

			return top50;
		});
}

export function fetchNewStories() {
	const url = `${BASE_HOST}/${NEW_STORIES}${JSON_PRETTY_PARAMS}`;

	return fetch(url)
		.then(res => {
			if (!res.ok) {
				throw new Error(getErrorMessages(res.status, null));
			}
			return res.json();
		})
		.then(data => {
			if (!data) {
				throw new Error(
					getErrorMessages(null, 'Error fetching Top Stories Data')
				);
			}
			let top50 = [];
			for (let i = 0; i < 50; i++) {
				top50.push(data[i]);
			}

			return top50;
		});
}

export function getStoriesFromId(Ids) {
	let stories = [];
	for (let id of Ids) {
		stories.push(fetchStorieById(id));
	}

	return Promise.all(stories).then(results => results);
}

export function fetchStorieById(id) {
	const url = `${BASE_HOST}/item/${id}.json${JSON_PRETTY_PARAMS}`;
	return fetch(url)
		.then(res => {
			if (!res.ok) {
				throw new Error(getErrorMessages(res.status, null));
			}

			return res.json();
		})
		.then(story => story);
}

export function fetchUserById(id) {
	const url = `${BASE_HOST}/user/${id}.json${JSON_PRETTY_PARAMS}`;
	return fetch(url)
		.then(res => {
			if (!res.ok) {
				throw new Error(getErrorMessages(res.status, null));
			}

			return res.json();
		})
		.then(user => user);
}

function getErrorMessages(status, msg) {
	if (!status) {
		return msg;
	} else {
		return `${status}: ${GENERIC_ERROR_MSG}`;
	}
}
