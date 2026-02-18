const deadElement = document.getElementById('dead');
const lostElement = document.getElementById('lost');

let dead = 0;
let lost = 0;

function getHole(index) {
  return document.getElementById(`hole${index}`);
}

function resetGame() {
  dead = 0;
  lost = 0;
  deadElement.textContent = dead;
  lostElement.textContent = lost;
}

function checkGameStatus() {
  if (dead >= 10) {
    alert('Победа! Вы убили 10 кротов!');
    resetGame();
  } else if (lost >= 5) {
    alert('Поражение! Вы промахнулись 5 раз!');
    resetGame();
  }
}

for (let i = 1; i <= 9; i++) {
  const hole = getHole(i);
  
  hole.onclick = function() {
    if (hole.classList.contains('hole_has-mole')) {
      dead++;
      deadElement.textContent = dead;
    } else {
      lost++;
      lostElement.textContent = lost;
    }
    
    checkGameStatus();
  };
}