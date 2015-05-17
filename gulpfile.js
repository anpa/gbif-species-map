// gulp
var gulp = require('gulp');

// plugins
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


// TASKS

//compile sass
gulp.task('sass', function () {
    gulp.src('app/css/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/dist'))
        .pipe(reload({ stream:true }));
});

//browserify task
gulp.task('browserify', function() {
  gulp.src('./app/dist/bundled.js')
    .pipe(clean({force: true}));

  gulp.src(['app/js/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundled.js'))
  .pipe(gulp.dest('./app/dist'))
});

//start server
gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    port: process.env.PORT || 3000
  });
});

//run project
gulp.task('start', ['sass', 'browserify', 'server']);

//update css
gulp.watch('app/css/**/*.scss', ['sass']);
//update bundle.js
gulp.watch('app/js/**/*.js', ['browserify']);
//live reload
gulp.watch(['*.html', 'dist/*.js'], {cwd: 'app'}, reload);
