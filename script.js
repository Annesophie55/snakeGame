// Définition aléatoire de la position de la souris
const mousePlace = [
  {x:getRandomNumber(40, 560), y:getRandomNumber(40,360)}
];
const mouse = document.getElementById('mouse');
mouse.style.left = mousePlace[0].x + 'px';
mouse.style.top = mousePlace[0].y + 'px';

// fonction pour générer un nombre entier aléatoire avec un min et un max
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max-min+1)) + min;
}

// faire avancer le serpent

const snake = [
  {x:29, y:19},
  {x:30, y:19},
  {x:31, y:19}
];
const snakeHead = snake[0];





