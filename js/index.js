const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const backgroundImage = new Image();
backgroundImage.src = 'images/forest.jpeg'; 

canvas.width = 768;
canvas.height = 590;

const numberOfEnemies = 4;
let enemiesArray = []
let frames = 0;
let points = 0;
let intervalId;
let gameSpeed = 0.3;

let x = 0;
let x2 = 923;


class Vamp {
  constructor(){
    this.x = 10;
    this.y = 10;
    this.speedX = 0;
    this.speedY = 0;
    this.width = 60;
    this.height = 70;

    const newImage = new Image();
    newImage.src = 'images/vampire2.png'
    newImage.addEventListener('load', () => {
      this.img = newImage;

    });
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  moveUp() {
    this.y -= 15;
  }
  moveDown() {
    this.y += 15;
  }
  moveLeft() {
    this.x -= 15;
  }
  moveRight() {
    this.x += 15;
  }

 left(){
  return this.x;
  
 }
right() {
  return this.x + this.width;
}
top() {
  return this.y;
}
bottom() {
  return this.y + this.height;
}
  
}



class Enemy {  
  constructor(){
    this.x = canvas.width;
    this.y = Math.random() * canvas.height;
    this.width = 60;
    this.height = 20;
    this.speed = Math.random() * 3 + 1;
    this.angle = Math.random() * 4;
    this.frame = 0;

    const enemyImage = new Image();
      enemyImage.src = "images/stake.png";
      enemyImage.addEventListener('load', ()=>{
      this.img = enemyImage;
    })
    
  }
 
  update(){
    this.x -= this.speed;
    this.y += Math.sin(this.angle);
    this.angle += 0.09;
    if(this.x + this.width < 0) this.x = canvas.width;
  }

 draw(){
  ctx.clearRect(this.img, this.x, this.y, this.width, this.height)
  //ctx.fillRect(this.x, this.y, this.width, this.height);
 ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  
 }
 left(){
      return this.x;
      
     }
    right() {
      return this.x + this.width;
    }
    top() {
      return this.y;
    }
    bottom() {
      return this.y + this.height;
    }
};


function updateEnemies() {
  for (i = 0; i < enemiesArray.length; i++) {
    enemiesArray[i].x -= 1;
    enemiesArray[i].draw();
    
  }
  frames += 1;
  if (frames % 40 === 0) {
    enemiesArray.push(new Enemy());
    console.log(enemiesArray);
  }
}



function startGame() {
  drawBackground()
  vamp.draw()
}




function drawBackground() {
  ctx.clearRect(this.x, this.y, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, x, 0);
  ctx.drawImage(backgroundImage, x2, 0);
  document.querySelector('.game-intro').style.display = 'none'; 
  document.querySelector('#game-board').style = 'width: 100vw; display: flex; justify-content: center;';
  if(x < -923) x = 923 + x2 - gameSpeed;
  else x -= gameSpeed;
  if(x2 < -923) x2 = 923;
  else x2 -= gameSpeed  + x - gameSpeed;
  
}




function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground()
  vamp.draw();
  updateEnemies();
  gameOver();
  updateScore();

}




function animate (){
   ctx.clearRect(this.x, this.y, canvas.width, canvas.height);
   enemiesArray.forEach(newEnemy => {
    //newEnemy.draw();
    newEnemy.update();
   });
  requestAnimationFrame(animate);
}

animate();



const vamp = new Vamp();
const newEnemy = new Enemy()



//load the game
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame(); 
   
   intervalId = setInterval(updateCanvas, 20);
  };
};

document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 38: vamp.moveUp();    console.log('up',    vamp); break;
    case 40: vamp.moveDown();  console.log('down',  vamp); break;
    case 37: vamp.moveLeft();  console.log('left',  vamp); break;
    case 39: vamp.moveRight(); console.log('right', vamp); break;
  }
  updateCanvas();
})

function stopGame(){
  clearInterval(intervalId);

}


function crashWith(newEnemy) {

  return !(
    vamp.bottom() < newEnemy.top() ||
    vamp.top() > newEnemy.bottom() ||
    vamp.right() < newEnemy.left() + 5 ||
    vamp.left() > newEnemy.right() - 5
  );
}

function updateScore() {
  points = Math.floor(frames / 15);
  ctx.font = '28px serif';
  ctx.fillStyle = 'white';
  ctx.fillText(`Score: ${points}`, 640, 50);
}

function gameOver(){
  const crashed = enemiesArray.some(function (newEnemy) {
    return crashWith(newEnemy);
  });
  
  if (crashed) {
    stopGame();

    const points = Math.floor(frames / 15);
ctx.fillStyle = "200px serif";
ctx.fillText(`Game Over your score is ${points}`, 230, canvas.height / 2);
  }
}
