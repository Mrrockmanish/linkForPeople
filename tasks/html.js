var plumber = require('gulp-plumber');
var fileinclude = require('gulp-include-tag');

module.exports = function(gulp, config, reload) {
  return function() {
    return gulp.src(config.html.src)
      .pipe(plumber())
      .pipe(fileinclude())
      .pipe(gulp.dest(config.html.build))
      .pipe(plumber.stop())
      .pipe(reload({stream: true}));
  }
};