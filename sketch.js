var bird;
var birdImage;
var pillar1;
var pillar2;
var pillarImage1;
var pillarImage2;
var pillarImage3;
var pillarIamge4;
var pillarGroup1;
var pillarGroup2;
var ground1;
var ground2;
var pillarGroup;
var gameOver;
var gameOverImage;
var gameState="play";
var reload;
var reloadImage;
var gameSound;
var score=0;
var overSound;
function preload(){
 birdImage=loadAnimation("f1.png","f2.png","f3.png","f4.png");
  gameOverImage=loadImage("gameover.png");
  pillarImage1=loadImage("p1.png");
  pillarImage2=loadImage("p2.png");
  pillarImage3=loadImage("p3.png");
  pillarImage4=loadImage("p4.png");
  pillarGroup1=createGroup();
  pillarGroup2=createGroup();
  gameOverImage=loadImage("gameover.png");
  reloadImage=loadImage("reload.png");
  gameSound=loadSound("gameMusic.mp3");
  overSound=loadSound("death.wav");
}

function setup() {
  createCanvas(400, 400);
  bird=createSprite(50,200,20,20);
 bird.addAnimation("flappy",birdImage);
  bird.scale=0.2;
  ground1=createSprite(200,390,800,40);
   ground1.shapeColor="lawnGreen";
  ground2=createSprite(200,10,800,40);
 
  ground2.shapeColor="lawnGreen";
  gameOver=createSprite(200,200,20,20);
  gameOver.addImage("lost",gameOverImage);
  gameOver.scale=0.05;
  reload=createSprite(200,330,10,10);
  reload.addImage("restart",reloadImage);
  reload.scale=0.08;
 
   gameSound.play();
}

function draw() {
  background("skyBlue");
  
  
  
  if (gameState=="play"){
  
    ground1.velocityX=-3;
    ground2.velocityX=-3;
  if(ground1.x<0){
    ground1.x=200;
  }
      if(ground2.x<0){
    ground2.x=200;
  }
 if (keyDown("up")){
  
   bird.y=bird.y-3;
     
 }
  if (keyDown("down")){
    bird.y=bird.y+3;
  }
   
     creatingPillars();
    gameOver.visible=false;
    reload.visible=false;
   
  if (bird.isTouching(pillarGroup1)||bird.isTouching(pillarGroup2)){
    gameState="end";
    overSound.play();
 
    if (score%10==0 && score>0){
   pillarGroup1.setVelocityXEach=+5;
  }
  }
  }
  if (gameState=="end"){
    ground1.velocityX=0;
    ground2.velocityX=0;
    pillarGroup1.setVelocityXEach(0);
   pillarGroup1.setLifetimeEach(-1);
    pillarGroup2.setVelocityXEach(0);
    pillarGroup2.setLifetimeEach(-1);
    gameOver.visible=true;
    reload.visible=true;
    gameSound.stop();
     
    if (mousePressedOver(reload)){
      gameState="play";
    gameSound.play();
    pillarGroup1.destroyEach();
    pillarGroup2.destroyEach();
      score=0;
  }
  }
 
fill("red");
   textSize(30);
    text(score,350,60);
    if (World.frameCount%20==0 && gameState=="play"){
      score=score+1;
    }
 
  
  drawSprites();
 
}
function creatingPillars(){
 if (World.frameCount%50==0){
   pillar1=createSprite(400,300,20,200);
  
 
  
  var randNo = Math.round(random(1,2));
   if (randNo==1){
      pillar1.addImage("obs1",pillarImage2);
      pillar1.scale=0.75;
     pillar1.setCollider("rectangle",0,3,70,260);
    }
    
  
  else {
      pillar1.addImage("obs2",pillarImage4);
      pillar1.scale=0.75;
    pillar1.setCollider("rectangle",0,14,70,150);
  }
// pillar1.debug=true;
   pillar1.lifetime=90;
  pillar1.velocityX=-5;
   pillarGroup1.add(pillar1);
}
  if (World.frameCount%50==0){
     pillar2=createSprite(400,60,20,200);
  
  var rand = Math.round(random(1,2));
  if (rand==1){
    pillar2.addImage("obs3",pillarImage1);
    pillar2.scale=0.75;
    pillar2.setCollider("rectangle",0,10,70,200);
  } 
  else{
    pillar2.addImage("obs4",pillarImage3);
    pillar2.scale=0.75;
    pillar2.setCollider("rectangle",0,-15,70,100);
  }
   // pillar2.debug=true;
    pillar2.lifetime=90;
  pillar2.velocityX=pillar1.velocityX;
     pillarGroup2.add(pillar2);
  }
 
}