const rotators = document.querySelectorAll('.rotator');

rotators.forEach(rotator => {
  const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
  let activeIndex = cases.findIndex(item => item.classList.contains('rotator__case_active'));
  
  if (activeIndex === -1) {
    activeIndex = 0;
    cases[0].classList.add('rotator__case_active');
  }
  
  function getCurrentSpeed() {
    const activeCase = cases[activeIndex];
    const speed = activeCase.dataset.speed;
    return speed ? parseInt(speed) : 1000;
  }
  
  function setColor() {
    const activeCase = cases[activeIndex];
    const color = activeCase.dataset.color;
    
    if (color) {
      activeCase.style.color = color;
    }
  }
  
  function rotate() {
    cases[activeIndex].classList.remove('rotator__case_active');
    
    activeIndex++;
    
    if (activeIndex >= cases.length) {
      activeIndex = 0;
    }
    
    cases[activeIndex].classList.add('rotator__case_active');
    setColor();
    
    setTimeout(rotate, getCurrentSpeed());
  }
  
  setColor();
  
  setTimeout(rotate, getCurrentSpeed());
});