var gulp    = require('gulp'),
    cssnext = require('gulp-cssnext'),
    clean   = require('gulp-clean'),
    plumber = require('gulp-plumber'),
    rename  = require('gulp-rename'),
    webpack = require('gulp-webpack');

var webpackConfig = {
  entry: './app/assets/javascripts/main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: 'node_modules|test'
      }
    ]
  },
  eslint: {
    configPath: './.eslintrc'
  }
};

gulp.task('clean', function (callback) {
  gulp.src([ 'public/javascripts/bundle.js', 'public/stylesheets/bundle.css' ])
    .pipe(plumber())
    .pipe(clean());
});

gulp.task('js', function () {
  return gulp.src('app/assets/javascripts/main.js')
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('css', function () {
  return gulp.src('app/assets/stylesheets/main.css')
    .pipe(plumber())
    .pipe(cssnext())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('public/stylesheets/'))
});

gulp.task('dist', function () {
  gulp.start('css', 'js');
});
