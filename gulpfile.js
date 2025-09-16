const {src, dest, watch, series} = require('gulp');
const postcss = require('gulp-postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

// CSS ビルド
function css() {
  return src('src/css/input.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([require('postcss-import'), tailwindcss(), autoprefixer()]))
    .pipe(rename('output.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'));
}

// 画像コピー（シンプルに、バイナリ安全）
// function images() {
//   return src('src/images/**/*').pipe(dest('dist/images'));
// }

// JS コピー
function js() {
  return src('src/js/**/*').pipe(dest('dist/js'));
}

// 監視
function watchFiles() {
  watch('src/css/**/*.css', css);
  watch('src/images/**/*', images);
  watch('src/js/**/*', js);
}

exports.css = css;
exports.images = images;
exports.js = js;
exports.watch = watchFiles;
exports.default = series(css, images, js, watchFiles);
