var package = require('./package.json')
var gulp = require('gulp');
var webpack = require('webpack-stream');
var browserSync = require('browser-sync').create();
var del = require('del');

var path = require('path');
var SERVER_PATH = path.resolve(__dirname, 'server');
var UI_PATH = path.resolve(__dirname, 'src/ui');
var DIST_PATH = path.resolve(__dirname, package.paths.dist.ui);

gulp.task('clean', function () {
  return del([
    DIST_PATH + '/**/*',
    // we don't want to clean this file though so we negate the pattern
    // '!dist/dontDelete'
  ])
})

gulp.task('webpack', function() {
  return gulp.src( UI_PATH +'/index.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest(DIST_PATH));
});


// Static server
gulp.task('serve', function() {
    browserSync.init({
      server: DIST_PATH,
      open: true,
      logFileChanges: true
      // plugins: ['bs-fullscreen-message'],
      }
    )
})

gulp.task('watch', function(){
  gulp.watch(UI_PATH +'/**/*', ['webpack'])
  gulp.watch(DIST_PATH + '/**/*').on('change', browserSync.reload);
})

gulp.task('default',['clean', 'webpack', 'serve', 'watch'])

gulp.task('temp', function(){
  console.log('[]', process)
})