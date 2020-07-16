var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var csso = require('postcss-csso');
var prefixer = require('autoprefixer');
var rename = require('gulp-rename');
var change = require('gulp-changed');
var cleanCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');

module.exports = function (gulp, config, reload) {
    return function () {
        return gulp.src(config.sass.src) //Выберем наш main.scss
            .pipe(change(config.sass.build))
            .pipe(plumber()) //
            .pipe(sourcemaps.init())
            // .pipe(gulpif(config.scripts.sourcemapsPath, sourcemaps.init()))
            .pipe(sass(config.sass.sassConfig).on('error', sass.logError))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(postcss([
              // csso({
              //     forceMediaMerge: true
              // }),
              prefixer(),
            ]))
            .pipe(rename({suffix: '.min'}))
            // .pipe(gulpif(config.scripts.sourcemapsPath, sourcemaps.write(config.sass.sourcemapsPath)))
            .pipe(sourcemaps.write(config.sass.sourcemapsPath))
            .pipe(plumber.stop())
            .pipe(gulp.dest(config.sass.build))
            .pipe(reload({stream: true}));
    }
};