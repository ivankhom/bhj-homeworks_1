const revealElements = document.querySelectorAll('.reveal');

function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  return rect.top < windowHeight && rect.bottom > 0;
}

function checkRevealElements() {
  revealElements.forEach(element => {
    if (isElementInViewport(element)) {
      element.classList.add('reveal_active');
    } else {
      element.classList.remove('reveal_active');
    }
  });
}

window.addEventListener('scroll', checkRevealElements);

checkRevealElements();