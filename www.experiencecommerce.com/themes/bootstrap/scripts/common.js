var themeUrl = 'https://www.experiencecommerce.com/themes/bootstrap/';

function closeIconBehaviour() {
    $('#menuLogo').toggleClass('active');
    $('.menuContent').toggleClass('active');
};

function removeClass() {
    $('#nav-numbers').removeClass('changeTheme');
};


var windowLoc = window.location.href;
var arr = ["Introduction.", "Services.", "Clients.", "Wins so far.", "Get in touch."];
if (windowLoc.indexOf("solutions") >= 0) {
    var arr = ["Introduction.", "Services.", "Case Study.", "What we do.", "Get in touch."];
} else if (windowLoc.indexOf("showcase") >= 0) {
    var arr = ["Introduction.", "Case Study", "Get in touch."];
}


function addColor(color) {
    $(".headerContent").removeClass("menuWhite");
    $(".navData").removeClass("breadcrumbWhite");
    $(".headerContent").removeClass("menuBlack");
    $(".navData").removeClass("breadcrumbBlack");
    $(".headerContent").addClass("menu" + color);
    $(".navData").addClass("breadcrumb" + color);
}

function changeMenu() {
    if ($(window).width() > 1025) {
        if ((windowLoc.indexOf("blogs/") >= 0) || (windowLoc.indexOf("showcase/") >= 0) || (windowLoc.indexOf("careers") >= 0) || (windowLoc.indexOf("contact-us") >= 0) || (windowLoc.indexOf("solutions") >= 0)) {
            console.log((windowLoc.indexOf("contact-us")));
            if ((windowLoc.indexOf("showcase/") >= 0) || (windowLoc.indexOf("blogs/") >= 0)) {
                if ($(window).scrollTop() > $(".page2").offset().top) {
                    addColor('Black');
                } else {
                    addColor('White');
                }
            } else {
                addColor('Black');
            }
        } else if ($("section").hasClass("errorPage")) {
            addColor('Black');
        }
    } else {
        if ((windowLoc.indexOf("contact-us") >= 0)) {
            addColor('Black');
        } else {
            addColor('White');
        }

    }
}
var currentDiv = '';
$(window).scroll(function() {
    changeMenu();
    $(".dropdown-arrow").fadeOut();
    if ($(".fourthPage").length > 0) {
        if ($(window).scrollTop() > ($(".fourthPage").offset().top + 100)) {
            $(".contactfloatbtn").hide();
        } else {
            $(".contactfloatbtn").show();
        }
    }

})

$(document).ready(function() {

    // add color to the menu
    changeMenu();

    // append blinker inside first section
    if ($(window).width() > 1025) {
        $(".section:first").append("<div class='dropdown-arrow'><div id='arrowmoving'></div></div>");
    }

    $("#menuLogo").click(function() {
        closeIconBehaviour();
    });

    if ($(window).width() > 1025) {

        $('.item2').addClass('sel');
        $('.path-taxonomy .item2').addClass('sel');
        // $('.path-taxonomy.fp-viewing-fourthPage .item1').addClass('sel');
        $('.path-taxonomy.fp-viewing-fourthPage .mediaver .item1').removeClass('sel');

        $('.path-taxonomy.fp-viewing-fourthPage .item2').removeClass('sel');
        $('.item1').bind('mouseenter', function() {
            $(".innergridNew").addClass('redbg');
            $(".innergridNew").addClass('redimg')
            $(".descpGreen").css("color", "#df6157");
            $(".descpBlue").css("color", "#df6157");
            $('.item2').removeClass('sel');
            $('.path-taxonomy .item2').removeClass('sel');
            // $('.path-taxonomy.fp-viewing-fourthPage .item1').removeClass('sel');

        }).bind('mouseleave', function() {
            $(".innergridNew").removeClass('redbg');
            $(".innergridNew").removeClass('redimg')
            $(".descpGreen").css("color", "rgba(255,255,255,0.5)");
            $(".descpBlue").css("color", "rgba(255,255,255,0.5)");
            $('.item2').addClass('sel');
            $('.path-taxonomy .item2').addClass('sel');
            // $('.path-taxonomy.fp-viewing-fourthPage .item1').addClass('sel');
        })

        $('.item2').bind('mouseenter', function() {
            $(".innergridNew").addClass('bluebg');
            $(".innergridNew").addClass('bluimg')
            $(".descpGreen").css("color", "#5173ff");
            $(".descpRed").css("color", "#5173ff");
            $('.item2').removeClass('sel');
            $('.path-taxonomy .item2').removeClass('sel');
            // $('.path-taxonomy.fp-viewing-fourthPage .item1').removeClass('sel');
        }).bind('mouseleave', function() {
            $(".innergridNew").removeClass('bluebg');
            $(".innergridNew").removeClass('bluimg')
            $(".descpGreen").css("color", "rgba(255,255,255,0.5)");
            $(".descpRed").css("color", "rgba(255,255,255,0.5)");
            $('.item2').addClass('sel');
            $('.path-taxonomy .item2').addClass('sel');
            // $('.path-taxonomy.fp-viewing-fourthPage .item1').addClass('sel');
        })

        $('.item3').bind('mouseenter', function() {
            $(".innergridNew").addClass('greenbg');
            $(".innergridNew").addClass('greenimg')
            $(".descpRed").css("color", "#53c381");
            $(".descpBlue").css("color", "#53c381");
            $('.item2').removeClass('sel');
            $('.path-taxonomy .item2').removeClass('sel');
            // $('.path-taxonomy.fp-viewing-fourthPage .item1').removeClass('sel');
        }).bind('mouseleave', function() {
            $(".innergridNew").removeClass('greenbg');
            $(".innergridNew").removeClass('greenimg')
            $(".descpRed").css("color", "rgba(255,255,255,0.5)");
            $(".descpBlue").css("color", "rgba(255,255,255,0.5)");
            $('.item2').addClass('sel');
            $('.path-taxonomy .item2').addClass('sel');
            // $('.path-taxonomy.fp-viewing-fourthPage .item1').addClass('sel');
        })

    } else {
        $('.item1').addClass('redbg');
        $('.item2').addClass('bluebg').addClass('sel');
        $('.path-taxonomy .item2').addClass('redbg').addClass('sel');
        //$('.path-taxonomy.fp-viewing-fourthPage .item1').addClass('redbg').addClass('sel');
        $('.item3').addClass('greenbg');
    }

    var sticky = $('.topTab ');
    var scrollDirection = '';
    if ($(window).width() > 1025 && (windowLoc.indexOf("blogs") < 0) && (windowLoc.indexOf("showcase/") < 0)) {
        $('#fullpage').fullpage({
            licenseKey: '298A664F-AE744FA9-9A0C73B4-B8CE40B4',
            menu: '#nav-numbers',
            anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage','sixthPage','seventhPage'],
            navigation: false,
            fixedElements: '.fixedSide',
            normalScrollElements: '.digtal-container',
            //events
            onLeave: function(index, nextIndex, direction) {
                scrollDirection = direction;
            },
            afterLoad: function(anchorLink, index, direction) {
                var indexVal = index.index;

                // hide the cursor
                if (indexVal > 0) {
                    $(".dropdown-arrow").fadeOut();
                }

                // change the menu color on scroll
                if (((window.location.pathname.indexOf("showcase") >= 0) || (window.location.pathname == "/")) && indexVal < 1) {
                    addColor('White');
                } else if (((window.location.pathname.indexOf("showcase") >= 0) || (window.location.pathname.indexOf("/") >= 0)) && indexVal >= 1) {
                    addColor('Black');
                }

                // since video pauses on scroll, play it when scroll
                if ($("#myVideo").length > 0) {
                    document.getElementById('myVideo').play();
                }

                // to hide the services ul tab on solutions page

                $('.slideTitle').hide();
                if (indexVal > 1) {
                    $(".servicesUl").hide();
                } else {
                    $(".servicesUl").show();
                }

                // for breadcrumb text
                $('.slideTitle').html(arr[indexVal]);
                $('.slideTitle').css("display", "block");

                // stop the fullpage js here
                if (window.location.pathname.indexOf("solutions") >= 0) {
                    if (indexVal == 4) {
                        $(".contactfloatbtn").hide();
                    } else {
                        $(".contactfloatbtn").show();
                    }
                }
                if ((indexVal == 2 || indexVal == 1) && (window.location.pathname.indexOf("solutions") >= 0)) {
                    if (indexVal == 2) {
                        if (scrollDirection == "down") {
                            swiper.slideTo(1, 1000);
                        }
                        fullpage_api.setAllowScrolling(false);
                    } else {
                        ended = false;
                        fullpage_api.setAllowScrolling(false);
                    }

                } else if ((indexVal == 1) && (window.location.pathname.indexOf("showcase") >= 0)) {
                    if (scrollDirection == "down") {
                        swiper.slideTo(1, 1000);
                    }
                    fullpage_api.setAllowScrolling(false);
                } else {
                    fullpage_api.setAllowScrolling(true);
                }
            },
            afterRender: function() {},
            afterResize: function() {},
            afterResponsive: function(isResponsive) {},
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {},
            onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {

            }
        });
    }
})

var $window = $(window),
    $card = $('.innergrid'),
    $card1 = $('.career-leftdiv ul'),
    $card2 = $(".digitab");

$(window).load(function() {
    if (window.location.pathname == '/') {
        $(".headerContent").addClass("addBg");
    }

    toggleSlick = function() {
        if ($window.width() < 650) {
            $('.innergrid').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                centerMode: true,
                centerPadding: '40px',

            });
            //alert("hi");
            $(".digitab").slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                autoPlay: true,
            });
            $('.mobileAward').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                cssEase: 'ease',
                infinite: true,
                autoPlay: true,
                centerMode: true,
                centerPadding: '40px'
            });
            // $card1.slick({
            //     infinite: false,
            //     slidesToShow: 1,
            //     slidesToScroll: 1,


            // });
            $(".selct").click(function() {
                $(".career-leftdiv ul").slideToggle();

            });


        } else {
            if ($('.innergrid').hasClass("slick-initialized")) {
                $('.innergrid').slick('unslick');
            }
        }
    }

    $window.resize(toggleSlick);
    toggleSlick();


    var screenheight = $(window).height();
    var screenwidth = $(window).width();
});