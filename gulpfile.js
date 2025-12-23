const {src, dest, watch, series} = require('gulp');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

// HTMLコピー
function html() {
  return src(['*.html', 'templates/pages/*.html'])
    .pipe(
      rename((file) => {
        if (file.dirname.includes('templates')) {
          file.dirname = '';
        }
      })
    )
    .pipe(dest('dist'));
}

// CSS ビルド
function css() {
  return src('src/css/input.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([require('postcss-import'), tailwindcss(), autoprefixer()]))
    .pipe(rename('output.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'));
}

// JS コピー
function js() {
  return src('src/js/**/*').pipe(dest('dist/js'));
}

// 監視
function watchFiles() {
  watch('src/css/**/*.css', css);
  // watch('src/images/**/*', images);
  watch('src/js/**/*', js);
}

exports.html = html;
exports.css = css;
// exports.images = images;
exports.js = js;
exports.watch = watchFiles;
exports.default = series(html, css, js, watchFiles);
