class IdelActiveAnimation {
	constructor({ //значения по умолчанию
		selector: selector = 'video',
		startTime: startTime = 0,
		animationClass: animationClass = 'animate',
		threshold: threshold = 0,
	}) {
		this.videos = document.querySelectorAll(selector);
		this.startTime = startTime;
		this.animationClass = animationClass;
		this.threshold = threshold;

		let coords = {};

		for (const video of this.videos) {
			/* 	video.addEventListener('loadedmetadata', (event) => {
					this.animateIdel(video);
				}, false); */
			video.addEventListener('touchstart', (event) => {
				coords.x = event.targetTouches[0].pageX;
				coords.y = event.targetTouches[0].pageY;
			}, false);

			video.addEventListener('touchend', (event) => {
				if (coords.x === event.changedTouches[0].pageX || coords.y === event.changedTouches[0].pageY) {
					this.animateActive(video);
				}
			}, false);

			video.addEventListener('ended', (event) => {
				this.animateIdel(video);
			}, false);

			this.animateIdel(video);
		}

		window.addEventListener('scroll', (event) => {
			let allVideos = document.querySelectorAll('video');
			for (const video of allVideos) {
				if (this.isVisible(video, this.threshold)) {
					video.play();
				} else {
					video.pause();
				}
			}
		}, false);
	}

	animateIdel(video) {
		video.currentTime = this.startTime;
		setTimeout(() => {
			video.play();
		}, 0);
	}

	animateActive(video) {
		if (this.animationClass) {
			video.classList.remove(this.animationClass);
			void video.offsetWidth; // reflow hack
			video.classList.add(this.animationClass);
		}
		video.currentTime = 0.1;
		video.play();
	}

	isVisible(elm, threshold = 0, mode = 'visible') { //появление элемента на экране
		let rect = elm.getBoundingClientRect();
		let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
		let above = rect.bottom - threshold < 0;
		let below = rect.top - viewHeight + threshold >= 0;
		return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
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