const timerElement = document.getElementById('timer');
let timerValue = parseInt(timerElement.textContent, 10);

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function downloadFile() {
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = 'https://netology.ru/sites/all/themes/netology/picture/logo.svg';
  link.download = '';
  link.target = '_blank';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const interval = setInterval(() => {
  timerValue -= 1;
  timerElement.textContent = formatTime(timerValue);

  if (timerValue <= 0) {
    clearInterval(interval);
    alert('Вы победили в конкурсе!');
    downloadFile();
  }
}, 1000);