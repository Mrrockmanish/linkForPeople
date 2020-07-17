function setSizeForAllFilesForBlockCreatePost() {
  var size = 0;

  var files_photos = $('#id_file_photos_from_block_create_post').prop('files');
  var files_video = $('#id_file_video_from_block_create_post').prop('files')[0];
  var files_audio = $('#id_file_audio_from_block_create_post').prop('files');
  var files_file = $('#id_file_file_from_block_create_post').prop('files')[0];

  var size_photos = 0;
  $.each(files_photos, function (index, value) {
    size += files_photos[index].size;
    size_photos += files_photos[index].size;
  });

  var size_audio = 0;
  $.each(files_audio, function (index, value) {
    size += files_audio[index].size;
    size_audio += files_audio[index].size;
  });

  var size_file = 0;
  if (files_file != null) {
    size += files_file.size;
    size_file = files_file.size;
  }

  var size_video = 0;
  if (files_video != null) {
    size += files_video.size;
    size_video = files_video.size;
  }

  size_left = (100 * 1024 * 1024 - size)/ 1024 / 1024;
  size_left = Math.trunc(size_left*10) /10;

  size_photos = (size_photos)/ 1024 / 1024;
  size_photos = Math.trunc(size_photos*10) /10;

  size_audio = (size_audio)/ 1024 / 1024;
  size_audio = Math.trunc(size_audio*10) /10;

  size_file = (size_file)/ 1024 / 1024;
  size_file = Math.trunc(size_file*10) /10;

  size_video = (size_video)/ 1024 / 1024;
  size_video = Math.trunc(size_video*10) /10;

  if ($('#id_file_from_block_create_post_type_photo') != undefined) $('#id_file_from_block_create_post_type_photo').text(size_photos + ' Mb');
  if ($('#id_file_from_block_create_post_type_audio') != undefined) $('#id_file_from_block_create_post_type_audio').text(size_audio  + ' Mb');
  if ($('#id_file_from_block_create_post_type_files') != undefined) $('#id_file_from_block_create_post_type_files').text(size_file   + ' Mb');
  if ($('#id_file_from_block_create_post_type_video') != undefined) $('#id_file_from_block_create_post_type_video').text(size_video  + ' Mb');

  $('#id_left_size_files_for_block_create_post').text(size_left);
  if (size_left < 0 ) $('#id_memory_limit_for_block_create_post').removeClass('hide'); else $('#id_memory_limit_for_block_create_post').addClass('hide');

}
var ceqPhotoSlider;

/* add */
function ceqAdd($this, type) {
  $(".ce-quest__media-block--" + type).remove();
  ceqAddBlock($this, type);
  setSizeForAllFilesForBlockCreatePost();
}

/* определение типа */
function ceqTypeDef($this, type) {
  if (type === "audio") {
    ceqAudio($this, String(type));
  } else if (type === "files") {
    ceqFiles($this, String(type));
  } else if (type === "video") {
    ceqVideo($this, String(type));
  } else if (type === "photo") {
    ceqPhoto($this, String(type));
  }
}

/* add block */
function ceqAddBlock($this, type) {
  var typeTitle;

  if (type === "audio") {
    typeTitle = "Аудио";
  } else if (type === "files") {
    typeTitle = "Файлы";
  } else if (type === "video") {
    typeTitle = "Видео";
  } else if (type === "photo") {
    typeTitle = "Фото";
  }

  if (type === "photo") {
    $($this).parents(".ce-quest__inner-tab").find(".ce-quest__media-block-wrap").append(
      "<div class='ce-quest__media-block ce-quest__media-block--" + type +"'>" +
      "<div class='ce-quest__media-block-title'>" +
      "<i class='far fa-trash-alt ce-quest__media-block-title-delete' onclick='ceqDeleteBlock(this,  \"" + type + "\");'></i>" +
      "<div class='ce-quest__media-block-title-text'>" + typeTitle + "</div>" +
      "<div class='ce-quest__media-block-title-size' id ='id_file_from_block_create_post_type_" + type + "'></div>" +
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
    window.ceqPhotoSlider = new Swiper('.ce-quest__media-block--photo .swiper-container', {
      slidesPerView: 3,
      spaceBetween: 16,
      navigation: {
        nextEl: '.ce-quest__media-block--photo .swiper-button-next',
        prevEl: '.ce-quest__media-block--photo .swiper-button-prev',
      },
      breakpoints: {
        // when window width is >= 768px
        768: {
          slidesPerView: 2.4,
          spaceBetween: 10
        }
      }
    });
  } else {
    $($this).parents(".ce-quest__inner-tab").find(".ce-quest__media-block-wrap").append(
      "<div class='ce-quest__media-block ce-quest__media-block--" + type +"'>" +
      "<div class='ce-quest__media-block-title'>" +
      "<i class='far fa-trash-alt ce-quest__media-block-title-delete' onclick='ceqDeleteBlock(this, \"" + type + "\");'></i>" +
      "<div class='ce-quest__media-block-title-text'>" + typeTitle + "</div>" +
      "<div class='ce-quest__media-block-title-size' id ='id_file_from_block_create_post_type_" + type + "'></div>" +
      "</div>" +
      "<div class='ce-quest__media-block-list'></div>" +
      "</div>"
    );
  }

  ceqTypeDef($this, type);
}

/* delete block */
function ceqDeleteBlock($this, type) {
  $(".ce-quest__media-btn--" + type).find(".ce-quest__media-btn-input").val(null);
  $($this).parents(".ce-quest__media-block").remove();

  if (type == 'photo') $('#id_file_photos_from_block_create_post').val("");
  if (type == 'audio') $('#id_file_audio_from_block_create_post').val("");
  if (type == 'video') $('#id_file_video_from_block_create_post').val("");
  if (type == 'files') $('#id_file_file_from_block_create_post').val("");

  setSizeForAllFilesForBlockCreatePost();
}

/* audio */
function ceqAudio($this, type) {
  var filesList = $($this).prop("files");

  $.each(filesList, function(index, value) {
    var size =  value.size;
    var name =  value.name;
    var unit = " Kb";

    // Вынести в функцию
    if (size > 1048576) {
      size = ((size/1024)/1024).toFixed(2);
      unit = " Mb";
    } else if (size < 1024) {
      size = (size / 1024).toFixed(2);
    } else if (size > 1024) {
      size = Math.round(size / 1024);
    }

    if (size && name) {
      $(".ce-quest__media-block--audio .ce-quest__media-block-list").append(
        "<div class='ce-quest__media-block-item'>" +
        "<i class='fas fa-music ce-quest__media-block-item-info-icon'></i>" +
        "<div class='ce-quest__media-block-item-info'>" +
        "<div class='ce-quest__media-block-item-info-name'>" + name + "</div>" +
        "<div class='ce-quest__media-block-item-info-size'>" + size + unit + "</div>" +
        "</div>" +
        "</div>"
      );
    }
  });
}

/* files */
function ceqFiles($this, type) {
  var filesList = $($this).prop("files");

  $.each(filesList, function(index, value) {
    var size =  value.size;
    var name =  value.name;
    var unit = " Kb";

    // Вынести в функцию
    if (size > 1048576) {
      size = ((size/1024)/1024).toFixed(2);
      unit = " Mb";
    } else if (size < 1024) {
      size = (size / 1024).toFixed(2);
    } else if (size > 1024) {
      size = Math.round(size / 1024);
    }

    if (size && name) {
      $(".ce-quest__media-block--files .ce-quest__media-block-list").append(
        "<div class='ce-quest__media-block-item'>" +
        "<i class='far fa-file-alt ce-quest__media-block-item-info-icon'></i>" +
        "<div class='ce-quest__media-block-item-info'>" +
        "<div class='ce-quest__media-block-item-info-name'>" + name + "</div>" +
        "<div class='ce-quest__media-block-item-info-size'>" + size + unit + "</div>" +
        "</div>" +
        "</div>"
      );
    }
  });
}

/* video */
function ceqVideo($this) {
  var size = $($this).prop("files")[0].size;
  var file = $($this).prop("files")[0];
  var fileReader = new FileReader();

  // preview
  fileReader.onload = function() {
    var blob = new Blob([fileReader.result], {type: file.type});
    var url = URL.createObjectURL(blob);
    var video = document.createElement('video');
    var timeupdate = function() {
      if (snapImage()) {
        video.removeEventListener('timeupdate', timeupdate);
        video.pause();
      }
    };
    video.addEventListener('loadeddata', function() {
      if (snapImage()) {
        video.removeEventListener('timeupdate', timeupdate);
      }
    });
    var snapImage = function() {
      var canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      var image = canvas.toDataURL();
      var success = image.length > 100000;
      if (success) {
        $(".ce-quest__media-block--video .ce-quest__media-block-list").append(
          "<div class='ce-quest__media-block-item'>" +
          "<div class='ce-quest__media-block-item-info'>" +
          "<div class='ce-quest__media-block-item-info-preview' style='background-image: url(" + image + ");'></div>"+
          "</div>" +
          "</div>"
        );
        URL.revokeObjectURL(url);
      }
      return success;
    };
    video.addEventListener('timeupdate', timeupdate);
    video.preload = 'metadata';
    video.src = url;
    // Load video in Safari / IE11
    video.muted = true;
    video.playsInline = true;
    video.play();
  };
  fileReader.readAsArrayBuffer(file);
}

/* photo */
function ceqPhoto($this) {
  var filesList = $($this).prop("files");

  $.each(filesList, function(index, value) {
    var reader = new FileReader();

    reader.readAsDataURL($($this).prop("files")[index]);

    reader.onload = function(e) {
      ceqPhotoSlider.appendSlide([
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
};