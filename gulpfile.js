var gulp          = require('gulp'),
    pug           = require('gulp-pug'),
    stylus        = require('gulp-stylus'),
    poststylus    = require('poststylus'),
    autoprefixer  = require('autoprefixer'),
    lost          = require('lost'),
    imagemin      = require('gulp-imagemin'),
    connect       = require('gulp-connect');

gulp.task('pug', function() {
  gulp.src('./src/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('./out/'))
      .pipe(connect.reload())
})

gulp.task('stylus', function() {
  gulp.src('./src/assets/css/*.styl')
      .pipe(stylus({
        use: [
          poststylus(['autoprefixer','lost'])
        ]
      }))
      .pipe(gulp.dest('./out/assets/css'))
      .pipe(connect.reload())
})

gulp.task('imagemin', function() {
  gulp.src('./src/assets/*')
      .pipe(imagemin([
        imagemin.jpegtran({
          progressive: true
        })
      ]))
      .pipe(gulp.dest('./out/assets'))
})

gulp.task('watch', function() {
  gulp.watch(['./src/*.pug'], ['pug'])
  gulp.watch(['./src/assets/css/*.styl'], ['stylus'])
})

gulp.task('connect', function() {
  connect.server({
    root: './out',
    livereload: true
  })
})

gulp.task('build', ['pug', 'stylus', 'imagemin'])
gulp.task('server', ['connect', 'watch'])
