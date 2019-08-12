

	class IdelActiveAnimation {
		constructor({ //значения по умолчанию
			selector: selector = 'video',
			startTime: startTime = 0,
		}) {
			this.videos = document.querySelectorAll(selector);
			this.startTime = startTime;

			for (const video of this.videos) {
				video.addEventListener('loadedmetadata', (event) => {
					this.animateIdel(video);
				}, false);
				video.addEventListener('touchstart', (event) => {
					this.animateActive(video);
				}, false);
				video.addEventListener('ended', (event) => {
					this.animateIdel(video);
				}, false);

				this.animateIdel(video);
			}
		}

		animateIdel(video) {
			video.currentTime = this.startTime;
			video.play();
		}

		animateActive(video) {
			video.classList.remove('animate');
			void video.offsetWidth; // reflow hack
			video.classList.add('animate');
			video.currentTime = 0.1;
			video.play();
		}
	}



	/* 


	//Полифил для requestAnimationFrame
	(function () {
		let lastTime = 0;
		let vendors = ['ms', 'moz', 'webkit', 'o'];
		for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
				window[vendors[x] + 'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function (callback, element) {
				let currTime = new Date().getTime();
				let timeToCall = Math.max(0, 16 - (currTime - lastTime));
				let id = window.setTimeout(function () {
						callback(currTime + timeToCall);
					},
					timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function (id) {
				clearTimeout(id);
			};
	}());
	//Полифил для requestAnimationFrame end


	function VideoAnimation(option) {

		let video = document.getElementById(option.selector);
		let startTime = option.startTime;
		let i = true;

		requestAnimationFrame(animateIdel);

		function animateIdel() {
			if (i) {
				i = false;
			} else {
				video.currentTime = startTime;
				setTimeout(function () {
					video.play();
				}, 0);
				i = true;
				requestAnimationFrame(animateIdel);
			}
		}

		function animateActive() {
			video.classList.remove('animate');
			void video.offsetWidth; // reflow hack
			video.classList.add('animate');
			video.currentTime = 0.1;
			video.play();
		}


		video.addEventListener('loadedmetadata', animateIdel, false);
		video.addEventListener('click', animateActive, false);
		video.addEventListener('ended', animateIdel, false);

	} */