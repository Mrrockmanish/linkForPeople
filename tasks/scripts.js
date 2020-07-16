var sourcemaps = require('gulp-sourcemaps');
var uglifyjs = require('uglify-js');
var minifier = require('gulp-uglify/minifier');
var plumber = require('gulp-plumber');
var fileinclude = require('gulp-file-include');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');

module.exports = function (gulp, config, reload) {

    var compressPipe = lazypipe()
        .pipe(sourcemaps.init)
        .pipe(minifier, {preserveComments: 'license', compress: {hoist_funs: false}}, uglifyjs);
        // .pipe(sourcemaps.write, config.scripts.sourcemapsPath);

    return function () {
        return gulp.src(config.scripts.src)
            .pipe(plumber())
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulpif(config.scripts.compress, compressPipe()))
            .pipe(plumber.stop())
            .pipe(gulp.dest(config.scripts.build))
            .pipe(reload({stream: true}));
    }
};