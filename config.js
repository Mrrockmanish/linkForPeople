module.exports = {
    build: "./build/*",
    scripts: {
        compress: false,
        src: "./src/js/*.{js,jsx}",
        watch: "./src/js/**/*.{js,jsx}",
        build: "./build/assets/js/",
        entry: "./src/js/app.js",
        sourcemapsPath: '.'
    },
    css: {
        src: "./src/css/*.css",
        watch: "./src/css/**/*.css",
        build: "./build/assets/css/"
    },
    sass: {
        src: "./src/sass/*.{scss,sass}",
        watch: "./src/sass/**/*.{scss,sass}",
        build: "./build/assets/css/",
        sourcemapsPath: '.',
        sassConfig: {
            precision: 3,
            errLogToConsole: true,
        }
    },
    images: {
        src: "./src/images/**/*.{jpg,png,svg,gif}",
        watch: "./src/images/**/*.{jpg,png,svg,gif}",
        build: "./build/assets/img/"
    },
    pictures: {
        src: "./src/pictures/**/*.{jpg,png,svg}",
        watch: "./src/pictures/**/*.{jpg,png,svg}",
        build: "./build/pictures/"
    },
    sprites: {
        src: "./src/sprites/**/*.png",
        watch: "./src/sprites/**/*.png",
        build: "./src/sass/include/"
    },
    pug: {
        src: "./src/pug/page/*.pug",
        watch: {
            pug:"./src/pug/**/*.pug"
        },
        build: "./build/"
    },
    html: {
        src: "./src/*.html",
        watch: "./src/**/*.html",
        build: "./build/"
    },
    fonts: {
        // src: [
        //     './src/fonts/**/*'
        //     // './node_modules/bootstrap-sass/assets/fonts/**/*'
        // ],
        // watch: "./src/fonts/**/*",
        // build: './build/assets/fonts',
        // formats: "woff ttf eot svg"
		src: './src/fonts/**/*.{ttf,woff,woff2,svg,eot}',
		watch: "./src/fonts/**/*.{ttf,woff,woff2,svg,eot}",
		build: './build/assets/fonts'
    },
	copy: {
		src: "./src/TinyMCE/**/*",
		build: "./build/assets/js/"
	},
    browser: {
        disable: false,
        server: {
            baseDir: "./build"
        },
        // tunnel: true,
        host: 'localhost',
        port: 8000,
        logPrefix: "lfp"
    }
};