/**
 * @description Create a delay until no recent calls have been made.
 * Used for when eg. a user updates a value freely and
 * you don't want to send a api request until they're done
 * Or if you want to wait for rails to update some values before moving forward
 * @param {String} timerProp, the property that keeps time
 * @param {Number} ms, the time that has to pass without call until function resolves
 * @example:
 const timer = {}
 const waitTime = 1000
 const timerProp = 'waitTimer'
 if (timer[timerProp]) {
	 console.log('Starting over');
	 timer[timerProp] = waitTime // The time you want to delay
 } else {
	 delayUntilNoRecentCall.call(timer, waitTime, timerProp ).then(() => {
		 console.log('wait done');
	 })
 }
 */
export default function delayUntilNoRecentCall(ms, timerProp = 'waitTimer') {
	if (ms) this[timerProp] = ms;
	return new Promise(resolve => {
		if (!this[timerProp]) {
			resolve()
		} else {
			new Promise(resolve => setTimeout(() => resolve(), 100)).then(() => {
				this[timerProp] -= 100;
				// console.log(this[timerProp]);
				delayUntilNoRecentCall.call(this, false, timerProp).then(() => {
					resolve()
				})
			})
		}
	})
}
