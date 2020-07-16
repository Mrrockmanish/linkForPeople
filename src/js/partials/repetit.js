$(function () {

    // Добавить кнопку "показать больше" в резюме
    addShowMoreButton();

    document.forms[0].reset();

    var bannerSwiper = new Swiper('.banner', {
        slidesPerView: 3,
        spaceBetween: 30,
        breakpoints: {
            480: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15
            }
        }
    });

    $('.input-digit input').bind("change keyup input click", function() {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });

    $('.input-subject input[type="text"]').click(function(event){
        event.stopPropagation();
    });

    $(window).click(function() {
        $('.dropdown-items').addClass('hide');
    });

    $('#subject select').on('focus', function () {
        $('#subjectFor').addClass('hide');
        $('#subjectFor input').val('');
        $('#subjectFor .submenu__body .dropdown-items').remove;
    });

    $('.hamburger-filter').on('click', function () {
        $('.fixed-wrapper').removeClass('hide');
        $('body').addClass('body-overflow');
        $('.filter-sidebar').addClass('opened');
        $('.filter-sidebar__header').addClass('opened');
    });

    $('.filter-sidebar-close, .fixed-wrapper').on('click', function () {
        $('.fixed-wrapper').addClass('hide');
        $('body').removeClass('body-overflow');
        $('.filter-sidebar').removeClass('opened');
        $('.filter-sidebar__header').removeClass('opened');
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('.sorter__item').on('click', function () {
        $('.sorter__item').toggleClass('is-up');
    });


    $('.popular-themes').find('.popular-themes__item').each(function () {
        if($(window).width() < 992) {
            var string = $(this).text();
            $(this).text(cutString(string, 15));
        }
    });
    $('.page-info').find('.subtitle').each(function () {
        var string = $(this).text();
        $(this).text(cutString(string, 50));
    });
    $(window).on('resize', function () {
        if($(window).width() < 992) {
            $('.popular-themes').find('.popular-themes__item').each(function () {
                var string = $(this).text();
                $(this).text(cutString(string, 15));
            });
            $('.page-info').find('.subtitle').each(function () {
                var string = $(this).text();
                $(this).text(cutString(string, 50));
            });
        }
    });

    $('.select-subject-js select').on('change', function () {
        $('#subjectFor').removeClass('hide');
        $('#subjectFor select').children().remove();
        $.ajax({
            type:'GET',
            url:'ajax-repetit.php',
            processData: false,
            contentType: false,
            success: function(data) {
                $('#subjectFor select').append(data);
            }
        });
    });
});

function AllChatsToggle(clicked_id) {
    var el = document.getElementById(clicked_id);
    $(el).children().children().toggleClass('text-muted');
}

function muteNotifications(clicked_class) {
    var el = document.getElementsByClassName(clicked_class);
    var child = $(el).children().children().toggleClass('fa-volume-up fa-volume-off');
    if (child.hasClass('fa-volume-up')) {
        alert((clicked_class + ' span'));
        $('.' + clicked_class + ' span').text('Выключите звук уведомления');
    } else {
        $('.' + clicked_class + ' span').text('Включите звук уведомления');
    }
}

function subjectSelect(element) {
    var container = $("#" + $(element).data('id'));
    container.find('.input-subject input[type="text"]').val($(element).text());
    $(element).parent().addClass('hide');
}

function showSubmenuBody(element) {
    var mainEl = $(document).find('#' + $(element).data('id'));
    mainEl.find('.submenu__body').toggleClass('hide');
}

function checkedBackground(element) {

    // activeHeaderBlock();
    disactivateRemotenessHeader();
    disactivateLessonHeader();

    if ($(element).find('input[type="checkbox"]').is(':checked')){
        $(element).addClass('input-checked');
    } else {
        $(element).removeClass('input-checked');
    }
}

function activeHeaderBlock() {
    var count = 0;

    $('#format').find('input[type="checkbox"]').each(function () {
        if ($(this).is(':checked')) {
            count = count + 1;
        }
    });

    if(count > 0) {
        $('#format').addClass('active');
    } else {
        $('#format').removeClass('active');
    }
}

function disactivateRemotenessHeader() {

    var count = 0;

    $('#format').find('.remoteness-lesson-child input[type="checkbox"]').each(function () {
        if ($(this).is(':checked')) {
            count = count + 1;
        }
    });

    if(count < 1) {
        if($('#format .remoteness-lesson-main').hasClass('input-checked')){
            $('#format .remoteness-lesson-main').find('input').prop('checked', false);
            $('#format .remoteness-lesson-main').removeClass('input-checked');
        }
    }
}

function disactivateLessonHeader() {

    var count = 0;
    var common_count = 0;

    $('#format').find('.format-lesson-child input[type="checkbox"]').each(function () {
        common_count = common_count + 1;
        if ($(this).is(':checked')) {
            count = count + 1;
        }
    });

    if(count < common_count) {
        if($('#format .format-lesson-main').hasClass('input-checked')){
            $('#format .format-lesson-main').find('input').prop('checked', false);
            $('#format .format-lesson-main').removeClass('input-checked');
        }
    }
}

function formatLessonChildChange(element){
    if ($(element).find('input[type="checkbox"]').is(':checked')){
        $('.filter-sidebar').find('.format-lesson-child').each(function () {
            $(this).find('input').prop('checked', true);
            checkedBackground(this);
        });
    } else {
        $('.filter-sidebar').find('.format-lesson-child').each(function () {
            $(this).find('input').prop('checked', false);
            checkedBackground(this);
        });
    }
    checkedBackground(element);
}

function remotenessLessonChildChange(element){
    if ($(element).find('input[type="checkbox"]').is(':checked')){
        $('.filter-sidebar').find('.remoteness-lesson-child').each(function () {
            $(this).find('input').prop('checked', true);
            checkedBackground(this);
        });
    } else {
        $('.filter-sidebar').find('.remoteness-lesson-child').each(function () {
            $(this).find('input').prop('checked', false);
            checkedBackground(this);
        });
    }
    checkedBackground(element);
}

function showMoreTextAbout(id, element){
    var resume = $(id);
    resume.find('.educator-info').toggleClass('is-show');
    if(resume.find('.educator-info').hasClass('is-show')) {
        $(element).css({'transform' : 'rotateX(180deg)'});
    } else {
        $(element).css({'transform' : 'rotateX(0deg)'});
    }
}

function toggleShares(id, element) {
    var resume = $(id);
    resume.find('.educator__shares').toggleClass('is-show');
    if(resume.find('.educator__shares').hasClass('is-show')) {
        $(element).css({'transform' : 'rotateX(180deg)'});
    } else {
        $(element).css({'transform' : 'rotateX(0deg)'});
    }
}

function addShowMoreButton() {
    $(document).find('.show-more-block-js').each(function () {
        if($(this).height() > 24){
            $(this).find('.text').addClass('blur-js');
            var html = '<span class="show-more pointer" onclick="showMoreBlock(this);"><i class="fa fa-angle-down"></i></span>';
            $(this).prepend(html);
        }
    })
}

function showMoreBlock(element) {
    var container = $(element).parent();
    container.toggleClass('is-show');
    if(container.hasClass('is-show')) {
        $(element).css({'transform' : 'rotateX(180deg)'});
    } else {
        $(element).css({'transform' : 'rotateX(0deg)'});
    }
}

function getSubjectsDropdown(element) {
    $(element).val('');
    var container = $("#" + $(element).data('id'));
    $(container).find('.dropdown-items').removeClass('hide');
}

function cutString(element, limit) {
    var sliced = element.slice(0,limit);
    if (sliced.length < element.length) {
        sliced += '...';
    }
    return sliced;
}