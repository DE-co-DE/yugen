/*
    Developed By Paresh Kamble
*/

var allEl = $(".swiper-wrapper").html();
var slideIndex = 6;

var swiper = new Swiper('.scroll-slider.swiper-container', {
    init: false,
    direction: 'vertical',
    slidesPerView: 6,
    mousewheel: true,
    loop: false,
    nav: false,
    spaceBetween: 60,
	centeredSlides: true
});

swiper.on('init', function() {
    var slideIndex = $('.swiper-slide-active').data('slide');
    $('.slide' + slideIndex).addClass('active');
});

swiper.on('reachEnd', function() {
	fullpage_api.setAllowScrolling(true);
	setTimeout(function(){ swiper.slideTo(($(".swiper-slide").length-2), 1000); },1000);
});

swiper.on('reachBeginning', function() {
	ended = false;
	setTimeout(function(){ fullpage_api.setAllowScrolling(true);  },500);
});

swiper.init();

swiper.on('slideChange', function() {
    setTimeout(() => {
		slideIndex = $('.swiper-slide-active').data('slide');
		$('.slide-items').removeClass('active');
		$('.slide' + slideIndex).addClass('active');
    }, 100);
});