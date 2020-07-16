module.exports = function(gulp, config, reload) {
  return function() {
    return gulp.src(config.pictures.src)
      .pipe(gulp.dest(config.pictures.build))
      .pipe(reload({stream: true}));
  }
};