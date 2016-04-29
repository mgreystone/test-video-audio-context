'use strict'

var path = require('path')
var gulp = require('gulp')
var gutil = require('gulp-util')
var rimraf = require('rimraf')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')

var config = require('./webpack.config.js')

var src = path.join(__dirname, 'src')
var dist = path.join(__dirname, 'dist')
var port = process.env.PORT || 8080

gulp.task('assets', function () {
  return gulp.src(path.join(src, 'assets/**/*'))
    .pipe(gulp.dest(path.join(dist, 'assets')))
})

gulp.task('clean', function (callback) {
  rimraf(dist, callback)
})

gulp.task('watch', function () {
  gulp.watch(path.join(src, 'assets/**/*'), ['assets'])
})

gulp.task('webpack', function (callback) {
  webpack(config, function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }

    gutil.log('[webpack]', stats.toString())

    callback()
  })
})

gulp.task('webpack-dev-server', function (callback) {
  var compiler = webpack(config)

  new WebpackDevServer(compiler, {
    contentBase: dist
  })

    .listen(port, '0.0.0.0', function (err) {
      if (err) {
        throw new gutil.PluginError('webpack-dev-server', err)
      }

      gutil.log('[webpack-dev-server', 'http://localhost:' + port + '/index.html')
    })
})

gulp.task('build', ['assets', 'webpack'])
gulp.task('dev', ['assets', 'watch', 'webpack-dev-server'])
gulp.task('default', ['dev'])
