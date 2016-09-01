const gulp = require('gulp');
const sass = require('gulp-sass');
const webpack = require('gulp-webpack');
const ghPages = require('gulp-gh-pages');

gulp.task('styles', () => {
    return gulp.src('_assets/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/styles'));
});

gulp.task('deploy', ['styles'], () => {
    return gulp.src(['**/*', '!./node_modules/**/*', '!./.publish/**/*'])
        .pipe(ghPages());
});
