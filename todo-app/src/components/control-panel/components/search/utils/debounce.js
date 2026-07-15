export const delay = (callback, interval) => {
	let timeoutReference;
	return (...params) => {
		clearTimeout(timeoutReference);
		timeoutReference = setTimeout(callback, interval, ...params);
	};
};
