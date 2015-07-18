gulp        = require 'gulp'
babel       = require 'gulp-babel'
babelify    = require 'babelify'
browserify  = require 'browserify'
source      = require 'vinyl-source-stream'

gulp.path =
  app: 'app'
  dist: 'dist'

gulp.task 'build', ->
  gulp.src "#{@path.app}/scripts/background.js"
    .pipe babel()
    .pipe gulp.dest("#{@path.dist}/")

  gulp.src "#{@path.app}/image/*.png"
    .pipe gulp.dest("#{@path.dist}/image")

  gulp.src "#{@path.app}/manifest.json"
    .pipe gulp.dest("#{@path.dist}")

  gulp.src "#{@path.app}/ocr-screen.html"
    .pipe gulp.dest("#{@path.dist}")

  browserify
      entries: ["./#{@path.app}/scripts/ocr_screen.js"]
      extensions: ['.js', '.jsx']
    .transform(babelify)
    .bundle()
    .pipe source 'bundle.js'
    .pipe gulp.dest("#{@path.dist}/")

gulp.task 'watch', ['build'], ->
  gulp.watch("#{@path.app}/**/*", ['build'])
