  var trex,trexRunning,endTrex;

  var groud,groundImage;

  var backGround,backGroundImage;

  var invisibleGround;

  var obstacle,ob1,ob2,ob3,ob4,ob5,ob6,obstacleGroup;

  var PLAY = 1;
  var END = 0;
  var gameState = PLAY;

  var gameover,gameoverImage;

  var restart,restartIcon;

  var jumpSound,scoreSound,endSound;

  var score;

function preload(){
 
  trexRunning = loadAnimation("trex1.png","trex3.png","trex4.png"); 

  endTrex = loadAnimation("trex_collided - Copy.png");

  groundImage = loadImage("ground2.png");

  backGroundImage = loadImage("spaceEffect2.jpg");

  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");  
  ob4 = loadImage("obstacle4.png");  
  ob5 = loadImage("colourful_obstacle5.png");  
  ob6 = loadImage("obstacle6.png");  

  gameoverImage = loadImage("gameOver.png");
  restartIcon = loadImage("restart.png");

  jumpSound = loadSound("jump.mp3");
  scoreSound = loadSound("checkPoint.mp3");
  endSound = loadSound("die.mp3");
  
}

function setup(){
  
  createCanvas(windowWidth,windowHeight); 

  backGround = createSprite(350,150,windowWidth,windowHeight);
  backGround.addImage(backGroundImage);
  backGround.scale = 5;  
  backGround.velocityX = -3;
  backGround.x = backGround.width /2;

  ground = createSprite(300,windowHeight -100,windowWidth,windowHeight);
  ground.addImage("grounds",groundImage);
  ground.scale = 2.5;
  ground.velocityX = -3;
  ground.x = ground.width /2;

  trex = createSprite(50,250,25,25); 
  trex.addAnimation("animatedTrex",trexRunning);
  trex.addAnimation("ended_trex",endTrex);
  trex.scale =0.6;    
  trex.debug = false ;
  trex.setCollider("rectangle",0,0,75,75);

  invisibleGround = createSprite(300,windowHeight -100,600,5);
  invisibleGround.visible = false; 

  gameover = createSprite(windowWidth/2,windowHeight/2-100,15,15);  
  gameover.visible = false ;
  gameover.addImage("game_end",gameoverImage);
  gameover.scale = 1.5;

  restart = createSprite(windowWidth/2,windowHeight/2-50,15,15);
  restart.visible = false ; 
  restart.addImage("restartI",restartIcon);
  restart.scale = 0.8;

  score = 0;

  obstacleGroup = new Group;
  
}

function draw(){
  
  background("white");

  trex.collide(invisibleGround);  

  trex.velocityY = trex.velocityY + 0.5;   

    if(gameState === PLAY){

      
    if((touches.length > 0 || keyDown("SPACE")) && trex.y  >=height-120) {
      jumpSound.play();
      trex.velocityY = -10;
       touches = [];
    }
      
      spawnObstacles()

      if(ground.x < 0){
         ground.x = ground.width/2; 
      }

      if(backGround.x < 150){
         backGround.x = backGround.width/2;
      }

      if(score>0 && score%100 === 0){
         scoreSound.play() 
      }  

    score = score + Math.round(getFrameRate()/30);

      if(keyDown("space")&& trex.y >= 225){  
        trex.velocityY = -12; 
        jumpSound.play();
      }

    ground.velocityX = -(3 + 2* score/200);
    backGround.velocityX = -(3 + 2* score/200);

      if(obstacleGroup.isTouching(trex)){
        jumpSound.play();
        gameState = END;
        endSound.play()  
    }  

    }else if(gameState === END){

    gameover.visible = true;
    restart.visible = true; 

    ground.velocityX = 0;
    backGround.velocityX = 0;
    obstacleGroup.setVelocityXEach(0); 

    trex.changeAnimation("ended_trex",endTrex);

    obstacleGroup.setLifetimeEach(-1);
      
    if(touches.length>0 || mousePressedOver(restart)) {      
      regame();
      touches = []
    }

    }

  drawSprites();  

  fill("red");
  textSize(20);
  text("score : " + score,windowWidth -150,50);  

}
function spawnObstacles(){
   if (frameCount % 100 === 0){
     var obstacle = createSprite(600,windowHeight-140,10,40);

     obstacle.velocityX = -(3 + 2* score/400);
     
        var rand = Math.round(random(1,6));
        switch(rand) {
          case 1: obstacle.addImage(ob1);
                  break;
          case 2: obstacle.addImage(ob2);
                  break;
          case 3: obstacle.addImage(ob3);
                  break;
          case 4: obstacle.addImage(ob4);
                  break;
          case 5: obstacle.addImage(ob5);
                  break;
          case 6: obstacle.addImage(ob6);
                  break;
          default: break;
      }

      obstacle.scale = 1;
      obstacle.lifetime = 200;

      obstacleGroup.add(obstacle);
  }
}

function regame(){

  gameState = PLAY;

  trex.changeAnimation("animatedTrex",trexRunning);

  score = 0;

  obstacleGroup.destroyEach(); 

  gameover.visible = false;
  restart.visible = false;

}