const gulp = require('gulp');
const sass = require('gulp-sass');

const paths = {
  css: {
    build: './src/css/processed',
    src: './src/css/src/**/*.scss',
  },
};

const handleError = (err) => {
  console.error(err);
  this.emit('end');
};

exports.css = () =>
  gulp.src(paths.css.src)
    .pipe(sass())
    .on('error', handleError)
    .pipe(gulp.dest(paths.css.build));

exports.watchCss = () =>
  gulp.watch(paths.css.src, exports.css);
