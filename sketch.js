var solo, nuvem, nuvemimage, nuvemgroup
var rex, reximage, rexcollideimg
var obs1, obs2, obs3, obs4, obs5, obs6, grupodeobs
var chao, chaoimg
var gameover, gameimg
var reset, resetimg
var somorte, somsalto
var jogar
var estadodejogo=jogar
var estadodejogo=perder
var perder=0
var placar=0

function preload() {
 
  // IMAGENS DA ANIMAÇÃO DO TREX
reximage=loadAnimation("trex1.png", "trex3.png", "trex4.png")
  // IMAGEM DE TROCA DE ANIMAÇÃO DO TREX QUANDO COLLIDE COM OBSTACULOS
 rexcollideimg=loadImage("trex_collided.png")
  
  // IMAGEM DAS NUVENS
  nuvemimage=loadImage("cloud.png")
  //IMAGEM DO CHÃO 
   chaoimg=loadImage("ground2.png")
  
  // IMAGENS DOS OBSTACULOS 
   obs1=loadImage("obstacle1.png")
   obs2=loadImage("obstacle2.png")
   obs3=loadImage("obstacle3.png")
   obs4=loadImage("obstacle4.png")
   obs5=loadImage("obstacle5.png")
   obs6=loadImage("obstacle6.png")
  
  // IMAGENS GAME OVER E RESET
   gameimg=loadImage("gameOver.png")
   resetimg=loadImage("restart.png")
  
  // SONS DE SALTO E MORTE
   somorte=loadSound("morte.mp3")
   somsalto=loadSound("jump.mp3")
}

function setup() {
  
  createCanvas(600,200)
  
 // CRIAÇÃO DO SPRITE DO TREX
  rex=createSprite(50,180,20,50)
  rex.addAnimation("running", reximage)
  rex.addAnimation("collided", rexcollideimg)
  rex.scale=0.6
  
  // CRIAÇÃO DO SPRITE "SOLO INVISIVEL (COLLIDE)"
  solo=createSprite(200,190,400,10)
  solo.visible=false
  
  // CRIAÇÃO DO SPRITE DO CHÃO 
  chao=createSprite(200,180, 400,20)
  chao.addImage(chaoimg)
  
  // CRIAÇÃO DO SPRITE DO GAME OVER
  gameover=createSprite(300,100, 40,40)
  gameover.addImage(gameimg)
  gameover.scale=0.5
  
  
  
  // CRIAÇÃO DO SPRITE DO BOTÃO RESET
  reset=createSprite(300,50, 40, 40)
  reset.addImage(resetimg)
  reset.scale=0.4
 
  
  
  // CONFIGURANDO OS GRUPOS DAS FUNÇÕES
  grupodeobs=createGroup()
  nuvemgroup=createGroup()

 // rex.setCollider ("circle", 0, 0, 35) 
  rex.setCollider ("rectangle", 60, 0, 150, 50, 180)
  rex.debug=true
}

function draw() {
  
  background("white")
  
  textSize (16)
  text ("placar "+placar, 500, 25)
 
  
  // INICIO DO JOGO 
  if(estadodejogo===jogar) {
  // FAZER O TREX SALTAR COM A TECLA "SPACE"
  if (keyDown ("space") && rex.y>=100) {
    rex.velocityY=-8 
    somsalto.play()  
  }
     chao.velocityX=-(6 + placar/100)
    
     gameover.visible = false
    reset.visible = false
    
    placar=placar+Math.round(getFrameRate() / 60)
    
    // ATRIBUINDO GRAVIDADE AO TREX
    rex.velocityY=rex.velocityY+0.8  
    
    // TREX COLLIDE COM SOLO INVISIVEL  
    rex.collide(solo)
    
   // EXTENSÃO DA IMAGEM CHÃO 
  if(chao.x<0) {
    chao.x=chao.width/2
  }
    console.log ("oi")
  // DEFININDO/DESENHANDO A FUNÇÃO "NUVENS" PARA GERAR IMAGENS 
  nuvens()
    
 // DEFININDO/DESENHANDO A FUNÇÃO "GERAROBJETOS" PARA GERAR OS OBSTACULOS 
  gerarobstaculos() 
    
  if(grupodeobs.isTouching(rex)) {
    // estadodejogo=perder;
    rex.velocityY = -10
    // COLOCAR MUDANÇA DE ANIMAÇÃO
   // somorte.play()
    
  }
  }
  
  
  
  if (estadodejogo===perder){
    chao.velocityX=0
    rex.velocityY=0
    rex.changeAnimation("collided", rexcollideimg)
  
    gameover.visible = true
    reset.visible = true
    
    grupodeobs.setLifetimeEach(-1)
    nuvemgroup.setLifetimeEach(-1)
    
    // REDEFININDO A VELOCIDADE DE CADA GRUPO
    grupodeobs.setVelocityXEach(0) 
    nuvemgroup.setVelocityXEach(0)
    
      if (mousePressedOver(reset)){
        console.log ("reiniciar")
         reiniciar ()
      }
    
  }
  
  drawSprites()
  }
    

function reiniciar (){
  estadodejogo = jogar
  reset.visible = false
  gameover.visible = false
  rex.changeAnimation ("running", reximage)
  grupodeobs.destroyEach ();
  nuvemgroup.destroyEach ();
  placar=0
}

  
function nuvens() {
  console.log ("nuvens")
  if(frameCount%75===0) {
  nuvem=createSprite(600,100, 40,10)
  nuvem.y=Math.round(random(10,90))
  nuvem.addImage(nuvemimage)
  nuvem.scale=0.7
  nuvem.velocityX= -3 
  nuvem.depth=rex.depth
  rex.depth=rex.depth+1
  nuvemgroup.add(nuvem) 
  nuvem.lifetime = 180
  }
}
  
  function gerarobstaculos() {
    console.log ("obs")
    if(frameCount%60===0) {
      var obstaculo=createSprite(650,165, 10,40)
      obstaculo.velocityX=-(6 + placar/100)
      var obscase=Math.round(random(1,6))
      switch(obscase){
          case 1:
         obstaculo.addImage(obs1)
          break;
          
          case 2:
         obstaculo.addImage(obs2)
          break;
          
          case 3:
         obstaculo.addImage(obs3)
          break;
          
          case 4:
         obstaculo.addImage(obs4)
          break;
          
          case 5:
         obstaculo.addImage(obs5)
          break;
          
          case 6:
         obstaculo.addImage(obs6)
          break; }
      
     obstaculo.scale=0.5 
      grupodeobs.add(obstaculo)
      obstaculo.lifetime = 180
  }
    
}