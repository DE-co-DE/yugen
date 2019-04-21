/*
menu animation
paresh kamble
*/

$(window).scroll(function() {
	if ($(window).width() < 1025) {
		fixedHeader();
	}
});

function fixedHeader(){
	if ($(window).scrollTop() >= 100) {
		$('.headerContent').addClass('headerfix');
		$('.mblogo').addClass('tp');
		$('.siteLogo').addClass('addlogo');
		$('.fixedHeader').addClass('bg');


	} else {
		$('.headerContent').removeClass('headerfix');
		$('.fixedHeader').removeClass('bg');
		$('.mblogo').removeClass('tp');
		$('.siteLogo').removeClass('addlogo');

	}
}

$(document).ready(function() {
    $("#bodymovinW").on('mouseenter', mouverEnter).on('mouseleave', mouverLeavess);
    $('#bodymovinW').on('click', function() {
        $(".menu-icon").hide();
        menuAnimationS();
        $($("#bodymovinW").find('svg')[0]).remove();
        $(this).after('<div class="close-event"></div>');
        $('.menuContent').toggleClass('active');
    });

    $(document).on('click', '.close-event', function(event) {
        menuAnimationT();
        $($("#bodymovinW").find('svg')[0]).remove();
        $('.menuContent').removeClass('active');
        setTimeout(() => {
            $(".close-event").remove();
        }, 1000);
    });

    // for black
    $("#bodymovinB").on('mouseenter', mouverEnterB).on('mouseleave', mouverLeavessB);
    $('#bodymovinB').on('click', function() {
        $(".menu-iconB").hide();
        menuAnimationSB();
        $($("#bodymovinB").find('svg')[0]).remove();
        $(this).after('<div class="close-eventB"></div>');
        $('.menuContent').toggleClass('active');
    });

    $(document).on('click', '.close-eventB', function(event) {
        menuAnimationTB();
        $($("#bodymovinB").find('svg')[0]).remove();
        $('.menuContent').removeClass('active');
        setTimeout(() => {
            $(".close-eventB").remove();
        }, 1000);
    });
});

function mouverEnter() {
    console.log('hover');
    $(".menu-icon").hide();
    $($("#bodymovinW").find('svg')[0]).remove();
    menuAnimationF();
}

function mouverLeavess() {
    $(".menu-icon").show();
    $($("#bodymovinW").find('svg')[0]).remove();
}


function menuAnimationF() {
    var params = {
        container: document.getElementById('bodymovinW'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        className: 'svg_close',
        animationData: animationDataF
    };
    var anim;
    bindEvent();
    anim = bodymovin.loadAnimation(params);
    unbindEvent();
}

function menuAnimationS() {
    var params = {
        container: document.getElementById('bodymovinW'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: animationDataS
    };
    var anim;
    bindEvent();
    anim = bodymovin.loadAnimation(params);
    unbindEvent();
}

function menuAnimationT() {
    var params = {
        container: document.getElementById('bodymovinW'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: animationDataT
    };
    var anim;
    bindEvent();
    anim = bodymovin.loadAnimation(params);
    unbindEvent();
}

function bindEvent() {
    $("#bodymovinW").unbind('mouseenter mouseleave');
}

function unbindEvent() {
    setTimeout(() => {
        $("#bodymovinW").unbind('mouseenter mouseleave');
        $("#bodymovinW").on('mouseenter', mouverEnter).on('mouseleave', mouverLeavess)
    }, 100);
}
// for black
function mouverEnterB() {
    console.log('hover');
    $(".menu-iconB").hide();
    $($("#bodymovinB").find('svg')[0]).remove();
    menuAnimationFB();
}

function mouverLeavessB() {
    $(".menu-iconB").show();
    $($("#bodymovinB").find('svg')[0]).remove();
}


function menuAnimationFB() {
    var params = {
        container: document.getElementById('bodymovinB'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        className: 'svg_close',
        animationData: animationDataFB
    };
    var anim;
    bindEventB();
    anim = bodymovin.loadAnimation(params);
    unbindEventB();
}

function menuAnimationSB() {
    var params = {
        container: document.getElementById('bodymovinB'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: animationDataSB
    };
    var anim;
    bindEventB();
    anim = bodymovin.loadAnimation(params);
    unbindEventB();
}

function menuAnimationTB() {
    var params = {
        container: document.getElementById('bodymovinB'),
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: animationDataTB
    };
    var anim;
    bindEventB();
    anim = bodymovin.loadAnimation(params);
    unbindEventB();
}

function bindEventB() {
    $("#bodymovinB").unbind('mouseenter mouseleave');
}

function unbindEventB() {
    setTimeout(() => {
        $("#bodymovinB").unbind('mouseenter mouseleave');
        $("#bodymovinB").on('mouseenter', mouverEnterB).on('mouseleave', mouverLeavessB)
    }, 100);
}