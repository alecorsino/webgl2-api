document.addEventListener("DOMContentLoaded", 
  function (){

  console.log('[INIT]')
  let c = Flick.createCanvas('Mycanvas', 1000,600);
  document.body.appendChild(c);
  let screen = new Flick.WebGL2(c);
  
  let programCustom = new Flick.ShaderProgram(vsCode, fsCode, screen.gl);
  let programDefault = new Flick.ShaderProgram(Flick.DefaultVertexShader, Flick.DefaultFragmentShader, screen.gl);

  let cubeMesh;
  let m1, m2;
  let stage = new Flick.Stage();

  

  // screen.setSize(window.innerWidth, window.innerHeight);
 

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

//TESTING WAVEFRONT
// Flick.WebLoader.loadMesh('waveTest.obj', 'wTest')
//   .then(res =>{
//         let wTest = Flick.WebLoader.getAsset('wTest')
//         cubeMesh = Flick.WavefrontParser.parse(wTest.data);
//   })

Flick.WebLoader.onReady( ()=>{
  console.log('[STARTING SCREEN]');
  screen.lookAt(10,10,10);
  let cubeObj = Flick.WebLoader.getAsset('cube')
  cubeMesh = Flick.WavefrontParser.parse(cubeObj.data);
  let tex = Flick.WebLoader.getAsset('MyLandscape')
  console.log('[TEXTURE]', tex); 
  cubeMesh.texture = tex.image;
  m1 = new Flick.Model(screen.gl, cubeMesh);
  
  
  
  m1.setProgram(programDefault);
  
  // m1.transform([0,0,0], 0, [0,0,0], [10,10,10]);
  stage.addModel(m1);

  let planeObj = Flick.WebLoader.getAsset('plane');
  let planeMesh = Flick.WavefrontParser.parse(planeObj.data);
 
 
  m2 = new Flick.Model(screen.gl, planeMesh);

m2.setProgram(programCustom);
m2.transform([0,0,0], 0, [0,0,0], [4,1,4]);

stage.addModel(m2);
    screen.init();
    screen.render(stage)
const draw = (timestamp)=>{
      // console.log('[INTERVAL]',x);
    if((timestamp - prevFrame) >16){
      prevFrame = timestamp;
      x+=1; (x===360)&& (x=0)
      
      m1.transform([0,1,0], x, [0,2,0], [2,2,2]);
    //  screen.lookAt(r * Math.cos(x),r, r * Math.sin(x));
    //  screen.lookAt(r,r * Math.sin(x), r * Math.cos(x));
      screen.render(stage)
    }
    requestAnimationFrame(draw)
      
  }
  
  requestAnimationFrame(draw)
});

Flick.WebLoader.loadImage('meadow.jpg', 'MyLandscape');


Flick.WebLoader.loadMesh('cube.obj', 'cube');
  
      
Flick.WebLoader.loadMesh('plane.obj', 'plane');
     


 
//   document.addEventListener("mousemove", function( event ) {
//     // store a ref. on the dragged elem
//     dragged = event;
//     console.log('[MOUSE]', dragged);
//     // m1.transform([0,0,0], 0, [-7,-5,0], [1,1,1]);
// }, false);



});
