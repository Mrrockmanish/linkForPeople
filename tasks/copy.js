module.exports = function (gulp, config, reload) {
	return function () {
		return gulp.src(config.copy.src)
			.pipe(gulp.dest(config.copy.build))
	}
};