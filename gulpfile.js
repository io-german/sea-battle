require('babel/register');

var gulp    = require('gulp'),
    clean   = require('gulp-clean'),
    less    = require('gulp-less'),
    mocha   = require('gulp-mocha'),
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

gulp.task('clean', function () {
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
  return gulp.src('app/assets/stylesheets/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('public/stylesheets/'))
});

gulp.task('test', function () {
  return gulp.src('test/assets/javascripts/**/*_test.js')
    .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('dist', function () {
  gulp.start('css', 'js');
});

gulp.task('watch', function () {
  gulp.watch('app/assets/stylesheets/**/*.less', ['css']);
  gulp.watch('app/assets/javascripts/**/*.js', ['js']);
});
