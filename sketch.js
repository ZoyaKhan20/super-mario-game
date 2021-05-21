var platform, platformGroup;
var mario;
var wall;
var obstacle,obstacleGroup;
var flag;
var groundImage, marioImage, wallImage, obstacleImage,flagImage;
var LOSE = 0;
var PLAY = 1;
var WIN = 2;
var gameState = PLAY;
 
function preload()
{
  groundImage = loadImage("images/ground.png");
  marioImage = loadAnimation("images/Capture1.png", "images/Capture3.png", "images/Capture4.png");
  wallImage = loadImage("images/wall.png");
  obstacleImage = loadImage("images/obstacle1.png");
  flagImage = loadImage("images/Flag.png");
}

function setup() 
{
  createCanvas(displayWidth, 700);
                                                
  var xPosition = 0;  
  var gap; 
  
  mario = new Player();
 
  platformGroup = new Group();
  obstacleGroup = new Group();
  
  for(i=0; i<5; i++)
  {
    platform = new Platform(xPosition); 
    platformGroup.add(platform.spt);
    gap = random([90, 140]);
    xPosition = xPosition + platform.sptW + gap;
    
    if(i%3 === 0)
  {
    wall = new Wall(xPosition);
    platformGroup.add(wall.spt);
    obstacle = new Obstacle(xPosition);
    obstacleGroup.add(obstacle.spt);
   }
  }
  flag = createSprite(xPosition -230,height - 340);
  flag.addImage("flag",flagImage);
  flag.scale = 0.05;
}
  
function draw() 
{
  background('skyblue');  
  translate(-mario.spt.x + width/2, 0);

if(gameState === PLAY)
{
  mario.applyGravity();
  mario.spt.collide(platformGroup);
  
  if(keyDown("left"))
  {
    mario.moveLeft();
  }

  if(keyDown("right"))
  {
    mario.moveRight();
  }

  if(keyDown("up") && mario.spt.velocityY === 0)
  {
    mario.jump();
  }
  if(obstacleGroup.isTouching(mario.spt)|| mario.spt.y > height)
  {
     gameState = LOSE;
  }
  if(flag.isTouching(mario.spt))
  {
    gameState = WIN;
  }
}
if(gameState === LOSE)
{
  textSize(40);
  text("GAME OVER",mario.spt.x,350);
  obstacleGroup.destroyEach();
  mario.spt.setVelocity(0,0);
  mario.spt.pause();
}
if(gameState === WIN)
{
  textSize(40);
  text("Congratulations!! YOU WIN",mario.spt.x,350);
  obstacleGroup.destroyEach();
  mario.spt.setVelocity(0,0);
  mario.spt.pause();
}


  drawSprites();
}

