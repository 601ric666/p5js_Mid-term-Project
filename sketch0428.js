//const r = 100
const n = 15
let hist, angle,r


function setup() {
 createCanvas(windowWidth,windowHeight)
 //angleMode(DEGREES)
 
 hist = [] 
 r = 0
 angle = 0
 background(0)
}

function draw() {
  const x = cos(angle)*r
  const y = sin(angle)*r
  hist.push({x,y}) 
  r += 0.2
  angle += 0.1
  
  if(hist.length > n){
    hist.shift()
  }
  
  clear()
  //stroke(240);
  noFill();
  translate(width/2,height/2)

  let prev = hist[0]
  
  
  for(let i = 0;i<hist.length;i++){
    //const angle = (360 / n )* i
    const cur = hist[i]
    line(prev.x,prev.y,cur.x,cur.y)
    prev = cur


    //const w = map(sin(angle + 0.2*i),-1,1,1,20)
    //strokeWeight(w)

    //circle(0,0,i*40)

  }
  //angle +=0.02
}
