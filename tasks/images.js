var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
module.exports = function(gulp, config, reload) {
    return function(){
        return gulp.src(config.images.src)
            .pipe(plumber())
            .pipe(imagemin({
                progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true
    }))
            .pipe(plumber.stop())
            .pipe(gulp.dest(config.images.build))
            .pipe(reload({stream: true}));
    }
};