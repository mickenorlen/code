/**
 * @param {String} type, in/out
 * @param {HTMLEl} el
 * @param {Number} ms
 * @param {String} display, what display when fading in
 * @from https://stackoverflow.com/questions/30206054/vanilla-javascript-fadein-fadeout-without-jquery
 * @examples
fade('out', element, 500).then(()) => {
	console.log('done!');
})
fade('in', element, 500, 'block).then(()) => {
	console.log('done!');
})
 */
export default function fade(type, el, ms, display) {
	return new Promise(resolve => {
		var isIn = type === 'in',
			opacity = isIn ? 0 : 1,
			interval = 50,
			duration = ms,
			gap = interval / duration;

		if (isIn) {
			el.style.display = display;
			el.style.opacity = opacity;
		}

		function fader() {
			opacity = isIn ? opacity + gap : opacity - gap;
			el.style.opacity = opacity;

			if(opacity <= 0) el.style.display = 'none'
			if(opacity <= 0 || opacity >= 1) {
				window.clearInterval(fading)
				resolve()
			};
		}

		var fading = window.setInterval(fader, interval);
	})
}
