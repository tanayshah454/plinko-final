const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var ground
var particles=[];
var divisions=[];
var plinkos=[];
var divisionHeight=300
var play,end
var gamestate='play'
var score=0
var turn=0
var particle
function setup() {
  createCanvas(480,800);
  engine = Engine.create();
  world = engine.world;
ground=new Ground(240,790,480,20)
for(var k=0;k<=width;k=k+80){
divisions.push(new Division(k,height-divisionHeight/2-15,10,divisionHeight))
}

for (var j=0;j<=width;j=j+50){
  plinkos.push(new Plinko(j,75))
}
for (var j=40;j<=width;j=j+50){
  plinkos.push(new Plinko(j,175))
}
for (var j=15;j<=width;j=j+50){
  plinkos.push(new Plinko(j,275))
}
for (var j=40;j<=width;j=j+50){
  plinkos.push(new Plinko(j,375))
}
mouseReleased()
}

function draw() {
  background(0,0,0);  
  Engine.update(engine);
  if(gamestate!=='end'){
    textSize(20);
    fill("white")
    text("SCORE:"+score,675,40)
    if(particle!==null){
      particle.display()
      if(particle.body.position.y>760&&particle.body.position.x>0&&particle.body.position.x<800){
      if(particle.body.position.x<=240){
        score+=500
        particle=null
      }else if(particle.body.position.x<600){
        score+=100
        particle=null
      }else{
        score+=200
        particle=null
      }
      turn++
      }
    }
    if(turn>=5){
      gamestate='end'
    }
  }
  else{
    textSize(60)
    fill("red")
    text("GAME OVER",65,250)
    text("score is:"+score,110,350)
  }
  textSize(25)
  text("score:"+score,20,50)
  text("500",15,525)
  text("500",95,525)
  text("500",175,525)
  text("100",255,525)
  text("100",335,525)
  text("100",415,525)
  text("100",495,525)
  text("200",575,525)
  text("200",655,525)
  text("200",735,525)
  text("turn:"+turn,350,50)
  /*if(frameCount%30===0){
    particle=new Particle(random(width/2-30,width/2+30),10,10)
    particles.push(particle)
  }*/
  ground.display()
  if(particle){
    particle.display()
  }
  for(var k=0;k<divisions.length;k++){
    divisions[k].display()
  }

  for(var i=0;i<plinkos.length;i++){
    plinkos[i].display()
  }
  drawSprites();
}
function mouseReleased(){
  if(gamestate!=='end'){
    particle=new Particle(mouseX,10,10,10)
  }
}