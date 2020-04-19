import axios from 'axios';

const BASE_HOST = 'https://hacker-news.firebaseio.com/v0';
const JSON_PRETTY_PARAMS = '?print=pretty';
const TOP_STORIES = 'topstories';
const NEW_STORIES = 'newstories';
const GENERIC_ERROR_MSG =
	'Something went wrong on the server. Please, try it againg in a few minutes. If the error persist, contact suppport at US-Toll-free: 8888';
const LIMIT = 50;

export function fetchAllStories(type) {
	let url;
	if (type === TOP_STORIES) {
		url = `${BASE_HOST}/${TOP_STORIES}.json${JSON_PRETTY_PARAMS}`;
	} else if (type === NEW_STORIES) {
		url = `${BASE_HOST}/${NEW_STORIES}.json${JSON_PRETTY_PARAMS}`;
	}

	return axios.get(url).then((res) => {
		if (res.statusText !== 'OK') {
			throw new Error(getErrorMessages(res.status, null));
		}

		let top50 = [];
		for (let i = 0; i < LIMIT; i++) {
			top50.push(res.data[i]);
		}

		return top50;
	});
}

export function getStoriesFromId(Ids) {
	let stories = [];
	for (let i = 0; i < LIMIT; i++) {
		stories.push(fetchStorieById(Ids[i]));
	}

	return Promise.all(stories).then((results) => results);
}

export function fetchStorieById(id) {
	const url = `${BASE_HOST}/item/${id}.json${JSON_PRETTY_PARAMS}`;
	return axios.get(url).then((res) => {
		if (res.statusText !== 'OK') {
			throw new Error(getErrorMessages(res.status, null));
		}

		return res.data;
	});
}

export function fetchUserById(id) {
	const url = `${BASE_HOST}/user/${id}.json${JSON_PRETTY_PARAMS}`;
	return axios.get(url).then((res) => {
		if (res.statusText !== 'OK') {
			throw new Error(getErrorMessages(res.status, null));
		}

		return res.data;
	});
}

function getErrorMessages(status, msg) {
	if (!msg) {
		return `${status} - ${GENERIC_ERROR_MSG}`;
	} else {
		return `${status} - ${msg}`;
	}
}
