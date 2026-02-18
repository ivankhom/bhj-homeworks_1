const counterElement = document.getElementById('clicker__counter');
const cookieElement = document.getElementById('cookie');

let clickCount = 0;
let lastClickTime = null;
let speedElement = null;

function createSpeedElement() {
  if (!document.getElementById('clicker__speed')) {
    speedElement = document.createElement('div');
    speedElement.className = 'clicker__status';
    speedElement.id = 'clicker__speed';
    speedElement.textContent = 'Скорость клика: 0.00';
    
    const statusElement = document.querySelector('.clicker__status');
    statusElement.parentNode.insertBefore(speedElement, statusElement.nextSibling);
  } else {
    speedElement = document.getElementById('clicker__speed');
  }
}

createSpeedElement();

function calculateClickSpeed() {
  const currentTime = new Date().getTime();
  
  if (lastClickTime === null) {
    lastClickTime = currentTime;
    return 0;
  }
  
  const timeDiff = (currentTime - lastClickTime) / 1000;
  const speed = (1 / timeDiff).toFixed(2);
  
  lastClickTime = currentTime;
  return speed;
}

cookieElement.onclick = function() {
  clickCount++;
  counterElement.textContent = clickCount;
  
  const speed = calculateClickSpeed();
  speedElement.textContent = `Скорость клика: ${speed}`;
  
  const currentWidth = parseInt(cookieElement.width);
  
  if (currentWidth === 200) {
    cookieElement.width = 220;
    cookieElement.height = 220;
  } else {
    cookieElement.width = 200;
    cookieElement.height = 200;
  }
};