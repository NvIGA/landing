const   gulp         = require('gulp');
const   browserSync  = require('browser-sync').create();
const   pug          = require('gulp-pug');
const   sass         = require('gulp-sass');
const   spritesmith  = require('gulp.spritesmith');
const   rimraf       = require('rimraf');
const   rename       = require("gulp-rename");
 
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

gulp.task('watch', ()=>{

});

/* ------------Pug compile------------ */
gulp.task('views',  function buildHTML () {
    return gulp.src('app/template/index.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('build'))
});

/* ------------Styles compile------------ */
gulp.task('sass', () => {
    return gulp.src('app/styles/main.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
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
gulp.task('copy', gulp.parallel('copy:fonts', 'copy:images'));

/* ------------Watch the changes------------ */
gulp.task('watch', () => {
    gulp.watch('app/template/**/*.pug', gulp.series('views')).on('change', browserSync.reload);;
    gulp.watch('app/styles/**/*.scss', gulp.series('sass'));
});

/* ------------Gulph default------------ */
gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('views', 'sass', 'sprite', 'copy'),
    gulp.parallel('watch', 'browser-sync')
    )
);