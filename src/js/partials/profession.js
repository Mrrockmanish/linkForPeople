$(document).ready(function () {
  // показываем элемент
  const showItems = (element) => {
    element.fadeIn();
  };

  // показать контент и повернуть стрелку
  const showContent = (el) => {
    el.closest('.profession').find('.profession__content').fadeToggle();
    el.closest('.profession__head').find('.profession__chevron').toggleClass('show');
    el.closest('.profession__head').find('.profession__edit').fadeToggle();
  };

  // показываем контет профессии
  $('.profession__name').on('click', function () {
    const element = $(this);
    showContent(element);
  });
  $('.profession__chevron').on('click', function () {
    const element = $(this);
    showContent(element);
  });

  //считаем сколько еще показать и вставляем в html
  const calcItems = (wrap, item, placement, number) => {
    const count = wrap.find(item).length - number;
    placement.text(count);
  };

  // показать остальные расценки
  const showMorePricing = (el) => {
    //если расценок больше чем 5
    if ( el.find('.profession__pricing .profession__pricing-item').length > 5 ) {
      // показываем блок показать еще
      el.find('.profession__pricing-more').show();
      //считаем цены
      calcItems(el.find('.profession__pricing'), el.find('.profession__pricing-item'), el.find('.profession__pricing__more-count'), 5);
      // показываем скрытые расценки по клику на показать еще
      el.find('.profession__pricing-more-text').on('click', function () {
        showItems(el.find('.profession__pricing-item'));
        el.find('.profession__pricing-more').hide();
      });
      // показываем скрытые расценки по клику на стрелку
      el.find('.profession__pricing-more-chevron').on('click', function () {
        showItems(el.find('.profession__pricing-item'));
        el.find('.profession__pricing-more').hide();
      });
    }
  };
  // показываем остальные расценки каждой профессии
  $('.profession').each(function () {
    const element = $(this);
    showMorePricing(element);
  })

  // показать остальные опции
  const showMoreProps = (el) => {
    if ( el.find('.profession__props .profession__props-item').length > 5 ) {
      // показываем блок показать еще
      el.find('.profession__props-more').show();
      //считаем опции
      calcItems(el.find('.profession__props'), el.find('.profession__props-item'), el.find('.profession__props-more-count'), 5);
      // показываем скрытые опции при клике на показать ещё
      el.find('.profession__props-more').on('click', function () {
        showItems(el.find('.profession__props-item'));
        el.find('.profession__props-more').hide();
      });
    }
  };
  // показываем остальные опции каждой профессии
  $('.profession').each(function () {
    const element = $(this);
    showMoreProps(element);
  })

 //$('#ceQuest').modal('show');

  function setSizePhotoForBlockSettings() {
    var size = 0;

    var files_photos = $('#id_file_docs_from_block_settings').prop('files');

    var size_photos = 0;
    $.each(files_photos, function (index, value) {
      size += files_photos[index].size;
      size_photos += files_photos[index].size;
    });

    var size_left = (100 * 1024 * 1024 - size)/ 1024 / 1024;
    size_left = Math.trunc(size_left*10) /10;

    size_photos = (size_photos)/ 1024 / 1024;
    size_photos = Math.trunc(size_photos*10) /10;

    console.log(size_photos);

    if ($('#id_file_from_block_settings_size') != undefined) $('#id_file_from_block_settings_size').text(size_photos + ' Mb');


    $('#id_left_size_files_for_block_settings').text(size_left);
    if (size_left < 0 ) $('#id_memory_limit_for_block_settings').removeClass('hide'); else $('#id_memory_limit_for_block_settings').addClass('hide');

  }

  /* add */
  function ceqAdds($this) {
    $(".ce-quest__media-block--docs").remove();
    ceqAddsBlock($this);
    setSizePhotoForBlockSettings();
  }

  /* add block */
  function ceqAddsBlock($this) {

    $($this).parents(".ce-quest__inner-wrap").find(".ce-quest__media-block-wrap").append(
      "<div class='ce-quest__media-block ce-quest__media-block--docs'>" +
      "<div class='ce-quest__media-block-title'>" +
      "<i class='far fa-trash-alt ce-quest__media-block-title-delete remove-items'></i>" +
      "<div class='ce-quest__media-block-title-text'>Документы</div>" +
      "<div class='ce-quest__media-block-title-size' id ='id_file_from_block_settings_size'></div>" +
      "</div>" +
      "<div class='ce-quest__media-block-list'>" +
      "<div class='swiper-container'>" +
      "<div class='swiper-wrapper'></div>" +
      "<div class='swiper-button-prev'>" +
      "<i class='far fa-chevron-left'></i>" +
      "</div>" +
      "<div class='swiper-button-next'>" +
      "<i class='far fa-chevron-right'></i>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>"
    );
    /* delete block */
    $('.remove-items').on('click', function () {
      $(".ce-quest__media-btn--docs").find(".ce-quest__media-btn-input").val(null);
      $(this).parents(".ce-quest__media-block").remove();
      $('#id_file_docs_from_block_settings').val("");

      setSizePhotoForBlockSettings();
    });

    window.ceqPhotoSliderDocs = new Swiper('.ce-quest__media-block--docs .swiper-container', {
      slidesPerView: 3,
      spaceBetween: 16,
      navigation: {
        nextEl: '.ce-quest__media-block--docs .swiper-button-next',
        prevEl: '.ce-quest__media-block--docs .swiper-button-prev',
      },
      breakpoints: {
        // when window width is >= 768px
        768: {
          slidesPerView: 2.4,
          spaceBetween: 10
        }
      }
    });
    ceqPhotos($this);
  }


  /* photo */
  function ceqPhotos($this) {
    var filesList = $($this).prop("files");

    $.each(filesList, function(index, value) {
      var reader = new FileReader();

      reader.readAsDataURL($($this).prop("files")[index]);

      reader.onload = function(e) {
        ceqPhotoSliderDocs.appendSlide([
          "<div class='swiper-slide'>" +
          "<div class='ce-quest__media-block-item'>" +
          "<div class='ce-quest__media-block-item-info'>" +
          "<div class='ce-quest__media-block-item-info-preview' style='background-image: url(" + e.target.result + ");'></div>"+
          "</div>" +
          "</div>" +
          "</div>"
        ]);
      }
    });
  }

  $('#id_file_docs_from_block_settings').on('change', function () {
    ceqAdds($(this));
  });




















});