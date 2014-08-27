gulp = require 'gulp'
gutil = require 'gulp-util'

parentDir = "practice/"

#load all module
$ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
})

browserSync = require 'browser-sync'
reload = browserSync.reload
runSequence = require('run-sequence');

gulp.task 'default', ->
  console.log 'gulp!'

#coffee compile
gulp.task 'coffee', ->
  gulp
  .src ['src/coffee/*.coffee']
  .pipe $.coffee()
  .pipe gulp.dest parentDir + 'js'

#run server / watch
gulp.task 'serve', ['default'], ->
  browserSync
    notify: false
    server:
      baseDir: [parentDir]
  gulp.watch ['src/coffee/*.coffee'], ['script']
  gulp.watch [parentDir + '*.html'], reload

#coffee compile&reload
gulp.task 'script',->
  runSequence 'coffee',reload