// Hamburger-menu
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

// event
document.querySelectorAll('.event-card__more-btn').forEach((btn) => {
  btn.addEventListener('click', function () {
    const desc = btn.previousElementSibling;
    desc.classList.toggle('is-expanded');
    btn.textContent = desc.classList.contains('is-expanded') ? '閉じる' : '続きを読む';
  });
});

// course
const courseSelectBtns = document.querySelectorAll('.course__button');

// ボタン選択
courseSelectBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log('クリックされました！');
    const currentStep = btn.dataset.step;
    console.log('currentStep:', currentStep);
    const wasSelected = btn.classList.contains('selected');
    console.log('wasSelected:', wasSelected);

    if (wasSelected) {
      console.log('選択解除処理');
      btn.classList.remove('selected');
    } else {
      console.log('選択処理開始');

      const sameStepButtons = document.querySelectorAll(`[data-step="${currentStep}"]`);
      console.log('sameStepButtons:', sameStepButtons);

      sameStepButtons.forEach((sameBtn) => {
        sameBtn.classList.remove('selected');
      });

      btn.classList.add('selected');
      console.log('選択処理完了', btn.className);
    }
  });
});
// 結果表示
const step1Button = document.querySelector('[data-step="1"].selected');
const step1Value = step1Button?.dataset.value;
console.log('セレクター結果:', document.querySelector('[data-step="1"].selected'));
console.log('selectedクラス一覧:', document.querySelectorAll('.selected'));

// FAQ
const faqItemButtons = document.querySelectorAll('.faq__item-header');
const faqItemContents = document.querySelectorAll('.faq__item-content');

faqItemButtons.forEach(function (faqItemButton, index) {
  faqItemButton.addEventListener('click', () => {
    let isOpen = faqItemContents[index].classList.contains('is-active');

    faqItemContents.forEach((faqItemContent) => {
      faqItemButton.classList.remove('is-active');
      faqItemContent.classList.remove('is-active');
    });

    if (!isOpen) {
      faqItemButtons[index].classList.add('is-active');
      faqItemContents[index].classList.add('is-active');
    }
  });
});
