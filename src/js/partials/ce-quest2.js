function ceqAdd($this) {
  var filesList = $($this).prop("files");

  $.each(filesList, function(index, value) {
    console.log(value);
  });
}