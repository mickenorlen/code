/**
 *
 * @param {String} event, eg click
 * @param {String} selector
 * @param {Function} callback
 * @example:

import {on, off} from '../utils/listen';
const handle = on('click', '.my-selector', function(e) {
	console.log('hej');
	off('click', handle);
})

 */
export function on(event, selector, callback) {
	const handle = e => {
		if (e.target.matches(selector)) {
			callback(e)
		}
	}

	document.addEventListener(event, handle, false);
	return handle
}

export function off(event, handle) {
	document.removeEventListener(event, handle)
}
