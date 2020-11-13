import slider	from './modules/slider';


window.addEventListener('DOMContentLoaded', () => {
	
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		currentCounter: '#current',
		totalCounter: '#total',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});
});
