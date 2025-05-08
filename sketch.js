let video
let poseNet
let pose
let movers = []
let attractors = []//核心
let emitter = [];


function mousePressed() {
  emitters.push(new Emitter(mouseX, mouseY));
}


function setup() {


//鏡頭
  createCanvas(windowWidth,windowHeight)
noFill()
//noCanvas()
video = createCapture(VIDEO)
//video.hide()
video.size(windowWidth,windowHeight)
asciiDiv = createDiv()
poseNet = ml5.poseNet(video, modelLoaded)
poseNet.on('pose', gotPoses)





for (let i = 0; i < 100; i++) {
  let x = random(width)
  let y = random(height)
  let m = random(50, 150)
movers[i] = new Mover(x, y, m)
}
attractor = new Attractor(width / 2, height / 2, 100)
//  attractors.push(a);


//  background(0);


//attractor = new Attractor(200,200,5)







}


function gotPoses(poses){
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
}
}


function modelLoaded(){
  console.log('ready')
}


function draw() {
  //鏡頭
  
  //image(video, 0, 0);
  //console.log(poses)
  if(pose){
    var NX = pose.nose.x
    var NY = pose.nose.y
    //let wristL = pose.leftWrist
    //fill(N.x/2,N.y/2,0)
    //r = pose.nose.x;
  }
  
  var NX2 = windowWidth - NX
  //console.log(NX)
//  fill(NX/2,NY/2,0)
//  ellipse(windowWidth-NX,NY ,60);
  


//movers.update()
//movers.show()


//attractors.attract(attractors)
//attraction(movers,attractors)


//attractors.show


for (let mover of movers) {
  mover.update()
  mover.show()
  attractor.attract(mover)
}
if (NX>0) {
  attractor.pos.x = NX
  attractor.pos.y = NY
  attractor.fill = (NX/2,NY/2,0)
  
}
attractor.show();


}



