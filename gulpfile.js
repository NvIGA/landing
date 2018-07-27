const   gulp         = require('gulp');
const   browserSync  = require('browser-sync').create();
const   pug          = require('gulp-pug');
const   sass         = require('gulp-sass');
const   spritesmith  = require('gulp.spritesmith');
const   rimraf       = require('rimraf');
const   rename       = require("gulp-rename");
const   uglify       = require('gulp-uglify');
const   concat       = require('gulp-concat');
const   sourcemaps   = require('gulp-sourcemaps');
const   autoprefixer = require('gulp-autoprefixer');

/* ------------Server------------ */
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            port: 3000,
            baseDir: "build"
        },
        notify: false
    });
});


/* ------------Pug compile------------ */
gulp.task('views',  function buildHTML () {
    return gulp.src('app/template/index.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('build'))
});

/* ------------JS------------ */
gulp.task('js', () => {
    return gulp.src([
        'app/js/init.js',
        'app/js/main.js',
        'app/js/**.*js'
    ])
      .pipe(sourcemaps.init())
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/js'));
});


/* ------------Styles compile------------ */
gulp.task('sass', () => {
    return gulp.src('app/styles/main.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
        }))
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest('build/style'));
});

/* ------------Make a sprite------------ */
gulp.task('sprite', (cb) => {
  let spriteData = gulp.src('app/images/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    imgName: '../images/sprite.png',
    cssName: 'sprite.scss'
  }));
  spriteData.img.pipe(gulp.dest('build/images/'));
  spriteData.css.pipe(gulp.dest('app/styles/global/'));
  cb();
  
});

/* ------------Font-awesome------------ */

gulp.task('fonts', () => {
    return gulp.src('node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('build/fonts'));
});

/* ------------Delete------------ */
gulp.task('clean', del = (cb) => {
    return rimraf('build', cb) 
});

/* ------------Copy fonts------------ */
gulp.task('copy:fonts', () => {
    return gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

/* ------------Copy images------------ */
gulp.task('copy:images', () => {
    return gulp.src('app/images/**/*.*')
        .pipe(gulp.dest('build/images'));
});

/* ------------Copy------------ */
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images', 'fonts'));

/* ------------Watch the changes------------ */
gulp.task('watch', () => {
    gulp.watch('app/template/**/*.pug', gulp.series('views')).on('change', browserSync.reload);;
    gulp.watch('app/styles/**/*.scss', gulp.series('sass'));
    gulp.watch('app/js/**/*.js', gulp.series('js'));
});

/* ------------Gulph default------------ */
gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('views', 'sass', 'js', 'sprite', 'copy'),
    gulp.parallel('watch', 'browser-sync')
    )
);