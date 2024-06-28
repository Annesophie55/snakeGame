const mouseScore = 50;
const intervalScore = 2;
let mousePlace = [{x: 0, y: 0}];
const errorMargin = 20;
let gameInProgress = false;
const game = document.querySelector('#game');
const snakePosition = [
  {x:290, y:190},
  {x:300, y:190},
  {x:310, y:190}
];
const snakeSegments = document.querySelectorAll('.snakeSegment');

let snakeWay = 'ArrowRight';
var score = 0;
let timeInterval = 500;
let moveInterval; 

const scoreList = document.getElementById('scores');

// fonction pour générer un nombre entier aléatoire avec un min et un max
function getRandomNumber(min, max) {
  number = Math.floor(Math.random() * (max-min+1)) + min;
  for(let i = 0; i < snakePosition.length; i++){
    if(number != snakePosition[i].x && number != snakePosition[i].y ){
      return number;
    }
  }
};

function putTheMouse() {

  // Définition aléatoire de la position de la souris
  mousePlace = [
    {x:getRandomNumber(40, 560), y:getRandomNumber(40,360)}
  ];
  const mouse = document.createElement('img');
  mouse.className = "mouse";
  mouse.src = 'mouse.svg';
  mouse.alt = 'souris';
  mouse.style.left = mousePlace[0].x + 'px';
  mouse.style.top = mousePlace[0].y + 'px';
  game.appendChild(mouse);
  return mousePlace[0].x , mousePlace[0].y;
}

function putTheSnake() {
  // Suppression des segments existants
  const existingSegments = document.querySelectorAll('.snakeSegments');
  existingSegments.forEach(segment => segment.remove());

  // Ajout des nouveaux segments
  snakePosition.forEach(position => {
    let newSegmentDom = document.createElement('div');
    newSegmentDom.className = 'snakeSegments';
    newSegmentDom.style.left = position.x + 'px';
    newSegmentDom.style.top = position.y + 'px';
    newSegmentDom.style.width = '10px';
    newSegmentDom.style.height = '10px';
    newSegmentDom.style.backgroundColor = '#0f5305';
    newSegmentDom.style.position = 'absolute';
    game.appendChild(newSegmentDom);
  });
}

// faire avancer le serpent



function changeSnakeWay(snakeWay) {
  let newHead = { ...snakePosition[0]};
  switch(snakeWay) {

    case 'ArrowRight': 
    newHead.x += 10;
    
    break;

    case 'ArrowLeft' : 
    newHead.x -= 10;
    break;

    case 'ArrowUp' : 
    newHead.y -= 10;
    break;

    case 'ArrowDown' : 
    newHead.y += 10;
    break;
  }
  return newHead;
}

function looseAlert() {
  const looseMessage = document.createElement('div');
  looseMessage.innerText = 'You lose !';
  looseMessage.fontSize = '26px';
  looseMessage.color ='red';
  scoreList.appendChild(looseMessage);
}




function snakeMoves(snakeWay) {
  let newHead = changeSnakeWay(snakeWay);

  score += intervalScore;

  if(Math.abs(newHead.x - mousePlace[0].x) < errorMargin   && Math.abs(newHead.y - mousePlace[0].y) < errorMargin) {
    console.log('souris attrapé !');
    let lastSegment = snakePosition[snakePosition.length - 1];
    changeSnakeWay(lastSegment);
    snakePosition.push({ x: lastSegment.x, y: lastSegment.y });
    putTheSnake();
    score += mouseScore;
    // Supprimer la souris existante et en placer une nouvelle
    const existingMouse = document.querySelector('.mouse');
    existingMouse.remove();
    putTheMouse();
    if(timeInterval > 100){
      timeInterval -= 50; 
    }
    clearInterval(moveInterval);
    moveInterval = setInterval(() => {
      snakeMoves(snakeWay);
    }, timeInterval);
    document.addEventListener('keydown', (e) => {

      if(gameInProgress && ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key))
      snakeWay = e.key;
    });

  }
   
  

  document.getElementById('newScore').innerText = score + ' points';

  let head = snakePosition[0];

  // Perte si le serpent touche le mur
  if(newHead.x  >= 590 || newHead.x <= -10 || newHead.y >= 390 || newHead.y <= -10) {
    looseAlert();
    gameInProgress = false;
    clearInterval(moveInterval);
    return score;
  };

  snakePosition.unshift(newHead);
  snakePosition.pop();
  putTheSnake();

    // perte si le serpent se mord la queue
    for(let i= 2; i < snakePosition.length; i++) {
      if(head.x === snakePosition[i].x && head.y === snakePosition[i].y) {
        looseAlert();
        gameInProgress = false;
        clearInterval(moveInterval);
        timeInterval = 500;
        return score;
      }
    }

}

function initializeSnakePosition() {
  snakePosition.length = 0;
  snakePosition.push({x:290, y:190});
  snakePosition.push({x:300, y:190});
  snakePosition.push({x:310, y:190});

  putTheSnake();

}




document.querySelector('.newGame').addEventListener('click', ()=> {
  if(!gameInProgress){
    gameInProgress = true;
    initializeSnakePosition();
    moveInterval = setInterval(() => {
      snakeMoves(snakeWay);
    }, timeInterval);
  }
});

// listenArrowKeydown();

document.addEventListener('keydown', (e) => {

  if(gameInProgress && ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key))
  snakeWay = e.key;
});

putTheMouse();
initializeSnakePosition();










