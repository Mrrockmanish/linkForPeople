var gulp = require('gulp');
var watch = require('gulp-watch');
var browser = require('browser-sync');
var rimraf = require('rimraf');

var config = require('./config');

var getTask = function(task) {
  return require('./tasks/' + task)(gulp, config, browser.reload);
};

gulp.task('scripts', getTask('scripts'));
// gulp.task('css', getTask('css'));
gulp.task('sass', getTask('sass'));
gulp.task('sprites', getTask('sprites'));
// gulp.task('html', getTask('html'));
gulp.task('pictures', getTask('pictures'));
gulp.task('images', getTask('images'));
gulp.task('pug', getTask('pug'));
gulp.task('fonts', getTask('fonts'));
gulp.task('copy', getTask('copy'));

gulp.task(
  'build',
  [
    'scripts',
    'sprites',
    'fonts',
    'sass',
    'copy',
    'pictures',
    'images',
    'pug'
  ]
);

gulp.task(
  'watch', function() {
    watch([config.pug.watch.pug], function(event, cb) {
        gulp.start('pug');
    });
    watch([config.sass.watch], function (event, cb) {
        gulp.start('sass');
    });
    watch([config.scripts.watch], function(event, cb) {
      gulp.start('scripts');
    });
    watch([config.images.watch], function(event, cb) {
      gulp.start('images');
    });
    watch([config.sprites.watch], function(event, cb) {
      gulp.start('sprites');
    });
    watch([config.pictures.watch], function(event, cb) {
      gulp.start('pictures');
    });
    watch([config.fonts.watch], function(event, cb) {
      gulp.start('fonts');
    });
  }
);

gulp.task(
  'clean', function (cb) {
    rimraf(config.build, cb);
  }
);

gulp.task(
  'browser', function () {
    if(!config.browser.disable) {
        browser(config.browser);
    }
  }
);

gulp.task('rebuild', ['clean', 'build']);
gulp.task('default', ['build', 'browser', 'watch']);

