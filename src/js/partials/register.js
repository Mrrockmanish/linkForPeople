$(document).ready(function(){
    $('.registr').on('click', function(e) {
        $('#register').removeClass('hid-form');
        $('#login').addClass('hid-form');
    });

    $('.enter').on('click', function(e) {
        $('#register').addClass('hid-form');
        $('#login').removeClass('hid-form');
    });
    $('.forgot-passw').on('click', function(e) {
        $('#login').addClass('hid-form');
        $('#forgot-form').removeClass('hid-form');
    });
    $('.enter2').on('click', function(e) {
        $('#forgot-form').addClass('hid-form');
        $('#login').removeClass('hid-form');
    });

    $('.see-sga-terms').on('click', function (e) {
        $('.sga-terms-wrap').removeClass('hid-form');
        $('.sga-payments-wrap').addClass('hid-form');
        $('.single-item-slider').addClass('hid-form');
        // $('.logo-sga').addClass('smallmargin');
    });

    $('.see-sga-payments').on('click', function(e) {
        $('.sga-payments-wrap').removeClass('hid-form');
        $('.single-item-slider').addClass('hid-form');
        $('.sga-terms-wrap').addClass('hid-form');
        // $('.logo-sga').addClass('smallmargin');
    });

    $('#info-close').on({
        click: function () {
            $('.sga-terms-wrap').addClass('hid-form');
            $('.single-item-slider').removeClass('hid-form');
            // $('.logo-sga').removeClass('smallmargin');
        }
    });

    $('#payments-close').on({
        click: function () {
            $('.sga-payments-wrap').addClass('hid-form');
            $('.single-item-slider').removeClass('hid-form');
            // $('.logo-sga').removeClass('smallmargin');
        }
    });


    // mobile line show
    if (window.innerWidth < 1170) {

        // mobile
        // enter
        $('.enter-mob').on('click', function(e) {
            e.preventDefault();
            $('#login').css({'display': 'block'});
            $('#register').css({'display': 'none'});
            $('.single-item-slider').addClass('hid-form');
            $('.logo-sga').css({'display': 'none'});
        });

        // register
        $('.registr-mob').on('click', function(e) {
            e.preventDefault();
            $('#login').css({'display': 'none'});
            $('#register').css({'display': 'block'});
            $('.single-item-slider').addClass('hid-form');
            $('#forgot-form').addClass('hid-form');
            $('.logo-sga').css({'display': 'none'});
        });

        // forgot passw
        $('.forgot-passw').on('click', function(e) {
            $('#login').css({'display': 'none'});
            $('#forgot-form').removeClass('hid-form');
        });

        $('.see-sga-terms').on('click', function(e) {
            $('.logo-sga').css({'display': 'none'});
            $('#register').css({'display': 'none'});
            $('#login').css({'display': 'none'});
            $('.mob-line').addClass('opacity0');
            // $('.logo-sga.hid-desctop').addClass('smallmargin');
        });

        $('.see-sga-payments').on('click', function(e) {
            $('.logo-sga').css({'display': 'none'});
            $('#register').css({'display': 'none'});
            $('#login').css({'display': 'none'});
            $('.mob-line').addClass('opacity0');
            // $('.logo-sga.hid-desctop').addClass('smallmargin');
        });

        $('.info-close').on('click', function(e) {
            $('#register').css({'display': 'none'});
            $('#login').css({'display': 'none'});
            $('.mob-line').removeClass('opacity0');
            $('.logo-sga').each(function () {
                if (!$(this).hasClass('hid-desctop')) {$(this).css({'display': 'block'});}
            });
            // $('.logo-sga.hid-desctop').removeClass('smallmargin');
        });

        $('.sga-close').on('click', function(e) {
            $('#register').css({'display': 'none'});
            $('#login').css({'display': 'none'});
            $('.single-item-slider').removeClass('hid-form');
            $('#forgot-form').addClass('hid-form');
            $('.logo-sga').each(function () {
               if (!$(this).hasClass('hid-desctop')) {$(this).css({'display': 'block'});}
            });
        });

    }


// additional js
    if($(window).width() < 768) {
        $("#educator-register").mCustomScrollbar('destroy');
    }

    $(".ui-slider-item-js").each(function () {
        $(this).slider({
            min: $(this).data('min'),
            max: $(this).data('max'),
            values: [$(this).data('min'),$(this).data('max')],
            range: true,
            step: $(this).data('step'),
            animate: 'slow',
            stop: function(event, ui) {
                $(this).parent().find('.max-value-js').val(ui.value);
            },
            slide: function(event, ui){
                $(this).parent().find('.max-value-js').val(ui.value);
                $(this).parent().find('.current-value-js .value').html(ui.value)
            },
            create: function( event, ui ) {
                $(this).find('.ui-slider-handle').eq(0).css('display', 'none');
                $(this).parent().find('.current-value-js .value').html($(".ui-slider-item-js").slider("values",1));
                $(this).parent().find('.max-value-js').val($(".ui-slider-item-js").slider("values",1));
            }
        });
    });

    // $(".phone-mask").mask("+7(999) 999-99-99");
});

$(window).on("load",function(){
    $(".terms-text").mCustomScrollbar();
    $("#educator-register").mCustomScrollbar({
        theme:"my-theme"
    });
    $(".payments-text").mCustomScrollbar();
});