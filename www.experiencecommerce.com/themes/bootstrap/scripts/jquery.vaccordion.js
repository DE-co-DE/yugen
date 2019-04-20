/*
 custommize horizontal accordion slider 
 customized by: paresh 
 date: 10-10-2018
*/

var getWinW = $(window).width();
if (getWinW > 960) {
    var divOpen = false;
    var vaH = $('.wid70').outerWidth();
    console.log(vaH)
    $(document).ready(function($) {
        if ($(window).width() < 720) {
            $(".va-slice").click(function() {
                var id = $(this).attr("data-id");

                if ($(".vaOpen").length > 0 && id != $(".vaOpen").attr("data-id")) {
                    $(".vaOpen .va-content").slideToggle();
                    $(".va-slice").removeClass("vaOpen");
                }
                $(".va-slice-" + id + " .va-content").slideToggle();
                if ($(".va-slice-" + id + " .va-content").css("display") == "block") {
                    $(".va-slice-" + id).addClass("vaOpen");
                } else {
                    $(".va-slice-" + id).removeClass("vaOpen");
                }
            });
        }
    });

    (function($) {

        // cache some values
        var cache = {
                idx_expanded: -1, // the index of the current expanded slice
                sliceH: 0, // the default slice's height	
                current: 0, // controls the current slider position
                totalSlices: 0 // total number of slices
            },
            aux = {
                // triggered when we click a slice. If the slice is expanded,
                // we close it, otherwise we open it..
                selectSlice: function($el, $slices, $navNext, $navPrev, settings) {

                    return $.Deferred(
                        function(dfd) {

                            var expanded = $el.data('expanded'),
                                pos = $el.data('position'),

                                itemHeight, othersHeight,

                                $others = $slices.not($el);

                            // if it's opened..	
                            if (expanded) {
                                divOpen = false;
                                $('.thumbDiv').fadeIn();
                                var tl = new TimelineMax()
                                tl.to($(".projectcontent"), .2, {
                                    opacity: 0,

                                }).to($(".va-slice"), 1, {
                                    width: cache.sliceH + 'px',
                                    opacity: 1,
                                    ease: Power1.easeIn,
                                    onComplete: vaHide
                                })

                                function vaHide() {

                                    $(".va-slice-" + id + " .va-content").hide()
                                }
                                $el.data('expanded', false);


                                cache.idx_expanded = -1;

                                // the default values of each slices's height
                                itemHeight = cache.sliceH;
                                othersHeight = cache.sliceH;

                                // hide the content div
                                //$el.find('.va-content').hide();
                                var id = $el.attr("data-id");
                                // control the navigation buttons visibility
                                if (aux.canSlideUp($slices, settings))
                                    $navPrev.fadeIn();
                                else
                                    $navPrev.fadeOut();

                                if (aux.canSlideDown($slices, settings))
                                    $navNext.fadeIn();
                                else
                                    $navNext.fadeOut();
                            }
                            // if it's closed..
                            else {
                                divOpen = true;
                                var id = $el.attr("data-id");
                                // $(".va-slice-" + id).css("width", "100%");
                                $('.thumbDiv').hide();
                                TweenMax.to($(".va-slice-" + id), .5, {
                                    width: "100%",
                                    delay: .5,
                                    ease: Power1.easeIn
                                });



                                $(".va-slice-" + id + " .cd-title").hide();
                                $el.data('expanded', true);
                                cache.idx_expanded = $el.index();
                                $others.data('expanded', false);
                                // the current slice's height
                                itemHeight = settings.expandedHeight;
                                // the height the other slices will have
                                othersHeight = Math.ceil((settings.accordionH - settings.expandedHeight) / (settings.visibleSlices - 1));

                                // control the navigation buttons visibility
                                if (cache.idx_expanded > 0)
                                    $navPrev.fadeIn();
                                else
                                    $navPrev.fadeOut();

                                if (cache.idx_expanded < cache.totalSlices - 1)
                                    $navNext.fadeIn();
                                else
                                    $navNext.fadeOut();
                            }

                            // the animation parameters for the clicked slice
                            var animParam = {
                                height: itemHeight + 'px',
                                opacity: 1,
                                left: (pos - 1) * othersHeight + 'px'
                            };

                            // animate the clicked slice and also its title (<h3>)
                            $el.stop()
                                .animate(animParam, settings.animSpeed, settings.animEasing, function() {
                                    var id = $el.attr("data-id");
                                    if (!expanded) {
                                        //$(".va-slice-" + id).css("background-color", $el.attr("data-color"));

                                        $(".va-slice-" + id + " .va-content").show(function() {
                                            TweenMax.fromTo($(".va-slice-" + id + " .va-content .projectcontent"), .3, {
                                                opacity: 0,
                                            }, {
                                                opacity: 1,
                                                ease: Power1.easeIn,

                                            });
                                        });
                                        $(".va-slice-" + id).addClass('activeBg');
                                        console.log(id);

                                    } else {
                                        $(".va-slice-" + id + " .cd-title").show();
                                        $(".va-slice-" + id).removeClass('activeBg');
                                    }

                                })
                                .find('.va-title')
                                .stop()
                                .animate({
                                    lineHeight: cache.sliceH + 'px'
                                }, settings.animSpeed, settings.animEasing);

                            // animate all the others
                            $others.each(function(i) {
                                var $other = $(this),
                                    posother = $other.data('position'),
                                    t;

                                if (expanded)
                                    t = (posother - 1) * othersHeight;
                                else {
                                    if (posother < pos)
                                        t = (posother - 1) * othersHeight;
                                    else
                                        t = ((posother - 2) * othersHeight) + settings.expandedHeight;
                                }
                                $other.stop()
                                    .animate({
                                        left: t + 'px',
                                        height: othersHeight + 'px',
                                        opacity: (expanded) ? 1 : 0
                                    }, settings.animSpeed, settings.animEasing, dfd.resolve)
                                    .find('.va-title')
                                    .stop()
                                    .animate({
                                        lineHeight: othersHeight + 'px'
                                    }, settings.animSpeed, settings.animEasing)
                                    .end()
                                    .find('.va-content')
                                    .hide();
                            });
                        }
                    ).promise();

                },
                // triggered when clicking the navigation buttons / mouse scrolling
                navigate: function(dir, $slices, $navNext, $navPrev, settings) {
                    // if animating return
                    if ($slices.is(':animated'))
                        return false;

                    // all move up / down one position
                    // if settings.savePositions is false, then we need to close any expanded slice before sliding
                    // otherwise we slide, and the next one will open automatically
                    var $el;

                    if (cache.idx_expanded != -1 && !settings.savePositions) {
                        $el = $slices.eq(cache.idx_expanded);

                        $.when(aux.selectSlice($el, $slices, $navNext, $navPrev, settings)).done(function() {
                            setTimeout(function() {
                                aux.slide(dir, $slices, $navNext, $navPrev, settings);
                            }, 10);
                        });
                    } else {
                        //for open and slide
                        aux.slide(dir, $slices, $navNext, $navPrev, settings);
                    }
                },
                slide: function(dir, $slices, $navNext, $navPrev, settings) {
                    // control if we can navigate.
                    // control the navigation buttons visibility.
                    // the navigation will behave differently for the cases we have all the slices closed, 
                    // and when one is opened. It will also depend on settings.savePositions 
                    if (cache.idx_expanded === -1 || !settings.savePositions) {
                        if (dir === 1 && cache.current + settings.visibleSlices >= cache.totalSlices)
                            return false;
                        else if (dir === -1 && cache.current === 0)
                            return false;

                        if (dir === -1 && cache.current === 1) {
                            $navPrev.fadeOut();
                        } else {
                            $navPrev.fadeIn();
                        }

                        if (dir === 1 && cache.current + settings.visibleSlices === cache.totalSlices - 1) {
                            $navNext.fadeOut();
                        } else
                            $navNext.fadeIn();


                    } else {
                        if (dir === 1 && cache.idx_expanded === cache.totalSlices - 1)
                            return false;
                        else if (dir === -1 && cache.idx_expanded === 0)
                            return false;

                        if (dir === -1 && cache.idx_expanded === 1)
                            $navPrev.fadeOut();
                        else
                            $navPrev.fadeIn();

                        if (dir === 1 && cache.idx_expanded === cache.totalSlices - 2)
                            $navNext.fadeOut();
                        else
                            $navNext.fadeIn();
                    }

                    var $currentSlice = $slices.eq(cache.idx_expanded),
                        $nextSlice,
                        t;

                    (dir === 1) ? $nextSlice = $currentSlice.next(): $nextSlice = $currentSlice.prev();

                    // if we cannot slide up / down, then we just call the selectSlice for the previous / next slice
                    if ((dir === 1 && !aux.canSlideDown($slices, settings)) ||
                        (dir === -1 && !aux.canSlideUp($slices, settings))) {
                        aux.selectSlice($nextSlice, $slices, $navNext, $navPrev, settings);
                        return false;
                    }

                    // if we slide down, the top and position of each slice will decrease
                    if (dir === 1) {
                        cache.current++;
                        t = '-=' + cache.sliceH;
                        pos_increment = -1;
                    } else {
                        cache.current--;
                        t = '+=' + cache.sliceH;
                        pos_increment = 1;
                    }

                    $slices.each(function(i) {
                        var $slice = $(this),
                            pos = $slice.data('position');

                        // all closed or savePositions is false
                        if (!settings.savePositions || cache.idx_expanded === -1)
                            $slice.stop().animate({
                                left: t
                            }, settings.animSpeed, settings.animEasing);
                        else {
                            var itemHeight, othersHeight;

                            // if the slice is the one we should open..
                            if (i === $nextSlice.index()) {
                                $slice.data('expanded', true);
                                cache.idx_expanded = $slice.index();
                                itemHeight = settings.expandedHeight;
                                othersHeight = (settings.accordionH - settings.expandedHeight) / (settings.visibleSlices - 1);

                                $slice.stop()
                                    .animate({
                                        height: itemHeight + 'px',
                                        opacity: 1,
                                        left: (dir === 1) ? (pos - 2) * othersHeight + 'px' : pos * othersHeight + 'px'
                                    }, settings.animSpeed, settings.animEasing, function() {
                                        $slice.find('.va-content').fadeIn(settings.contentAnimSpeed);
                                    })
                                    .find('.va-title')
                                    .stop()
                                    .animate({
                                        lineHeight: cache.sliceH + 'px'
                                    }, settings.animSpeed, settings.animEasing);
                            }
                            // if the slice is the one opened, lets close it
                            else if ($slice.data('expanded')) {
                                // collapse

                                $slice.data('expanded', false);
                                othersHeight = (settings.accordionH - settings.expandedHeight) / (settings.visibleSlices - 1);

                                $slice.stop()
                                    .animate({
                                        height: othersHeight + 'px',
                                        opacity: 0,
                                        left: (dir === 1) ? '-=' + othersHeight : '+=' + settings.expandedHeight
                                    }, settings.animSpeed, settings.animEasing)
                                    .find('.va-title')
                                    .stop()
                                    .animate({
                                        lineHeight: othersHeight + 'px'
                                    }, settings.animSpeed, settings.animEasing)
                                    .end()
                                    .find('.va-content')
                                    .hide();
                            }
                            // all the others..
                            else {
                                $slice.data('expanded', false);
                                othersHeight = (settings.accordionH - settings.expandedHeight) / (settings.visibleSlices - 1);

                                $slice.stop()
                                    .animate({
                                        left: (dir === 1) ? '-=' + othersHeight : '+=' + othersHeight
                                    }, settings.animSpeed, settings.animEasing);
                            }
                        }
                        // change the slice's position
                        $slice.data().position += pos_increment;
                    });
                },
                canSlideUp: function($slices, settings) {
                    var $first = $slices.eq(cache.current);

                    if ($first.index() !== 0)
                        return true;
                },
                canSlideDown: function($slices, settings) {
                    var $last = $slices.eq(cache.current + settings.visibleSlices - 1);

                    if ($last.index() !== cache.totalSlices - 1)
                        return true;
                }
            },

            methods = {
                init: function(options) {

                    if (this.length) {

                        var settings = {
                            // the accordion's width
                            accordionW: vaH,
                            // the accordion's height
                            accordionH: 450,
                            // number of visible slices
                            visibleSlices: 3,
                            // the height of a opened slice
                            // should not be more than accordionH
                            expandedHeight: 750,
                            // speed when opening / closing a slice
                            animSpeed: 250,
                            // easing when opening / closing a slice
                            animEasing: 'jswing',
                            // opacity value for the collapsed slices
                            animOpacity: 0,
                            // time to fade in the slice's content
                            contentAnimSpeed: 900,
                            // if this is set to false, then before
                            // sliding we collapse any opened slice
                            savePositions: true
                        };

                        return this.each(function() {

                            // if options exist, lets merge them with our default settings
                            if (options) {
                                $.extend(settings, options);
                            }

                            var $el = $(this),
                                // the accordion's slices
                                $slices = $el.find('div.va-slice'),
                                // the navigation buttons
                                $navNext = $el.find('.nav-btn.va-nav-next'),
                                $navPrev = $el.find('.nav-btn.va-nav-prev');

                            // each slice's height
                            cache.sliceH = Math.ceil(settings.accordionW / settings.visibleSlices);
                            //alert(cache.sliceH);
                            // total slices
                            cache.totalSlices = $slices.length;

                            // control some user config parameters
                            if (settings.expandedHeight > settings.accordionH)
                                settings.expandedHeight = settings.accordionH;
                            else if (settings.expandedHeight <= cache.sliceH)
                                settings.expandedHeight = cache.sliceH + 50; // give it a minimum

                            // set the accordion's width & height
                            $el.css({
                                width: settings.accordionW + 'px',
                                height: settings.accordionH + 'px'
                            });

                            // show / hide $navNext 
                            if (settings.visibleSlices < cache.totalSlices)
                                $navNext.show();


                            // set the top & height for each slice.
                            // also save the position of each one.
                            // as we navigate, the first one in the accordion
                            // will have position 1 and the last settings.visibleSlices.
                            // finally set line-height of the title (<h3>)
                            $slices.each(function(i) {
                              //  alert(cache.sliceH);
                                    var $slice = $(this);
                                    $slice.css({
                                        left: i * cache.sliceH + 'px',
                                        width: cache.sliceH + 'px'
                                    }).data('position', (i + 1));
                                })
                                .children('.va-title')
                                .css('line-height', cache.sliceH + 'px');

                            // click event
                            $slices.bind('click.vaccordion', function(e) {
                                // only if we have more than 1 visible slice. 
                                // otherwise we will just be able to slide.
                                if (settings.visibleSlices > 1) {
                                    var $el = $(this);
                                    aux.selectSlice($el, $slices, $navNext, $navPrev, settings);
                                }
                            });

                            // navigation events
                            $navNext.bind('click.vaccordion', function(e) {
                                aux.navigate(1, $slices, $navNext, $navPrev, settings);
                            });

                            $navPrev.bind('click.vaccordion', function(e) {
                                aux.navigate(-1, $slices, $navNext, $navPrev, settings);
                            });

                            // adds events to the mouse
                            var scrollCountUp = 1;
                            var scrollCountDown = 1;
                            var slideDownFlag = false;
                            var slidpUpFlag = false;
                            var clearTimer = null;

                            if ($('.va-content').css('display') == "none") {
                                console.log("?");
                                $el.bind('mousewheel.vaccordion', function(e, delta) {

                                    if (delta > 0) {
                                        aux.navigate(-1, $slices, $navNext, $navPrev, settings);
                                        var redirect = window.location.pathname;
                                        var slRed = redirect.slice(0);
                                        scrollCountUp++

                                        // if (scrollCountUp > 80) {
                                        // 	var getLocat = $('.clients, .digtal-container').prev().data('anchor');
                                        // 	window.location.assign(redirect + '#' + getLocat);
                                        // }

                                        if (diffWeWorkSlideUp() <= 2) {

                                            if (slidpUpFlag) {
                                                var getLocat = $('.clients, .digtal-container').prev().data('anchor');
                                                window.location.assign(redirect + '#' + getLocat);
                                                slidpUpFlag = false;
                                            }
                                            slidpUpFlag = true;
                                            return true;

                                        }
                                        scrollCountDown = 1
                                    } else {
                                        aux.navigate(1, $slices, $navNext, $navPrev, settings);
                                        var redirect = window.location.pathname;
                                        var slRed = redirect.slice(0);
                                        scrollCountDown++

                                        // if (scrollCountDown > 80) {
                                        // 	var getLocat = $('.clients, .digtal-container').next().data('anchor');
                                        // 	window.location.assign(redirect + '#' + getLocat);
                                        // }

                                        if (getWeWrokSliderOffset() <= diffWeWorkSlideUp()) {
                                            if (slideDownFlag) {
                                                var getLocat = $('.clients').next().data('anchor');
                                                window.location.assign(redirect + '#' + getLocat);
                                                slideDownFlag = false;

                                            }
                                            slideDownFlag = true;
                                            return true;

                                        }
                                        scrollCountUp = 1
                                    }
                                    return false;
                                });

                            }

                            $(".vertical-slider").swipe({
                                swipeStatus: function(event, phase, direction, distance) {
                                    var str = "";
                                    if (phase == "move") {
                                        if (direction == "left") {
                                            aux.navigate(1, $slices, $navNext, $navPrev, settings);
                                        }
                                        if (direction == "right") {
                                            aux.navigate(-1, $slices, $navNext, $navPrev, settings);
                                        }
                                    }
                                },
                                triggerOnTouchEnd: false,
                                threshold: 200
                            });
                            var amount = Math.max.apply(Math, $(".vertical-slider .va-slice").map(function() {
                                return $(this).outerWidth(true);
                            }).get());

                            $(".vertical-slider").mCustomScrollbar({
                                axis: "x",
                                theme: "inset",
                                advanced: {
                                    autoExpandHorizontalScroll: true
                                },
                                scrollButtons: {
                                    enable: false,
                                    scrollType: "stepped"
                                },
                                keyboard: {
                                    scrollType: "stepped"
                                },
                                snapAmount: amount,
                                mouseWheel: {
                                    scrollAmount: amount
                                }
                            });
                        });
                    }
                }
            };

        $.fn.vaccordion = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                return methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' does not exist on jQuery.vaccordion');
            }
        };

    })(jQuery);
} else {

    $('.vertical-slider .va-slice:first .va-content').show();
    $('.vertical-slider .va-slice:first .va-content').css({
        'height': '720px',
        'transition': '0.4s all ease',
    });
    $('.vertical-slider .va-slice:first .cd-title').addClass('up');

    $('.vertical-slider .va-slice').bind('click', function() {
        /* Act on the event */
        $('.vertical-slider .va-slice .va-content').fadeOut();
        $('.vertical-slider .va-slice .va-content').css({
            'height': '0',
            'transition': '0.4s all ease',
        });
        $('.thumbDiv div').removeClass('up').addClass('down');


        if ($(this).find('.va-content').is(':hidden') == true) {
            $(this).find('.va-content').fadeIn('100');
            setTimeout(function() {
                console.log('open');
                $('.va-content').css({
                    'height': '720px',
                    'transition': '0.4s all ease',
                });
            }, 400)
            $(this).find('.thumbDiv div').addClass('up');

        }
    });
}

$(document).ready(function() {
    // home vertical slider animation
    winh = $(window).height();
    winW = $(window).width();
    if (winW > 960) {
        if ($('.va-container').length > 0) {
            $('.va-container').vaccordion({
                expandedHeight: 750,
                animSpeed: 1000,
                visibleSlices: 3,
                animEasing: 'easeInOutQuad',
                animOpacity: 0.9,

            });
        }

    } else {
        // if ($('.va-container').length > 0) {
        //     $('.va-container').vaccordion({
        //         accordionH: 600,
        //         expandedHeight: 600,
        //         animSpeed: 1000,
        //         visibleSlices: 6,
        //         animEasing: 'easeInOutExpo',
        //         animOpacity: 0.9,

        //     });
        // }

    }
});

function getWeWrokSliderOffset() {
    var conWidth = parseInt($("#mCSB_1_container")[0].style.width.replace(/[^\d\.\-]/g, ''));

    var mainConWidth = parseInt($("#va-accordion")[0].style.width.replace(/[^\d\.\-]/g, ''));
    // console.log('mainConWidth', mainConWidth);
    var diffWidth = conWidth - mainConWidth;
    // console.log('diffWidth', diffWidth);
    return diffWidth;
}

function diffWeWorkSlideUp() {
    var diff_wid = parseInt($("#va-accordion .va-slice")[0].style.width.replace(/[^\d\.\-]/g, ''));
    //console.log(diff_wid);
    var final_diff = diff_wid - getWeWrokSliderOffset();
    //console.log(final_diff);
    return final_diff;
}