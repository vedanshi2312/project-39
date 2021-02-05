            //Dino on a mission!!!
var crate,crateImage;
var invisibleGround;
var tree,treeImage;
var bush,bushImage;
var sign,signImage;
var egg,eggImage
var dino,dinoImage;
var ladder,ladderImage;
var bg,bgImage
var rain,rainImage;
var rb,rbImage;
var snow,snowI;
var sb,sbImage;
var hf;
var score=0;
var meteor,meteorImage;
var eggsGroup;
var treesGroup;
var laddersGroup;
var meteorGroup;
var gameState="play";
var ta,taImage;

function preload(){
snowI=loadAnimation("Snow flackes 1.png","snowflackes 2.png")
  taImage=loadImage("hey.png");
  sbImage=loadImage("chist.png"); 
  meteorGroup=new Group();
  meteorImage=loadImage("meteor-removebg-preview.png");
  hf=loadSound("gjvf.mp3")
  crateImage=loadImage("Crate.png");
  bushImage=loadImage("Bush (1).png");
  signImage=loadImage("Sign_1.png");
  treeImage=loadImage("pic 1.png");
  eggImage=loadImage("sagas.png");
  dinoImage=loadAnimation("Run (1).png","Run (2).png");
  ladderImage=loadImage("dfgh.png");
  bgImage=loadImage("BG.png");
  rainImage=loadAnimation("Rain 1.png","rain 2.png");
  rbImage=loadImage("frchnd.png");


}


function setup() {
  
  createCanvas(displayWidth, displayHeight);
  
  ta=createSprite(displayWidth/2,displayHeight/2);
  ta.addImage("ta",taImage);
  ta.scale=0.5;
  ta.visible=false;
  
  bg=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  bg.addImage("bg",bgImage);
  bg.velocityX=-4;
  bg.scale=2;
  
  dino=createSprite(47,344);
  dino.addAnimation("dino",dinoImage);
  dino.scale=0.15;
 
//  rain=createSprite(displayWidth/4,displayHeight/2);
  //rain.addAnimation("rain",rainImage);
  //rain.visible=false;
  //rain.scale=1.5;
  
//  rb=createSprite(displayWidth/2-170,displayHeight/2-160);
//  rb.addImage("rb",rbImage);
 // rb.scale=0.15;
  
  snow=createSprite(200,100,400,400); 
  snow.addAnimation("snow",snowI);
  snow.visible=false;
  snow.scale=2.6;
  
  sb=createSprite(displayWidth/2-150,displayHeight/2+200);
  sb.addImage("sb",sbImage)
  sb.scale=0.2;
  
  eggsGroup=new Group();
  
  treesGroup=new Group();
  
  laddersGroup=new Group();
  
  hf.loop();
  
  invisibleGround=createSprite(displayWidth/2,displayHeight/2+300,displayWidth,20);
  invisibleGround.visible=false;
  
}
function spawnEggs(){
 
  if(frameCount%200===0){
  
    tree=createSprite(400,108);
    tree.addImage("tree",treeImage);
    tree.scale=0.5;
    tree.velocityX=-4;
    tree.y=Math.round(random(displayHeight/2+100,300));
    
    egg=createSprite(400,63);
    egg.addImage("egg",eggImage)
    egg.scale=0.1;
    egg.y=tree.y-45;
    egg.velocityX=-4;
    
    ladder=createSprite(400,129);
    ladder.addImage("ladder",ladderImage);
    ladder.scale=0.04
    ladder.y=tree.y+21;
    ladder.velocityX=-4;
    
    eggsGroup.add(egg);
    laddersGroup.add(ladder);
    treesGroup.add(tree);
                          egg.setCollider("rectangle",0,0,egg.width,egg.height)
    
  }
  
}


function draw() {
  dino.collide(invisibleGround)
 
  if(gameState==="play"){
  //  rb.visible=true;
    sb.visible=true;
    
    
    
    dino.visible=true;
    bg.visible=true;
    dino.depth=treesGroup.depth;
    dino.depth=dino.depth+1;
    camera.position.x=displayWidth/2;
    camera.position.y=dino.y;
   // if(mousePressedOver(rb)){
  //    rain.visible=true;
  //    snow.visible=false;

 //   }
  //  if(dino.y>400){
  //    gameState="end"
//    }
    if(mousePressedOver(sb)){
      snow.visible=true;
    //  rain.visible=false;
    }
    spawnEggs();
    spawnObstacles();
  
    
    background(220);
    if(bg.x<displayWidth/2-500){
      bg.x=displayWidth/2-200;
    }
    dino.velocityX=0.2;
    if(dino.x>400){
      dino.x=47;
    }
    if(keyDown("space")&&dino.y>displayHeight/2-100){
      dino.velocityY=-8;
      
    }
    dino.velocityY=dino.velocityY+0.8;
    console.log(dino.y)
dino.setCollider("rectangle",0,0,dino.width,dino.height)
 
    if(dino.isTouching(eggsGroup)){
      egg.destroy();
      score=score+100;
 
    }
  } 
  if(dino.isTouching(meteorGroup)){
    gameState="end";
  }
  if(gameState==="end"){
    
    background("yellow");
    if(mousePressedOver(ta)){
      gameState="play";
      ta.visible=false;
      dino.x=47;
      dino.y=344;
    }
    score=0;
    ta.visible=true;
    bg.visible=false;
    dino.visible=false;
    treesGroup.destroyEach();
    laddersGroup.destroyEach();
    eggsGroup.destroyEach();
    meteorGroup.destroyEach();
 //   rb.visible=false;
    sb.visible=false;
    snow.visible=false;
   // rain.visible=false;
  
  } 
  
  drawSprites();
  if(gameState==="play"){
    fill("black")
    text("Your Score: "+score,displayWidth/2-500,displayHeight/2-300);
    
  }
function spawnObstacles(){
  if(frameCount%60===0){
    meteor=createSprite(displayWidth/2,displayHeight/2);
    meteor.y=Math.round(random(displayHeight/3,380))
    meteor.addImage("meteor",meteorImage)
    meteor.scale=0.1;
    meteor.velocityX=-8;
    meteorGroup.add(meteor);
  }
  
}
  
     
}
