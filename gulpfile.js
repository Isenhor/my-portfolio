const gulp = require("gulp"); // Подключаем Gulp
const browserSync = require("browser-sync").create();
const watch = require("gulp-watch");
const sass = require("gulp-sass")(require('sass'));
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const pug = require("gulp-pug");
const del = require("del");
var gcmq = require("gulp-group-css-media-queries");
const formatHtml = require('gulp-format-html');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const ttf2woff2 = require('gulp-ttf2woff2');

// Таск для сборки Gulp файлов
gulp.task("pug", function(callback) {
    return gulp
        .src("./src/pug/pages/**/*.pug")
        .pipe(
            plumber({
                errorHandler: notify.onError(function(err) {
                    return {
                        title: "Pug",
                        sound: false,
                        message: err.message
                    };
                })
            })
        )
        .pipe(
            pug({
                pretty: '\t'
            })
        )
        .pipe(gulp.dest("./build/"))
        .pipe(browserSync.stream());
    callback();
});
// Таск для компиляции SCSS в CSS
gulp.task('ttf2woff2', async function () {
    gulp.src(['./src/fonts/*.ttf'])
        .pipe(ttf2woff2())
        .pipe(gulp.dest('build/fonts/'));
});
// Таск для компиляции SCSS в CSS
gulp.task("scss", function(callback) {
    return gulp
        .src("./src/scss/main.scss")
        .pipe(
            plumber({
                errorHandler: notify.onError(function(err) {
                    return {
                        title: "Styles",
                        sound: false,
                        message: err.message
                    };
                })
            })
        )
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
        }))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 4 versions"]
            })
        )
        .pipe(gcmq())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./build/css/"))
        .pipe(browserSync.stream());
    callback();
});

// Копирование Изображений
gulp.task("copy:img", function(callback) {
    return gulp.src("./src/img/**/*.*").pipe(webp()).pipe(gulp.dest("./build/img/"));
    callback();
});

gulp.task("copy:libs", function(callback) {
    return gulp.src("./src/libs/**/*.*").pipe(gulp.dest("./build/libs/"));
    callback();
});
// Копирование Скриптов
gulp.task("copy:js", function(callback) {
    return gulp.src("./src/js/**/*.*").pipe(gulp.dest("./build/js/"));
    callback();
});
gulp.task("copy:video", function(callback) {
    return gulp.src("./src/video/**/*.*").pipe(gulp.dest("./build/video/"));
    callback();
});

// Слежение за HTML и CSS и обновление браузера
gulp.task("watch", function() {
    // Следим за картинками и скриптами и обновляем браузер
    watch(
        ["./build/js/**/*.*", "./build/img/**/*.*" ,  "./build/libs/**/*.*", "./build/video/**/*.*" ],
        gulp.parallel(browserSync.reload)
       
    );

    // Запуск слежения и компиляции SCSS с задержкой
    watch("./src/scss/**/*.scss", function() {
        setTimeout(gulp.parallel("scss"), 500);
    });

    // Слежение за PUG и сборка
    watch("./src/pug/**/*.pug", gulp.parallel("pug"));

    // Следим за картинками и скриптами, и копируем их в build
    
    watch("./src/img/**/*.*",gulp.parallel("copy:img")); 
    watch("./src/js/**/*.*", gulp.parallel("copy:js"));
   
    watch("./src/libs/**/*.*", gulp.parallel("copy:libs"));
    watch("./src/libs/**/*.*", gulp.parallel("copy:video"));

});

// Задача для старта сервера из папки app
gulp.task("server", function() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
});

gulp.task("clean:build", function() {
    return del("./build");
});

gulp.task("html:prettify", function() {
    return gulp
    .src('build/**/*.html')
    .pipe(formatHtml())
    .pipe(gulp.dest('./build/'))
});

// Запускаем одновременно задачи server и watch
gulp.task(
    "default",
    gulp.series(
       
        gulp.parallel("clean:build"),
      
        gulp.parallel("scss", "ttf2woff2", "pug", "copy:img", "copy:js", "copy:libs", "copy:video"),
        gulp.parallel("html:prettify"),
        gulp.parallel("server", "watch"),
        
    )
);