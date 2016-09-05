const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('gulp-webpack');
const child = require('child_process');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();

const PATHS = {
    BASE_DIR: '_site',
    STYLES: {
        SRC: '_src/styles',
        DEST: 'styles'
    },
    SCRIPTS: {
        SRC: '_src/scripts',
        DEST: 'scripts'
    }
};

gulp.task('styles', () => {
    const processors = [require('autoprefixer')];

    return gulp.src(PATHS.STYLES.SRC + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PATHS.STYLES.DEST))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('scripts', () => {
    return gulp.src(PATHS.SCRIPTS.SRC + '/main.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest(PATHS.SCRIPTS.DEST));
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts',
    '--config=_config.yml,_config-dev.yml'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('build', ['styles', 'scripts']);

gulp.task('serve', () => {
    browserSync.init({
        files: [ PATHS.BASE_DIR + '/**/*.css' ],
        server: PATHS.BASE_DIR
    });
    gulp.watch(PATHS.BASE_DIR + '/**/*.html').on('change', browserSync.reload);
    gulp.watch(PATHS.STYLES.SRC + '/**/*.scss', ['styles']);
    gulp.watch(PATHS.SCRIPTS.SRC + '/**/*.js', ['scripts']);
});

gulp.task('default', ['build', 'jekyll', 'serve']);
