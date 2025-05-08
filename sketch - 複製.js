let video
let poseNet
let pose
let movers = []
let attractors = []//核心
let emitter = [];


let particles = [];//數列
const num = 1000;//粒子數

const noiseScale = 0.01/2;

function setup() {
  
//鏡頭
createCanvas(windowWidth,windowHeight)
//noFill()
//noCanvas()
video = createCapture(VIDEO)
//video.hide()
video.size(windowWidth,windowHeight)
asciiDiv = createDiv()
poseNet = ml5.poseNet(video, modelLoaded)//動捕模型
poseNet.on('pose', gotPoses)

//for (let j = 0; j < 100; j++) {
//  let x = random(width)
//  let y = random(height)
//  let m = random(50, 150)
//movers[j] = new Mover(x, y, m)
//}
attractor = new Attractor(width / 2, height / 2, 100)


  for(let i = 0; i < num; i ++) {
    particles.push(createVector(random(width), random(height)));//隨機生成
  }
  
  stroke(255);
  // For a cool effect try uncommenting this line
  // And comment out the background() line in draw
  // stroke(255, 50);
  clear();
}

function gotPoses(poses){
//  console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
}
}

function modelLoaded(){
  console.log('ready')
}



function draw() {

  if(pose){
    var NX = pose.nose.x
    var NY = pose.nose.y
    var UNY = 255-NY

    var RHY = (pose.rightWrist.y)/2
    var URHY = 10-(pose.rightWrist.y-500)/100
    //var BRHXY = (RHX+RHY)/2

    //let wristL = pose.leftWrist
    fill(0,0,0)
    //r = pose.nose.x;
  }
  
  var NX2 =(( windowWidth - NX));
  var NX3 =(( windowWidth - NX)/30);

  background(0, 10);
  for(let i = 0; i < num; i ++) {
    let p = particles[i];
   
    circle(p.x, p.y,RHY);//隨機生成圓(黑)
    let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale);
    let a = TAU * n;
    p.x += cos(a)*URHY;
    p.y += sin(a)*URHY;//變化速度
    if(!onScreen(p)) {//假如不在畫布中
      p.x = random(width);
      p.y = random(height);//重新佈點
    }
  }
  fill(255,255,255)
    circle(NX2, NY,RHY)//白圈
}

function mouseReleased() {
  noiseSeed(millis());
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;//確認位置，在畫布內
}