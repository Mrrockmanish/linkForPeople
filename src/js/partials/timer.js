(function () {
	function Timer(selector, timeStop) {
		init(selector, timeStop);
	}

	function init(selector, timeStop) {
		var element = document.querySelector(selector);
		if (element === null) {
			return false;
		}
		var hours = element.querySelector('.hours'),
			minutes = element.querySelector('.minutes'),
			seconds = element.querySelector('.seconds');

		var interval = setInterval(function () {
			var timing = getTimeRemaining(timeStop);
			update(hours, minutes, seconds, timing);
			if (timing.delta <= 0) {
				clearInterval(interval);
			}
		});

	}

	function getTimeRemaining(timeStop){
		var delta = Date.parse(timeStop) - Date.parse(new Date());
		var seconds = Math.floor( (delta/1000) % 60 );
		var minutes = Math.floor( (delta/1000/60) % 60 );
		var hours = Math.floor( (delta/(1000*60*60)) % 24 );
		return {
			'delta': delta,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function update(hours, minutes, seconds, timing) {
		hours.innerHTML = timing.hours;
		minutes.innerHTML = ('0' + timing.minutes).slice(-2);
		seconds.innerHTML = ('0' + timing.seconds).slice(-2);
	}

	window.Timer = Timer;
})();
