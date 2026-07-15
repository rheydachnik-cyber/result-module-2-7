import { HTTP_METHOD } from '../constants';

const requestToServer = (type, { identifier, ...details } = {}) => {
	let address = `http://localhost:3003/todos`;
	let requestSettings = {
		method: type,
		headers: { 'Content-Type': 'application/json' },
	};

	if (type === HTTP_METHOD.GET) {
		const { searchText, useAlphabeticalOrder } = details;
		const orderParams = useAlphabeticalOrder
			? '_sort=title&_order=asc'
			: '_sort=id&_order=desc';
		address += `?${orderParams}&title_like=${searchText || ''}`;
	} else {
		if (type !== HTTP_METHOD.POST) {
			address += `/${identifier}`;
		}

		if (type !== HTTP_METHOD.DELETE) {
			requestSettings.body = JSON.stringify(details);
		}
	}

	return fetch(address, requestSettings)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.catch((error) => {
			console.error('Fetch error:', error);
			return []; // Возвращаем пустой массив в случае ошибки
		});
};

export const addNewTask = (taskData) => requestToServer('POST', taskData);

export const getTasks = (searchText = '', useAlphabeticalOrder = false) =>
	requestToServer('GET', { searchText, useAlphabeticalOrder });

export const modifyTask = (taskData) => requestToServer('PATCH', taskData);

export const removeTask = (taskId) => requestToServer('DELETE', { identifier: taskId });
