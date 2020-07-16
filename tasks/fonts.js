module.exports = function(gulp, config, reload) {
  return function() {
    return gulp.src(config.fonts.src)
      .pipe(gulp.dest(config.fonts.build))
      .pipe(reload({stream: true}));
  }
};