const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('gulp-webpack');
const ghPages = require('gulp-gh-pages');

gulp.task('styles', () => {
    const processors = [require('autoprefixer')];

    return gulp.src('_assets/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
});

gulp.task('webpack', () => {
    return gulp.src('_assets/scripts/main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('js'))
});

gulp.task('build', ['styles', 'webpack']);

gulp.task('deploy', ['build'], () => {
    return gulp.src(['**/*', '!./node_modules/**/*', '!./.publish/**/*'])
        .pipe(ghPages());
});
