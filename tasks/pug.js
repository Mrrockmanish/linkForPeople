var plumber = require('gulp-plumber');
var gulppug = require('gulp-pug');
var changed = require('gulp-changed');
var cached  = require('gulp-cached');

module.exports = function(gulp, config, reload) {

    return function() {
        return gulp.src(config.pug.src)
            .pipe(plumber())
			.pipe(changed(config.pug.build, {hasChanged: changed.compareLastModifiedTime}))
            .pipe(gulppug({pretty: true}))
            .pipe(cached('pug'))
            .pipe(plumber.stop())
            .pipe(gulp.dest(config.pug.build))
            .pipe(reload({stream: true}));
    }
};