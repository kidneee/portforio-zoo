window.onload = function() {
  const swiperEl = document.querySelector('swiper-container');
  const swiper = swiperEl.swiper;

  var appendNumber = 4;
  var prependNumber = 1;
  document.querySelector('.prepend-2-slides').addEventListener('click', function(e) {
    e.preventDefault();
    swiper.prependSlide([
      '<swiper-slide>Slide ' + --prependNumber + '</swiper-slide>',
      '<swiper-slide>Slide ' + --prependNumber + '</swiper-slide>'
    ]);
  });

  document.querySelector('.prepend-slide').addEventListener('click', function(e) {
    e.preventDefault();
    swiper.prependSlide('<swiper-slide>Slide ' + --prependNumber + '</swiper-slide>');
  });
  document.querySelector('.append-slide').addEventListener('click', function(e) {
    e.preventDefault();
    swiper.appendSlide('<swiper-slide>Slide ' + ++appendNumber + '</swiper-slide>');
  });
  document.querySelector('.append-2-slides').addEventListener('click', function(e) {
    e.preventDefault();
    swiper.appendSlide([
      '<swiper-slide>Slide ' + ++appendNumber + '</swiper-slide>',
      '<swiper-slide>Slide ' + ++appendNumber + '</swiper-slide>'
    ]);
  });
};
window.onload = function() {
  // 背景画像の切り替え
  function buttonClick(newColor) {
    document.getElementById('BG').style.background = newColor;
  }
};

$(
  (function() {
    $('.menu-btn').on('click', function() {
      $('.menu').toggleClass('is-active');
    });
  })()
);

$('a').hover(function() {
  $(this).css('color', 'red');
});
