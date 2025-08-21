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

// course
// ボタン選択
const courseSelectBtns = document.querySelectorAll('.course__button');

courseSelectBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const currentStep = btn.dataset.step;
    const wasSelected = btn.classList.contains('selected');

    if (wasSelected) {
      btn.classList.remove('selected');
    } else {
      const sameStepButtons = document.querySelectorAll(`[data-step="${currentStep}"]`);
      sameStepButtons.forEach((sameBtn) => {
        sameBtn.classList.remove('selected');
      });

      btn.classList.add('selected');
    }

    // 結果を更新する関数を呼び出し
    updateResult();
  });
});

function updateResult() {
  const step1Button = document.querySelector('[data-step="1"].selected');
  const step2Button = document.querySelector('[data-step="2"].selected');
  const step3Button = document.querySelector('[data-step="3"].selected');

  const step1Value = step1Button?.dataset.value;
  const step2Value = step2Button?.dataset.value;
  const step3Value = step3Button?.dataset.value;

  const result = document.getElementById('js-result');

  // 既存の結果をクリア
  result.innerHTML = '';
  result.classList.remove('open');
  result.style.backgroundColor = ''; // スタイルもリセット

  // 全て選択されている場合のみ結果を表示
  if (step1Value && step2Value && step3Value) {
    const resultText = document.createElement('p');
    resultText.textContent = `${step1Value}と${step2Value}に${step3Value}を楽しむ！`;
    result.appendChild(resultText);
    result.classList.add('open');

    if (step1Value === 'family' && step2Value === 'casual' && step3Value === 'animals') {
    } else if (step1Value === 'partner' && step2Value === 'casual' && step3Value === 'animals') {
      resultText.textContent = step1Value;
      result.appendChild(resultText);
      result.style.backgroundColor = 'green';
      result.classList.add('open');
    }
    // 他の組み合わせも追加可能
  }
}

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
