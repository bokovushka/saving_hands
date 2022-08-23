import 'bootstrap'

//swiper
import Swiper from 'swiper/bundle';

var CoursesCardSwiper = new Swiper('.courses-card-swiper', {
	direction: 'horizontal',
	grabCursor: true,
	// freeMode: true,
	breakpoints: {
		1200: {
			slidesPerView: 3,
			grabCursor: false,
			spaceBetween: 30,
		},
		1120: {
			slidesPerView: 2.6,
			spaceBetween: 22,
		},
		992: {
			slidesPerView: 2.3,
			spaceBetween: 22,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 22,
		},
		680: {
			slidesPerView: 1.6,
			spaceBetween: 17,
		},
		576: {
			slidesPerView: 1.4,
			spaceBetween: 17,
		},
		412: {
			slidesPerView: 1,
			spaceBetween: 20,
			grid: {
				rows: 3,
			},
		},
	},
});


const interestedSwiper = new Swiper('.popular-swiper', {
	// Optional parameters
	direction: 'horizontal',
	grabCursor: true,
	breakpoints: {
		1200: {
			slidesPerView: 3,
			grabCursor: false,
			spaceBetween: 30,
		},
		1120: {
			slidesPerView: 2.6,
			spaceBetween: 22,
		},
		992: {
			slidesPerView: 2.3,
			spaceBetween: 22,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 22,
		},
		680: {
			slidesPerView: 1.6,
			spaceBetween: 17,
			pagination: {
				el: ".popular-swiper .swiper-pagination",
			},
		},
		576: {
			slidesPerView: 1.4,
			spaceBetween: 17,
			pagination: {
				el: ".popular-swiper .swiper-pagination",
			},
		},
		412: {
			slidesPerView: 1,
			spaceBetween: 17,
			pagination: {
				el: ".popular-swiper .swiper-pagination",
			},
		},
	},
});

const reviewsSwiper = new Swiper('.reviews-swiper', {
	// Optional parameters
	direction: 'horizontal',
	grabCursor: true,
	slidesPerView: 1,
	navigation: {
		nextEl: '.btn-reviews.button-next',
		prevEl: '.btn-reviews.button-prev',
	},
	pagination: {
		el: '.reviews .swiper-pagination',
		type: 'fraction',
	}
});

const LatestNewsSwiper = new Swiper('.latest-news-swiper', {
	// Optional parameters
	direction: 'horizontal',
	grabCursor: true,
	breakpoints: {
		1200: {
			slidesPerView: 3,
			spaceBetween: 30,
			grabCursor: false,
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 22,
		},
		412: {
			slidesPerView: 1,
			spaceBetween: 17,
			pagination: {
				el: ".latest-news-swiper .swiper-pagination",
			},
		},
	},
});

const BlogSwiper = new Swiper('.blog-swiper', {
	// Optional parameters
	direction: 'vertical',
	slidesPerView: 1,
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	autoHeight: true,

	navigation: {
		nextEl: '.top-articles .button-next',
		prevEl: '.top-articles .button-prev',
	},
	breakpoints: {
		992: {
			pagination: {
				el: '.top-articles .swiper-pagination',
				clickable: true,
				type: 'bullets',
				renderBullet: function (index, className) {
					return '<span class="' + className + '">' + ('0' + (index + 1)) + '</span>';
				}
			},
		},
		412: {
			pagination: false,
		},
	},
});

import Plyr from 'plyr';
const player1 = new Plyr('#player1');
const player2 = new Plyr('#player2');
const player3 = new Plyr('#player3');

import flatpickr from "flatpickr";
flatpickr(".datepicker", {
	minDate: "today",
	enableTime: true,
	time_24hr: true,
	disableMobile: "true",
	wrap: true
});