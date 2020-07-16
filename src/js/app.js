// app.js
@@include('./partials/ui-slider.js');
@@include('./partials/sliders.js');
@@include('./partials/repetit.js');
@@include('./partials/register.js');
@@include('./partials/select-tree.js');
@@include('./partials/datepicker.js');
@@include('./partials/timer.js');
@@include('./partials/rating.js');
@@include('./partials/ce-quest.js');

$(function () {

    initAll();
    //инициализация функций для ajax end

    //ajax-progress
    NProgress.configure({showSpinner: false});
    $(document).ajaxStart(function() {
        NProgress.remove();
        NProgress.start();
    });

    $(document).ajaxComplete(function() {
        NProgress.done();
        NProgress.remove();
    });

    $('.user-navigation-js .filter:last-child').on('click', function () {
        // $(document).find('.ajax-progress').css({
        //     width: 0
        // });
        // $(document).find('.ajax-progress').removeClass('down');
        $.ajax({
            // xhr: function () {
            //     var xhr = new window.XMLHttpRequest();
            //     xhr.upload.addEventListener("progress", function (evt) {
            //         if (evt.lengthComputable) {
            //             var percentComplete = evt.loaded / evt.total;
            //             $(document).find('.ajax-progress').css({
            //                 width: percentComplete * 100 + '%'
            //             });
            //             if (percentComplete == 1) {
            //                 $(document).find('.ajax-progress').addClass('down');
            //             }
            //         }
            //     }, false);
            //     xhr.addEventListener("progress", function (evt) {
            //         if (evt.lengthComputable) {
            //             var percentComplete = evt.loaded / evt.total;
            //             $('.ajax-progress').css({
            //                 width: percentComplete * 100 + '%'
            //             });
            //             if (percentComplete == 1) {
            //                 $(document).find('.ajax-progress').addClass('down');
            //             }
            //         }
            //     }, false);
            //     return xhr;
            // },
            // beforeSend: NProgress.start,
            // complete: NProgress.done,
            type: 'GET',
            url: 'big_ajax.php',
            cache: false,
            success: function (data) {

            },
        }).done(function(){
            // $(document).find('.ajax-progress').addClass('down');
        });
    });
    //ajax-progress end

    //убираем скачок при загрузке страницы от стандартоного скроллбара
    // $(window).on('load', function(){
    //     $("body").css("overflow", "auto");
    //     setScroll();
    // });
    setScroll();

    $(window).on('resize', setScroll);

	var entityMap = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;',
		'/': '&#x2F;',
		'`': '&#x60;',
		'=': '&#x3D;'
	};

	function escapeHtml(string) {
		return String(string).replace(/[&<>"'`=\/]/g, function (s) {
			return entityMap[s];
		});
	}

    // user-card begin
    var editable = false;

    $('.user-card__person .avatar_square').hover(function () {
        $('.profile-avatar-changer').show();
    }, function () {
        $('.profile-avatar-changer').hide();
    });

    $('.user-card__screen').hover(function () {
        if(!editable) {
            $('.profile-cover-changer .when-notedit').show();
        } else {
            $('.profile-cover-changer .when-edit').show();
        }
    }, function () {
        if(!editable) {
            $('.profile-cover-changer .when-notedit').hide();
        } else {
            $('.profile-cover-changer .when-edit').show();
        }
    });
    // user-card end

    //publisher box
    var publisherSlideWidth = $('.swiper-themes .swiper-slide:last-child').width(); /* Запоминаем ширину слайда */


    $(window).on('click', function(e) {
        target = $(e.target);
        if (!target.closest('.publisher-slide').length && $('.publisher-box-fixed').hasClass('activated')) {
            $(document).find('.publisher-box-fixed').removeClass('activated');
        } else if (!$('.swiper-themes').length) {
            $('.publisher-box__header .publisher').outerHeight(45);
            $('.publisher-box__footer').addClass('hide');
            $('.publisher-box__hide-form').addClass('hide');
        }

        // if (!$(e.target).is('.publisher-slide')) {
        //     if ($('.swiper-themes').length) {
        //         // console.log(1);
        //         if ($(document).find('.publisher-box-fixed').hasClass('activated')) {
        //             $(document).find('.publisher-box-fixed').removeClass('activated');
        //         }
                // if (publisher.hasClass('activated')) publisher.removeClass('activated');
                // $('.swiper-themes .publisher-slide').css('width', publisherSlideWidth + 'px');
                // $('.swiper-themes .publisher-slide').css('margin-right', 5 + 'px');
                // $('.swiper-themes .publisher-slide').attr('style', 'width:' + publisherSlideWidth + 'px; margin-right: 5px');
                // $('.publisher-box__header .publisher').outerHeight(55);
            // } else {
            //     $('.publisher-box__header .publisher').outerHeight(45);
            //     $('.publisher-box__footer').addClass('hide');
            //     $('.publisher-box__hide-form').addClass('hide');
            // }

        // }
        // else {
        //     if ($('.swiper-themes').length) {
        //         console.log(1);
        //         var publisher = $(document).find('.publisher-box-fixed');
        //         publisher.removeClass('activated');
        //     }
        // }
    });


    $(window).on('scroll', function () {
        if ($(window).width() < 992 && $('.publisher-box-fixed').hasClass('activated')) {
            $(document).find('.publisher-box-fixed').removeClass('activated');
        }
    });


    $(document).on('click', '.publisher-slide', function(event){
        var publisher = $(document).find('.publisher-box-fixed');
        publisher.addClass('activated');
    });

    $(document).on('click', '.publisher-box', function(event){
        event.stopPropagation();
    });
    // publisher box end

    //sticky panel-themes
    var headerY = $(window).height();
    var scrollYref = headerY + 800;

    $(window).scroll(function () {
        var scrollYnew = $(window).scrollTop();

        if (scrollYnew > headerY) {
            if (scrollYnew > scrollYref) {
                $('.panel-themes, .news-header').removeClass('animateIn');
                $('.panel-themes, .news-header').addClass('animateOut');
            } else {
                $('.panel-themes, .news-header').removeClass('animateOut');
                $('.panel-themes, .news-header').addClass('animateIn');
            }

            $('.panel-themes, .news-header').addClass("sticky");
            if (scrollYnew > headerY + 800) {
                scrollYref = scrollYnew;
            }
        } else {
            $('.panel-themes, .news-header').removeClass("sticky");
        }

    });

    (function () {
        if ($(window).scrollTop() > headerY) {
            $('.panel-themes, .news-header').addClass("sticky");
        }
    })();

    $('.theme-slide').on('click', function () {
        $('.theme-slide').removeClass('is-active');
        $(this).addClass('is-active');
    });
    //sticky panel-themes end

    // comment textarea open
    $(window).click(function() {
        $('.input-icon').removeClass('opened');
        $('.input-icon .input-icon__list').addClass('hide');
    });

    $(document).on('click', '.input-icon', function(event){
        event.stopPropagation();
    });

    $(document).on('input', '.input-icon .comment-textarea', function() {
        var scroll_height = $(this).get(0).scrollHeight;
        if(scroll_height > 180){
            $(this).css('height', scroll_height + 'px');
        }
    });
    // comment textarea open end


    //settings
    $(document).on('click', '.panel-settings__header .menu-icon', function () {
        $('.fixed-wrapper').removeClass('hide');
        $('body').addClass('body-overflow');
        $('.settings-menu').addClass('opened');
    });

    $(document).on('click', '.fixed-wrapper, .settings-menu-close', function () {
        $('.fixed-wrapper').addClass('hide');
        $('body').removeClass('body-overflow');
        $('.settings-menu').removeClass('opened');
    });

    $(document).on('click', '.settings-menu__item', function () {
       $(document).find('.settings-menu__item').removeClass('active');
       $(this).addClass('active');
    });
    //settings end

    //media
    $(document).on('click', 'btn-disabled', function () {
        return false;
    });

    $(document).on('click', '.btn-create-js', function () {
        var container = $(this).closest('.form-parent-js');
        container.find('.form').removeClass('hide');
        $(this).addClass('btn-disabled');
    });

    $(document).on('click', '.btn-find-js', function () {
        var container = $(this).closest('.form-parent-js');
        container.find('.form-find').removeClass('hide');
        $(this).addClass('btn-disabled');
    });

    $(document).on('click', '.btn-create-cancel-js', function () {
        var container = $(this).closest('.form-parent-js');
        $(this).closest('form').addClass('hide');
        container.find('.btn-create-js').removeClass('btn-disabled');
    });

    $(document).on('click', '.btn-find-cancel-js', function () {
        var container = $(this).closest('.form-parent-js');
        $(this).closest('form').addClass('hide');
        container.find('.btn-find-js').removeClass('btn-disabled');
    });
    //media end

    //science
    $(document).on('click', '.panel-science .science-menu a', function () {
        if($(this).attr('href') == "#scienceAll") {
            //ajax need here
            $(document).find('.all-science-posts').removeClass('hide');
            $(document).find('.my-science-posts').addClass('hide');
            $(document).find('.panel-science__body').addClass('hide')
        }

        if($(this).attr('href') == "#scienceMy") {
            //ajax need here
            $(document).find('.all-science-posts').addClass('hide');
            $(document).find('.my-science-posts').removeClass('hide');
            $(document).find('.panel-science__body').removeClass('hide')
        }

        if($(this).attr('href') == "#scienceBoard") {
            //ajax need here
            $(document).find('.all-science-posts').removeClass('hide');
            $(document).find('.my-science-posts').addClass('hide');
            $(document).find('.panel-science__body').removeClass('hide')
        }
    });
    //science end

	//courses
	$(document).on('click', '.switcher-btn', function (e) {
		e.preventDefault();

		var $this = $(this),
			$switcher = $this.closest('.switcher'),
			$currentQuestion = $switcher.find('.current-count'),
			currentQuestionNumber = parseInt($currentQuestion.html()),
			totalQuestionNumber = parseInt($switcher.find('.total-count').html());

		if ($this.hasClass('switch-disabled')) return false;
		if ($this.hasClass('switch-next')) {
			if (currentQuestionNumber >= totalQuestionNumber) return false;
			$(document).find('.test-question').removeClass('active');
			$(document).find('.test-question[data-question="'+ (currentQuestionNumber + 1) + '"]').addClass('active');
			$currentQuestion.html(currentQuestionNumber + 1);
			if ((currentQuestionNumber + 1) === totalQuestionNumber) {
				$this.removeClass('switch-active').addClass('switch-disabled');
			}
			if ((currentQuestionNumber + 1) > 1) {
				$switcher.find('.switch-prev').removeClass('switch-disabled').addClass('switch-active');
			}
		} else {
			$(document).find('.test-question').removeClass('active');
			$(document).find('.test-question[data-question="'+ (currentQuestionNumber - 1) + '"]').addClass('active');
			$currentQuestion.html(currentQuestionNumber - 1);
			if (currentQuestionNumber == totalQuestionNumber) {
			    $switcher.find('.switch-next').removeClass('switch-disabled').addClass('switch-active');
			}
			if ((currentQuestionNumber - 1) === 1) {
				$switcher.find('.switch-prev').removeClass('switch-active').addClass('switch-disabled');
			}
		}
	});

	$(document).on('click', '.switchable-btn', function (e) {
		e.preventDefault();

		var $this = $(this),
			$switcher = $this.closest('.switchable'),
			currentLessonNumber = parseInt($switcher.html().replace(/\D+/g,"")),
			totalLessonNumber = $switcher.data('total-lessons'),
            indexCurrentNumber = $switcher.html().indexOf(currentLessonNumber),
            switcherString = $switcher.html().substr(indexCurrentNumber + 1);

		if ($this.hasClass('next')) {
			if (currentLessonNumber >= totalLessonNumber) return false;
			$(document).find('.test-lesson').removeClass('active');
			$(document).find('.test-lesson[data-number="' + (currentLessonNumber + 1) + '"]').addClass('active');
			$switcher.html((currentLessonNumber + 1) + switcherString);
		} else {
			if (currentLessonNumber === parseInt($switcher.data('start'))) return false;
			$(document).find('.test-lesson').removeClass('active');
			$(document).find('.test-lesson[data-number="' + (currentLessonNumber - 1) + '"]').addClass('active');
			$switcher.html((currentLessonNumber - 1) + switcherString);
		}
	});
	//courses end

    $(".common-chat").draggable({ handle: ".chat__header" });
    $(".common-chat").resizable();


    $(".chat__navigation-item").on('click', function () {
        $(".chat__navigation-item").removeClass('active');
        $(this).addClass('active');
    });

    $(".user-navigation__filter a").on('click', function () {
        $(".user-navigation__filter a").removeClass('active');
        $(this).addClass('active');
    });


    $(".window-icon").on('click', function () {
        $('.common-chat .chat__body, .common-chat .chat__footer').slideToggle();
    });

    onElementHeightChange(document.body, function(){
        $('body').getNiceScroll().resize();
    });

    imageCountOnMobile();
    $(window).on('resize', imageCountOnMobile);


    $('body').find('#mediaModal').on('hidden.bs.modal', function () {
        $('#mediaModal').find('.carousel-inner img').each(function () {
            $(this).remove();
        })
    });

    $('.close-modal').on('click', function(e){
        e.preventDefault();
        $(this).parents(".modal").modal('hide');
        /* editor_text = tinymce.get('modal_editor').getContent();
        if (editor_text.trim()) {
            $('#CloseConfirm').modal('show');
            $('.confirm-close').click(function (e) {
                e.preventDefault();
                $('#CloseConfirm').modal('hide');
                $('#CourseAdd').modal('hide');
            });
        } else {
            $(this).parents(".modal").modal('hide');
        } */
    });

    $('.chat-go-bottom').on('click', function () {
        $('.body-message .chat__body').getNiceScroll(0).doScrollTop($('.body-message .chat__body').height());
        $('.chat-go-bottom').removeClass('visible');
    });


    $('.body-message .chat-input textarea').on('focus', function () {
        if($(window).width() <= '992') {
            if(($('.body-message .chat__body').height() - $('.body-message .chat__body').scrollTop()) > ($('.body-message .chat__body').height() - 30)) {
                $('.chat-go-bottom').addClass('visible');
            }
        }
    });

    $('.body-message .chat-input textarea').on('blur', function () {
        $('.chat-go-bottom').removeClass('visible');
    });


    $('.advanced-search-form select[name="select-category"]').on('change', function() {

        if( this.value == 'article') {
            $('.articles').removeClass('hide');
        } else {
            $('.articles').addClass('hide');
        }

        if( this.value == 'users') {
            $('.profiles').removeClass('hide');
        } else {
            $('.profiles').addClass('hide');
        }

        if( this.value == 'channel') {
            $('.search-channel-options').removeClass('hide');
            $('.channels').removeClass('hide');
        } else {
            $('.search-channel-options').addClass('hide');
            $('.channels').addClass('hide');
        }

        if( this.value == 'audio') {
            $('.audios').removeClass('hide');
        } else {
            $('.audios').addClass('hide');
        }

        if( this.value == 'video') {
            $('.videos').removeClass('hide');
        } else {
            $('.videos').addClass('hide');
        }

        if( this.value == 'science') {
            $('.search-science-options').removeClass('hide');
            $('.sciences').removeClass('hide');
        } else {
            $('.search-science-options').addClass('hide');
            $('.sciences').addClass('hide');
        }

        if( this.value == 'proffessor') {
            $('.search-proffessor-options').removeClass('hide');
            $('.profiles').removeClass('hide');
        } else {
            $('.search-proffessor-options').addClass('hide');
            $('.profiles').addClass('hide');
        }
    });

    $('#EditChannelModal .modal-channel-edit__menu a').on('click', function(e) {
        if ($(this).attr('href') == '#channelSettings') {
            $('#EditChannelModal').find('.nicescroll-rails').css('opacity', '0');
        } else {
            $('#EditChannelModal').find('.nicescroll-rails').css('opacity', '1');
        }
    });

	var dt = new Date();
	dt.setHours(dt.getHours() + 2);
	Timer('#timer', dt);
});

$(document).on('click', '.search-page .search-form > .form-group i', function (e) {
   e.preventDefault();
    $(this).toggleClass('active');
    $(this).closest('.search-form').find('.extra').toggleClass('hide');
});

$(document).on('change', '.gender-check input[type="checkbox"]', function (e) {
	$('.gender-check input[type="checkbox"]').not(this).prop('checked', false);
});

$(document).on('click', '.switch a', function (e) {
   e.preventDefault;
   $(this).addClass('active').closest('.switch').find('a').not(this).removeClass('active');
});

/* bline */
$(document).on("click", ".bline__item", function(e) {
    e.preventDefault();
    $(this).parents('.bline').find('.bline__item').each(function() {
      $(this).removeClass('bline__item--active');
    });
    $(this).addClass('bline__item--active');
});

/* notif */
$(".notif__body").scroll(function() {
    if($(this).scrollTop() > 0) {
        $(this).addClass("notif__body--scroll")
    } else {
        $(this).removeClass("notif__body--scroll")
    }
});

$(".notif__close").click(function() {
    $(".notif").fadeOut(0);
});

$(".lesson-qa__filters-toggle").click(function() {
    $(".lesson-qa__filters").slideToggle();
    $(this).toggleClass("lesson-qa__filters-toggle--open");
});

/* Ученики курса */
$(".notif__body").scroll(function() {
    if($(this).scrollTop() > 0) {
        $(this).addClass("notif__body--scroll")
    } else {
        $(this).removeClass("notif__body--scroll")
    }
});


////////////////////// DOM END /////////////////////////////////////

function AllChatsToggle(clicked_id) {
    var el = document.getElementById(clicked_id);
    $('.all-chats').toggleClass('hide');
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

function editComment(post_id, comment_id) {
    var post = $(post_id);
    var comment = post.find(comment_id);
    el_text = comment.find('.user-post__comment-text').html();
    comment.find('.comment-list__item-edit').val(el_text);
    comment.find('.comment-list__item-edit').toggleClass('hide');
}

function deleteComment(post_id, comment_id) {
    var post = $(post_id);
    var comment = post.find(comment_id);
    comment.remove();
}

function showPublisherBox(caller) {
    $(caller).outerHeight(75);
    $('.publisher-box__footer').removeClass('hide');
}

function showPublisherBoxComments(caller) {
    $(caller).outerHeight(52);
    $(caller).closest('.publisher-box').find('.publisher-box__footer').removeClass('hide');
}

function focusPublisherBox(caller) {
    $(caller).focus();
    $(caller).closest('.publisher-slide').attr('style', 'width: 100% !important');
}

function showPublisherBoxForm(caller) {
    $("[data-caller =" + $(caller).attr('id') + "]").toggleClass('hide');
}

function showComments(id) {
	var post = $(id);
	post.find('.user-post__comment').toggleClass('hide');
}

function toggleComments(e) {
	e.preventDefault();
	var target = e.target;
	    $parent = $(target).closest('.panel'),
		$comments = $parent.find('.user-post__comment').length ? $parent.find('.user-post__comment') : $parent.find('.comments-container');
	$comments.toggleClass('hide');
}

function toggleShares(e) {
	e.preventDefault();
	var target = e.target;
	    $parent = $(target).closest('.panel'),
		$shares = $parent.find('.share-container');
	$shares.toggleClass('hide');
}

function openCommentBottom(elem) {
    $(elem).addClass('opened');
    $(elem).find('.input-icon__list').removeClass('hide');
    if ($(elem).find('.message-textarea').length > 0) {
        $(elem).closest('.chat').find('.chat__body').getNiceScroll().resize();
    }
}

function toggleReply(id) {
    var post = $(id);
    post.find('.comment-list__item-reply').toggleClass('hide');
}

function profileCoverEdit() {
    editable = true;
}

function onElementHeightChange(elm, callback){
    var lastHeight = elm.clientHeight, newHeight;
    (function run(){
        newHeight = elm.clientHeight;
        if( lastHeight != newHeight )
            callback();
        lastHeight = newHeight;

        if( elm.onElementHeightChangeTimer )
            clearTimeout(elm.onElementHeightChangeTimer);

        elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
}

function showLightBox(id, number) {

    if( $('#mediaModal').hasClass('in')) {
        $('#mediaModal').find('.carousel-inner .item img').remove();

        $.ajax({
            type:'GET',
            url:'ajax.php',
            // beforeSend: function() {
            //     $('.ajax-loader').removeClass('hide');
            // },
            // complete: function() {
            //     $('.ajax-loader').addClass('hide');
            // },
            processData: false,
            contentType: false,
            success: function(data){
                $('#mediaModal .carousel-inner .item').append(data);
            }
        });

        return false;
    }
    var post = $(id);
    var images = [];
    var comments = post.find('.user-post__comment').html();

    post.find("[data-href]").each( function() {
        images.push($(this).data('href')) ;
    });

    $('#mediaModal .right').attr('onClick', 'showLightBox(post65, 2);');
    $('#mediaModal .left').attr('onClick', 'showLightBox(post65, 1);');

    $('#mediaModal .carousel-inner .item img').remove();
    $('#mediaModal .carousel-inner .item').append('<img src=' + images[number] + ' />');

    $('#mediaModal').modal('show');
}

function showMoreText(elem){
    var post = $(elem).closest('.user-post');
    if (post.hasClass('full-show')) {
        post.find('.wrapper').toggleClass('is-show--full');
        if(post.find('.wrapper').hasClass('is-show--full')) {
            post.find('.show-more').css({'transform' : 'rotateX(180deg)'});
        } else {
            post.find('.show-more').css({'transform' : 'rotateX(0deg)'});
        }
    } else {
        post.find('.wrapper').toggleClass('is-show');
        if(post.find('.wrapper').hasClass('is-show')) {
            post.find('.show-more').css({'transform' : 'rotateX(180deg)'});
        } else {
            post.find('.show-more').css({'transform' : 'rotateX(0deg)'});
        }
    }
}

function showCourseText(elem) {
	var container = $(elem).closest('.courses-list-item');
	container.find('.wrapper').toggleClass('is-show');
	if (container.find('.wrapper').hasClass('is-show')) {
		container.find('.show-more').css({'transform': 'rotateX(180deg)'});
	} else {
		container.find('.show-more').css({'transform': 'rotateX(0deg)'});
	}
}

function imageCountOnMobile(){
    if ($(window).width() <= '576') {
        $(document).find('.user-post__content-media').each(function () {
            var count = 0;
            $(this).find('.user-post__content-media__item').each(function () {
                count = count + 1;
                $(this).removeClass('view-more');
                if(count == 2){
                    $(this).addClass('view-more');
                }
                if(count > 2){
                    $(this).find('img').remove();
                }
            });
        });
    }
}

function loadComments(post_id) {

    var post = $(post_id);

    $.ajax({
        type:'GET',
        url:'comments.php',
        beforeSend: function() {
            post.find('.load-comments-container i').removeClass('hide');
        },
        complete: function() {
            post.find('.load-comments-container i').addClass('hide');
        },
        processData: false,
        contentType: false,
        success: function(data){
            post.find('.comment-list').prepend(data);
        }
    });
}

function setScroll() {
    if ($(window).width() <= '992') {
        $('body').getNiceScroll().remove();
    } else {
        $('body').niceScroll({
            cursorcolor:"#46b7fb",
            cursorwidth:'5px',
            autohidemode: false
        });
    }
}

function showSearchOptions($elem) {
    $($elem).toggleClass('btn-activated');
    $('.search-options').toggleClass('hide');
}

function showSelectIfChecked($elem) {
    if($($elem).is(":checked")) {
        $('.select-js[data-id=' + $($elem).attr('id') + ']').removeClass('hide');
    } else {
        $('.select-js[data-id=' + $($elem).attr('id') + ']').addClass('hide');
    }
}

function clearSearchResults() {
    $('.search__container .recent-search').remove();
    $('.search__container .search-list').remove();
}

function showShares(elem) {
    var post = $(elem).closest('.user-post');
    post.find('.share-container').toggleClass('hide');
}

function addLike(id, element) {
    var cache = $(element).children();
    var count = +($(element).text()) + 1;
    $(element).text(count).prepend(cache);
}

function addFileName($elem) {
    var value =  $($elem).val().split('\\').pop();
    var container = $($elem).closest('.parent-container--js');
    container.find('input[type="text"]').val(value);
}

function readURL($input) {

    if ($input.files && $input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
           var container = $($input).closest('.input-wrapper-photo');
           container.find('i').addClass('hide');
           container.find('p').addClass('hide');
           container.find('.ce-quest__load-photo-close').addClass('show');
           container.find('img').attr('src', e.target.result).css('display', 'block');
        }
        reader.readAsDataURL($input.files[0]);
    }
}

function delURL($this) {
    var container = $($this).closest('.input-wrapper-photo');
    container.find('img').attr('src', '').css('display', 'none');
    container.find('i').removeClass('hide');
    container.find('p').removeClass('hide');
    container.find('.ce-quest__load-photo-close').removeClass('show');
    container.find('input').prop('value', null);
}

function notify($type, $text) {
    var item = $('<div class="notify-message ' + $type + '">' + $text + '</div>').hide().fadeIn(300);
    $('body').append(item);
    setTimeout(function () {
        $('.notify-message').fadeOut('normal', function() {
            $(this).remove();
        });
    }, 2500);
}

function openWrapper($elem){
    $($elem).closest('.wrapper').toggleClass('is-show');
    if($($elem).closest('.wrapper').hasClass('is-show')) {
        $($elem).closest('.wrapper').find('.show-more').css({'transform' : 'rotateX(180deg)'});
    } else {
        $($elem).closest('.wrapper').find('.show-more').css({'transform' : 'rotateX(0deg)'});
    }
}

var audioTime = function ($time) {
    var minutes = "0" + Math.floor($time / 60);
    var seconds = "0" +  Math.floor($time - minutes * 60);
    var result = minutes.substr(-2) + ":" + seconds.substr(-2);
    return result;
};

function xhr(){
    var xhr = new window.XMLHttpRequest();
    xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            $(document).find('.ajax-progress').css({
                width: percentComplete * 100 + '%'
            });
            if (percentComplete == 1) {
                $(document).find('.ajax-progress').addClass('down');
            }
        }
    }, false);
    xhr.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            var percentComplete = evt.loaded / evt.total;
            $('.ajax-progress').css({
                width: percentComplete * 100 + '%'
            });
        }
    }, false);
    return xhr;
}

function goUp() {
	window.scrollTo(0, 0);
}

function moreBtn($elem) {
    var parent = $($elem).parents(".comments__body");

    if (parent.find(".comments__text-wrap").hasClass("comments__text-wrap--open")) {
        parent.find(".comments__text-wrap").removeClass("comments__text-wrap--open");
        parent.find(".comments__more-btn--more").show();
        parent.find(".comments__more-btn--less").hide();
    } else {
        parent.find(".comments__text-wrap").addClass("comments__text-wrap--open");
        parent.find(".comments__more-btn--more").hide();
        parent.find(".comments__more-btn--less").show();
    }
}

function moreBtnHeight() {
    if ($(document).find(".comments").length) {
        $(".comments__body").children(".comments__text-wrap").each(function() {
            var height = $(this).height();
            if (height > 49) {
                $(this).parents(".comments__body").find(".comments__more-btn--more").show();
            } else {
                $(this).parents(".comments__body").find(".comments__more-btn--more").hide();
            }
        });
    }
}

moreBtnHeight();

function textareaModes($this) {
    $($this).parents(".modal__textarea-modes").find(".modal__textarea-modes-item").each(function() {
        $(this).removeClass("modal__textarea-modes-item--active");
    });
    $($this).addClass("modal__textarea-modes-item--active");
    textareaModesShowHide();
}

function textareaModesShowHide() {
    if ($(".modal__textarea-modes-item--active").hasClass("modal__textarea-modes-item--editor")) {
        $(".modal__textarea").each(function() {
            $(this).hide();
            $(this).siblings(".tox").hide();
        });
        $(".modal__textarea--editor").show();
        $(".modal__textarea--editor").siblings(".tox").show();
    } else if($(".modal__textarea-modes-item--active").hasClass("modal__textarea-modes-item--text")) {
        $(".modal__textarea").each(function() {
            $(this).hide();
            $(this).siblings(".tox").hide();
        });
        $(".modal__textarea--text").show();
    }
}

textareaModesShowHide();

var zoomAll = 1;

function zoomPlus($this) {
    zoomAll = zoomAll + 0.25;
    $($this).parents(".lightbox--zoom").find(".item img").css("transform", "scale(" + zoomAll + ")");
    $('.carousel-inner').getNiceScroll().resize();
}

function zoomMinus($this) {
    if (zoomAll > 1) {
        zoomAll = zoomAll - 0.25;
    }
    $($this).parents(".lightbox--zoom").find(".item img").css("transform", "scale(" + zoomAll + ")");
    $('.carousel-inner').getNiceScroll().resize();
}

function notifToggle($this) {
    $(".notif").fadeToggle(0);
    $('.notif__body').getNiceScroll().resize();
}

function topAppClose() {
    $(".page").removeClass("page--top-app");
    $(".top-app").hide();
}

function courseShare() {
    $(".course-header__share-btn").toggleClass("course-header__share-btn--open");
}

function showCenterSub() {
    $(".course-header__center-sub").toggleClass("course-header__center-sub--visible");
}

function commentsToggle($this) {
    $($this).parents(".comments__item").find(".lesson-qa__inner-comments").slideToggle();
    $($this).toggleClass("comments__comments-toggle--open");
}

function chVideoPlay($this) {
    $($this).parents(".course-header__video").addClass("course-header__video--play");
    $($this).parents(".course-header__video").find(".course-header__video-player")[0].play();
}


///////////////////// FUNCTIONS END /////////////////////

///////////////////// FUNCTIONS INIT AFTER AJAX /////////////////////
function select2init() {
    $(document).find('.js-example-basic-multiple').each(function () {
        $(this).select2({
            placeholder: "Выберите предмет",
        });
    })
    $('.lesson-qa__select').each(function () {
        $(this).select2({
            containerCssClass: 'lesson-qa__select',
            minimumResultsForSearch: -1,
            width: 'auto',
            dropdownCssClass: "lesson-qa__drop"
        });
    })
    $('.select--tags').each(function () {
        $(this).select2({
            minimumResultsForSearch: -1,
            width: 'auto',
            tags: true,
            dropdownCssClass: "lesson-qa__drop"
        });
    })
}

function audioInit() {
    $(document).find('.audio-player-container').toArray().forEach(function (player) {
        var audio = $(player).find('audio')[0];
        var seekbarInner = $(player).find('.audio-player__seekbar .inner');
        var seekbarOuter = $(player).find('.audio-player__seekbar .outer');
        var volume = $(player).find('.audio-player__volume .volume-controller');

        var length;
        var interval;
        var seekbarPercent;
        var volumePercent;


        length = audio.duration; //длина аудио файла
        $(player).find('.audio-player__time .time-end').text(audioTime(length));

        //play
        $(player).find('.btn-play').on('click', function () {
            var button = $(this);

            if(button.hasClass('audio-play')) {
                stopAllAudio();
                button.removeClass('audio-play').addClass('audio-pause');
                $(player).addClass('is-playing');
                length = audio.duration; //длина аудио файла
                $(player).find('.audio-player__time .time-end').text(audioTime(length));//время окончания

                audio.play();

                interval = setInterval(function () {

                    if(!audio.paused) { // Пока файл проигрывается
                        updateAudioSeekbar();
                    }
                    if (audio.ended) { // Файл закончился
                        clearInterval(interval);
                        button.removeClass('audio-pause').addClass('audio-play');
                        seekbarInner.width(100 + '%');
                    }

                }, 250)
            } else if(button.hasClass('audio-pause')) {
                button.removeClass('audio-pause').addClass('audio-play');
                $(player).removeClass('is-playing');
                audio.pause();
            }
        });

        seekbarOuter.on('click', function (e) {
            if( !audio.ended && length !== undefined ) {
                var seekPosition = e.pageX - $(seekbarOuter).offset().left;
                if (seekPosition >= 0 && seekPosition < seekbarOuter.width()) {

                    audio.currentTime = (seekPosition * audio.duration) / seekbarOuter.width();
                    updateAudioSeekbar();
                }
            }
        });
        //Доп. функции
        var updateAudioSeekbar = function () {
            seekbarPercent = getAudioPercent(audio.currentTime.toFixed(2), length.toFixed(2));
            seekbarInner.css('width', seekbarPercent + '%'); //заполнение шкалы
            $(player).find('.audio-player__time .time-start').text(audioTime(audio.currentTime)); //изменение времени
        }
    });

    var getAudioPercent = function (currentTime, totalTime) {
        var calcPercent = (currentTime/totalTime)*100;
        return parseFloat(calcPercent.toString());
    };

    var stopAllAudio = function () {
        $(document).find('.audio-player-container').each(function () {
            $(this).removeClass('is-playing');
            $(this).find('.btn-play').removeClass('audio-pause').addClass('audio-play');
        });
        $('audio').each(function(){
            this.pause();
        });
    };
}

function emojiInit() {
    // Initializes and creates emoji set from sprite sheet
    window.emojiPicker = new EmojiPicker({
        emojiable_selector: '[data-emojiable=true]',
        assetsPath: './assets/img/emoji',
        minHeight: $(this).data('minHeight') ? $(this).data('minHeight') : 34,
        popupButtonClasses: 'fas fa-smile',
        iconSize : 20,
    });

    window.emojiPicker.discover();
};

function intlTelInit() {
	$(document).find('.input-phone').intlTelInput({
		initialCountry: "ru",
		separateDialCode: true,
		preferredCountries: ["ru", "ua", "by"]
	});
}

function datePickerInit() {
    $('.calendar-datepicker').datepicker();
}

function niceScrollInit() {
    $(".chat__body").niceScroll({cursorcolor:"#46b7fb"});
    $(document).find('.chat__navigation a[data-toggle="tab"]').on('shown.bs.tab', function () {
        var chat_body = $(this).closest('.chat').find('.chat__body');
        chat_body.getNiceScroll().resize();
    });

    $('#CreateChatModal').on('shown.bs.modal', function(e){
        $('#CreateChatModal').find(".chat-invite").niceScroll({
            touchbehavior: true,
            autohidemode:false,
            cursorcolor:"#46b7fb",
        });
    }).on('hide.bs.modal', function(e){
        $('#CreateChatModal').find(".chat-invite").niceScroll().remove();
    });

    $('#DatePickerModal').on('shown.bs.modal', function(e){
        $('#DatePickerModal').find(".lesson-schedule-container").niceScroll({
            touchbehavior: true,
            autohidemode:false,
            cursorcolor:"#d2ddeb",
        });
    }).on('hide.bs.modal', function(e){
        $('#DatePickerModal').find(".lesson-schedule-container").niceScroll().remove();
    });

    $('#EditChannelModal').on('shown.bs.modal', function(e){
        $('#EditChannelModal').find(".channel-user-list").niceScroll({
            touchbehavior: true,
            autohidemode:false,
            cursorcolor:"#46b7fb",
            background: "#f3f6fd",
            cursorwidth:"4px",
            cursorborder: "none",
            cursorfixedheight: 25,
        });
    }).on('hide.bs.modal', function(e){
        $('#EditChannelModal').find(".channel-user-list").niceScroll().remove();
    });

    $('.carousel-inner').niceScroll({
        cursorcolor:"#46b7fb",
        cursorwidth:'5px',
        autohidemode: false,
        emulatetouch: true
    });

    $('.notif__body').niceScroll({
        cursorcolor:"#327ae5",
        cursorwidth:'6px',
        autohidemode: false,
        cursorborder: "none",
        background: "#f3f6fd",
        cursorborderradius: "1px",
        railpadding: { top: 0, right: 0, left: 0, bottom: 16 },
        nativeparentscrolling: false
    });

    $('.courseStudents').niceScroll({
        cursorcolor:"#327ae5",
        cursorwidth:'6px',
        autohidemode: false,
        cursorborder: "none",
        background: "#f3f6fd",
        cursorborderradius: "1px",
        railpadding: { top: 0, right: 0, left: 0, bottom: 16 },
        nativeparentscrolling: false
    });
}


function courseStudentsOpen() {
    setTimeout(function(){ $('.courseStudents').getNiceScroll().resize() }, 500);
}

function tooltipInit() {
	$(document).find('[data-bstooltip="tooltip"]').tooltip({
		html: true
	});
}

function webkitLineClampInit() {
    $(".comments__quote .comments__text").each(function() {
        webkitLineClamp($(this)[0], 1);
    });
    $(".course__title").each(function() {
        webkitLineClamp($(this)[0], 2);
    });
    $(".course__desc").each(function() {
        webkitLineClamp($(this)[0], 3);
    });
    $(".teacher__place-teaching").each(function() {
        webkitLineClamp($(this)[0], 2);
    });
    $(".teacher__desc").each(function() {
        webkitLineClamp($(this)[0], 3);
    });
    $(".panel-courses__feedback-text").each(function() {
        webkitLineClamp($(this)[0], 5);
    });
}

//инициализация функций для ajax
function initAll() {
    select2init();
    audioInit();
    emojiInit();
    datePickerInit();
    niceScrollInit();
	intlTelInit();
	SelectTree({
		selector: '.select-tree'
	});
	datepickerInit('.input-wrapper-datepicker');
	activateEditor('.editor-area');
	tooltipInit();
	uiSliderInit();
    webkitLineClampInit();
    moreBtnHeight();
    textareaModesShowHide();
    ratingCheckedInit();
    addActivePrevAllChecked();
    swiperInit2();
}
///////////////////// FUNCTIONS INIT AFTER AJAX END/////////////////////


///////////////////// CHAT /////////////////////
if ($(window).width() >= '992') {
    Array.remove = function(array, from, to) {
        var rest = array.slice((to || from) + 1 || array.length);
        array.length = from < 0 ? array.length + from : from;
        return array.push.apply(array, rest);
    };

//this variable represents the total number of chats can be displayed according to the viewport width
    var total_chats = 0;

//arrays of chats ids
    var chats = [];

//this is used to close a popup
    function close_popup(elem)
    {
        for(var i = 0; i < chats.length; i++)
        {

            if(elem.id == chats[i])
            {
                Array.remove(chats, i);

                document.getElementById(elem.id).style.display = "none";
                document.getElementById(elem.id).remove();

                return;
            }
        }
    }

//displays the chats. Displays based on the maximum number of chats that can be displayed on the current viewport width
    function display_chats()
    {
        var right = 300;

        var i = 0;
        for(i; i < total_chats; i++)
        {
            if(chats[i] != undefined)
            {
                var element = document.getElementById(chats[i]);

                element.style.right = right + 'px';
                right = right + 300;
                element.style.display = "block";
            }
        }

        for(var j = i; j < chats.length; j++)
        {
            var element = document.getElementById(chats[j]);
            element.style.display = "none";
        }
    }

    function chat_position()
    {

        //right position
        var position = 300;

        var i = chats.length - 1;

        if (chats[i] != undefined) {
            var element = document.getElementById(chats[i]);

            position = position * chats.length;
            element.style.right = position + 'px';
            element.style.display = "block";
        }

    }

//creates markup for a new popup. Adds the id to chats array.
    function register_popup(id)
    {

        for(var i = 0; i < chats.length; i++)
        {
            //already registered. Bring it to front.
            if(id == chats[i])
            {
                return;
            }
        }

        if(chats.length == total_chats){

            document.getElementById(chats[0]).remove();
            chats.shift();
        }

        var element = '<div class="personal-chat chat" id="'+ id +'">';

        element = element +
            '<div class="chat__header ui-draggable-handle">' +
            '<div class="avatar-circle_sm user-avatar">' +
            '<img src="./assets/img/default-avatar.png">' +
            '<span class="name">'+ id +'</span>' +
            '</div>' +
            '<div class="chat__header-actions">' +
            '<span class="pointer settings-icon"><i class="fa fa-times" onclick="close_popup('+id+');"></i></span>' +
            '</div>' +
            '</div>';

        element = element +
            '<div class="chat__body">' +
            '<div class="chat__message-wrapper clearfix">' +
            '<div class="chat__message outgoing">' +
            '<p>Есть много вариантов Lorem Ipsum</p>' +
            '</div>' +
            '</div>' +
            '</div>';

        element = element +
            '<div class="chat__footer">' +
            '<div class="form input-icon" onclick="openCommentBottom(this);">' +
            '<textarea class="form-control message-textarea" data-id="'+id+'" placeholder="Введите сообщение..." rows="1" data-emojiable="true"></textarea>' +
                '<div class="input-icon__list hide">' +
                    '<div class="left-icons">' +
                        '<li class="input-icon__item pointer icon-grey"></li>' +
                        '<li class="input-icon__item pointer icon-grey">' +
                            '<i class="far fa-paperclip"></i>' +
                            '<input type="file">' +
                        '</li>' +
                        '<li class="input-icon__item pointer icon-grey">' +
                            '<i class="far fa-microphone"></i>' +
                            '<input type="file">' +
                        '</li>' +
                    '</div>' +
                    '<div class="right-btn">' +
                        '<button class="btn-white" type="submit">Отправить</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '</div>';

        element = element + '</div>';

        $('.all-chats').append(element);

        textarea = $("#" + id).find(".chat__footer textarea");
        // Initializes and creates emoji set from sprite sheet
        textarea = new EmojiPicker({
            emojiable_selector: '[data-emojiable=true]',
            assetsPath: './assets/img/emoji',
            minHeight: $(this).data('minHeight') ? $(this).data('minHeight') : 34,
            popupButtonClasses: 'far fa-smile',
            iconSize : 20,
        });
        textarea.discover();

        $("#" + id).find(".chat__footer .emoji-wysiwyg-editor").on('keypress', function (e) {
            if (e.which == 13) {
                e.preventDefault();
                getMessage(id);
            }
        });

        $("#" + id).find(".chat__footer button").on('click', function (e) {
            getMessage(id);
        });

        function getMessage(container_id) {
            var msg = $('#' + container_id).find('.emoji-wysiwyg-editor').html();
            $("#" + container_id).find(".chat__footer textarea").val('');
            $('#' + container_id).find('.emoji-wysiwyg-editor').html('');
            if (msg.trim().length != 0) {
                var message = '<div class="chat__message-wrapper clearfix">' +
                    '<div class="chat__message outgoing">' +
                    '<p>' + msg + '</p>' +
                    '</div>' +
                    '</div>';
                $('#' + container_id + ' .chat__body').append(message);
            }
        }

        $( "#" + id + " .chat__body").niceScroll({cursorcolor:"#46b7fb"});
        $( "#"+id ).draggable({ handle: ".chat__header" });
        $( "#"+id ).resizable().bind({
            resize : function(event,ui) {
                $( "#" + id + " .chat__body").getNiceScroll().resize();
            }
        });

        chats.push(id);
        calculate_chats();

    }

//calculate the total number of chats suitable and then populate the toatal_chats variable.
    function calculate_chats()
    {
        var width = window.innerWidth;
        if(width < 540)
        {
            total_chats = 0;
        }
        else
        {
            // width = width - 200;
            // //320 is width of a single popup box
            // total_chats = parseInt(width/320);
            total_chats = 1;
        }

        chat_position();
        // display_chats();

    }

}

//recalculate when window is loaded and also when window is resized.
window.addEventListener("resize", calculate_chats);
window.addEventListener("load", calculate_chats);

/////////// CHAT END /////////////////