var ended = false;
$(document).ready(function($) {
    winh = $(window).height();
    winW = $(window).width();

    var $status = $('.pagingInfo span');
    var $slickElement = $('.award1');
    $('.award1').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        cssEase: "ease",
        easing: 'linear',
        infinite: false,
        asNavFor: '.award2, .award3',
        autoplay: true
    });

    $('.award2').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.award1, .award3',
        speed: 1000,
        cssEase: "ease",
        fade: true,
        autoplay: true,
        infinite: false
    });

    $('.award3').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.award1, .award2',
        speed: 1000,
        cssEase: "ease",
        easing: 'linear',
        autoplay: true,
        infinite: false
    });

    $('.award1').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
		$(".pagingInfo #prev").html(i);
		if(i+1  > $(".award1 .slick-slide").length){
			$(".pagingInfo #next").hide();
		}
		else{
			$(".pagingInfo #next").show();
			$(".pagingInfo #next").html(i + 1);
		}
        
        $('.next').removeClass('inActive');
        $('.prev').removeClass('inActive');
        if (nextSlide == undefined && currentSlide != 0) {
            $('.next').addClass('inActive');
        }
        if (currentSlide == 0) {
            $('.prev').addClass('inActive');

        }
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        // to remove pointer
        $('#pointer').remove();

        // to remove slider from solutions
        $(".slider-container").remove();
        $(".slider-bg").remove();
        $(".slider-wrapper").remove();
    } else {
        // for link
        //$('section').height(winh);
        var selectorListArrow = [".link"];
        var selectorA = selectorListArrow.join(", ");
        $(selectorA).mouseenter(function() {
            $('#pointer').addClass("hover-w");
            $('#pointer').removeClass("animSt")

        }).mouseleave(function() {
            $('#pointer').removeClass("hover-w");
            $('#pointer').addClass("animSt");
        });
        // for slider
        $('.award1').on('init', function(event, slick) {
            var selectorListArrowP = [".leftarrow, .slick-prev"];
            var selectorP = selectorListArrowP.join(", ");
            $(selectorP).mouseenter(function() {
                console.log('hover');
                $('#pointer').addClass("hover-p");
                $('#pointer').removeClass("animSt");
            }).mouseleave(function() {
                $('#pointer').removeClass("hover-p");
                $('#pointer').addClass("animSt");
            });


            //right arrw
            var selectorListArrowN = [".rightarrow, .slick-next"];
            var selectorN = selectorListArrowN.join(", ");
            $(selectorN).mouseenter(function() {
                console.log('hover');
                $('#pointer').addClass("hover-ne");
                $('#pointer').removeClass("animSt");
            }).mouseleave(function() {
                $('#pointer').removeClass("hover-ne");
                $('#pointer').addClass("animSt");
            });

        });


        //awrd4
        $('.award4').on('init', function(event, slick) {
            var selectorListArrowP = [".leftarrow, .slick-prev"];
            var selectorP = selectorListArrowP.join(", ");
            $(selectorP).mouseenter(function() {
                console.log('hover');
                $('#pointer').addClass("hover-p");
                $('#pointer').removeClass("animSt");
            }).mouseleave(function() {
                $('#pointer').removeClass("hover-p");
                $('#pointer').addClass("animSt");
            });


            //right arrw
            var selectorListArrowN = [".rightarrow, .slick-next"];
            var selectorN = selectorListArrowN.join(", ");
            $(selectorN).mouseenter(function() {
                console.log('hover');
                $('#pointer').addClass("hover-ne");
                $('#pointer').removeClass("animSt");
            }).mouseleave(function() {
                $('#pointer').removeClass("hover-ne");
                $('#pointer').addClass("animSt");
            });


        });
        var xMousePos = 0;
        var yMousePos = 0;
        $(window).on('mousemove', function(event) {
            xMousePos = event.clientX;
            yMousePos = event.clientY;
        });
        window.requestAnimationFrame(function PointerMove() {
            $("#pointer").css('transform', 'matrix(1, 0, 0, 1, ' + xMousePos + ',  ' + yMousePos + ')');
            window.requestAnimationFrame(PointerMove);
        });
    }

    /*scroll tabs*/
    if (winW > 960) {
        $('.select-tab li:first-child').addClass('current');
        $('.tab-content .tab-pane:first-child').show();

        var current = 0;
        _length = $('.select-tab').children().length;
        start = true;
        $slider = $('.select-tab');
        _scroll = true;

        $('.tab-content').bind('mousewheel', function(event, delta) {
            if (_scroll) {
                var _height = $slider.children().height() * $slider.children().length;
                var _edge = _height - $slider.children().height();
                var _h = $slider.children().height();
                var redirect = window.location.pathname;
                var slRed = redirect.slice(0);

                function _slide() {
                    var dir = delta < 0 ? '-' : '+';
                    $slider.animate({
                        top: dir + '=' + _h
                    }, 800, 'jswing', function() {
                        _scroll = true;
                    });
                }
                $slider.find('li').removeClass('current');
                delta > 0 ? --current : ++current;
                start = true;
                if (current < 0) {
                    ++current;
                    start = false;
                    if (start === false) {
                        var getLocat = $('.digtal-container').prev().data('anchor');
                        if (typeof(getLocat) == "undefined") {
                            fullpage_api.setAllowScrolling(true);
                        } else {
                            ended = false;
                            window.location.assign(redirect + '#' + getLocat);
                            console.log("scrolling stop");
                            fullpage_api.setAllowScrolling(false);
                        }
                    }
                }
                if (current >= _length) {
                    --current;
                    start = false;
                    console.log(start);
                    console.log(ended);
                    if (start === false && ended == false) {
                        var getLocat = $('.digtal-container').next().data('anchor');
                        if (typeof(getLocat) != "undefined") {
                            window.location.assign(redirect + '#' + getLocat);
                        } else {
                            ended = true;
                            console.log("scrolling allow");
                            fullpage_api.setAllowScrolling(true);
                        }
                    }
                }

                if (start) {
                    _slide();
                    _scroll = false;
                }
                $slider.find('li:eq(' + current + ')').addClass('current');
                let getSrc = $slider.find('li:eq(' + current + ')').data('param');
                tabsAnimationContent();
                $('.tab-content .tab-pane').hide();
                $('.tab-content' + " ." + getSrc).show();
            } else {
                _scroll = false;
            }
        });
        $('.select-tab li').on('click', function(delta) {
            let $slider = $('.select-tab');
            $('.select-tab li').removeClass('current');
            $(this).addClass('current');
            let getSrc = $(this).data('param');
            $('.tab-content .tab-pane').hide();
            $('.tab-content' + " ." + getSrc).show();
            tabsAnimationContent();
            let _height = $slider.children().height() * $slider.children().length;
            let _h = $slider.children().height();
            let dir = delta < 0 ? '-' : '+';
            $slider.animate({
                top: '-=' + _h
            }, 1500, 'jswing', function() {
                _scroll = true;
            });
        });
    } else {

        // solutions page -> services tab for mobile
        $('.tab-content .tab-pane:first .rightDiv').show();
        $('.tab-content .tab-pane:first .tabInfoLeft p').show();
        $('.tab-content .tab-pane .leftDiv').addClass('down');
        $('.tab-content .tab-pane:first .leftDiv').removeClass('down').addClass('up');
        $('.tab-content .tab-pane:first').addClass('active-panel');
        $('.tab-content .tab-pane').on('click', function() {
            // $(this).find('selector')
            /* Act on the event */
            theOffset = $(this).offset();
            // $(window).scrollTop(theOffset.top - 150);
            // console.log(theOffset);
            $('html, body').animate({
                scrollTop: $('.tab-content .tab-pane').offset().top - 90
            }, 1500, 'easeInSine');
            $('.tab-content .tab-pane').find('.rightDiv').fadeOut();
            $('.tab-content .tab-pane').find('.tabInfoLeft p').fadeOut();
            $('.tab-pane .leftDiv').removeClass('up').addClass('down');
            $('.tab-content .tab-pane').removeClass('active-panel')
            if ($(this).find('.rightDiv').is(':hidden') == true) {

                $(this).addClass('active-panel');
                $(this).find('.tabInfoLeft p').fadeIn('1000');
                $(this).find('.rightDiv').fadeIn('100');
                $(this).find('.leftDiv').addClass('up');
                //$("html,body").animate({ scrollTop: $(".up").offset().top },1000);
            }
        });
    }
});

function tabsAnimationContent() {
    if ($('.solutionDiv').length) {
        var el = $('.solutionDiv .leftDiv .tabInfoLeft, .solutionDiv .rightDiv .tabInfoRight ');
        TweenMax.fromTo(el, 1, {
            opacity: 0,
            y: 100,

        }, {
            opacity: 1,
            y: 0,
            ease: Back.easeOut
        })
    }
}