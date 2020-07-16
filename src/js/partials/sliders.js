function swiperInit2() {
    $(document).find('.swiper-container').each(function () {
        swiperInit($(this));
    });
}
swiperInit2();

/**
 *
 * @param $el - .swiper-container, dataset = data-... (data-autoplay="false")
 */
function swiperInit($el){
    var pagination = $el.find('.swiper-pagination');
    var navigationPrev = $el.find('.swiper-button-prev');
    var navigationNext = $el.find('.swiper-button-next');
    var param = {
        direction: 'horizontal',
        loop: false,
        speed: 1000,
        spaceBetween: 0,
        autoplay: false,
        pagination: {
            el: pagination ? pagination : '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: navigationNext ? navigationNext : '.swiper-button-next',
            prevEl: navigationPrev ? navigationPrev : '.swiper-button-prev',
        },
        breakpoints: $el.parent().hasClass('swiper--interest') ? {
            992: {
                slidesPerView: 6,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            576: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
        } : $el.parent().hasClass('swiper-themes') ? {
            992: {
                slidesPerView: 5,
                spaceBetween: 5,
            },
            768: {
                slidesPerView: 5,
                spaceBetween: 5,
            },
            576: {
                slidesPerView: 3,
                spaceBetween: 5,
            },
        } : $el.parent().hasClass('banner') ? {
            992: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            576: {
				slidesPerView: 'auto',
                spaceBetween: 15,
            },
        } : $el.hasClass('panel-courses__slider') ? {
            992: {
                slidesPerView: 2.5,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 2.2,
                spaceBetween: 15,
            },
            576: {
				slidesPerView: 1.1,
                spaceBetween: 8,
            },
        } : {
            992: {
                slidesPerView: 3,
                    spaceBetween: 15,
            },
            768: {
                slidesPerView: 2,
                    spaceBetween: 15,
            },
            576: {
                slidesPerView: 1,
                    spaceBetween: 15,
                    centeredSlides: true,
            },
        }
    };

    var dataset = $el.data();
    for (var prop in dataset){
        param[prop] = dataset[prop];
    }

    var slider = new Swiper($el[0], param);
    $el.data('swiper', slider);
}