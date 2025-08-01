const hamburgerBtn = document.getElementById('js-hamburgerMenu');
const drawerMenu = document.getElementById('js-drawerMenu');

hamburgerBtn.addEventListener('click', () => {
  drawerMenu.classList.toggle('open');
  hamburgerBtn.classList.toggle('open');

  if (drawerMenu.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
