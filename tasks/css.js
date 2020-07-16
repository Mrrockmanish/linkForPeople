var concat = require('gulp-concat-css');
var csso = require('gulp-csso');

module.exports = function (gulp, config, reload) {
    return function () {
        return gulp.src(config.css.src) //Выберем наш main.scss
            //.pipe(concat('lib.css'))
            /* .pipe(csso()) */
            .pipe(gulp.dest(config.css.build))
            .pipe(reload({stream: true}));
    }
};