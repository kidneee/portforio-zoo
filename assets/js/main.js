const hamburgerBtn = document.getElementById('js-hamburgerMenu');
const drawerMenu = document.getElementById('js-drawerMenu');

hamburgerBtn.addEventListener('click', () => {
  drawerMenu.classList.toggle('open');
  hamburgerBtn.classList.toggle('open');
});
