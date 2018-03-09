document.addEventListener("DOMContentLoaded", 
  function (){

  console.log('[INIT]')
  let c = Flick.createCanvas('Mycanvas', 1000,600);
  document.body.appendChild(c);
  let screen = new Flick.WebGL2(c);
  
  let programCustom = new Flick.ShaderProgram(vsCode, fsCode, screen.gl);
  let programDefault = new Flick.ShaderProgram(Flick.DefaultVertexShader, Flick.DefaultFragmentShader, screen.gl);
  console.log('[FLICK - WebGL2]',programCustom)

  // window.wgl = screen;

  let m1 = new Flick.Model(screen.gl);
  m1.setProgram(programDefault);
  let cubeMesh = Flick.WavefrontParser.parse(cube);
  let planeMesh = Flick.WavefrontParser.parse(plane);
  m1.verticesData = cubeMesh.vertices;
  m1.indicesData = cubeMesh.indices;
  m1.setupBuffers();

  m1.transform([0,0,0], 0, [0,0,0], [1,1,1]);
  
  let m2 = new Flick.Model(screen.gl);
  
  m2.setProgram(programCustom);
  
  m2.verticesData = planeMesh.vertices;
  m2.indicesData = planeMesh.indices;
  m2.transform([0,0,0], 0, [0,0,0], [4,1,4]);
  
  m2.setupBuffers();
  
  let stage = new Flick.Stage();
  stage.addModel(m2);
  stage.addModel(m1);
  // screen.setSize(window.innerWidth, window.innerHeight);
  screen.init();
  screen.render(stage)

  c.addEventListener("mousemove", function( event ) {
    // store a ref. on the dragged elem
    let x = event.screenX;
    let y = event.screenY;
    // console.log('[MOUSE]', x,':',y);
    // m1.transform([0,0,0], 0, [x/100,-y/100,0], [1,1,1]);
    // screen.lookAt(Math.sin(x/100),10, Math.cos(y/100));
    // screen.render(stage)
}, false);

let x = 0;
let r = 10; 
let prevFrame = performance.now();
const draw = (timestamp)=>{
   // console.log('[INTERVAL]',x);
  if((timestamp - prevFrame) >16){
    prevFrame = timestamp;
    x+=.01;
   screen.lookAt(r * Math.cos(x),r, r * Math.sin(x));
  //  screen.lookAt(r,r * Math.sin(x), r * Math.cos(x));
   screen.render(stage)
  }
  requestAnimationFrame(draw)
   
}
requestAnimationFrame(draw)

//   document.addEventListener("mousemove", function( event ) {
//     // store a ref. on the dragged elem
//     dragged = event;
//     console.log('[MOUSE]', dragged);
//     // m1.transform([0,0,0], 0, [-7,-5,0], [1,1,1]);
// }, false);



});
