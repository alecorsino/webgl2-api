document.addEventListener("DOMContentLoaded", 
  function (){

  console.log('[INIT]')
  let canvas = Flick.createCanvas('Mycanvas', '500px','500px');
  document.body.appendChild(canvas);
  let wgl = new Flick.WebGL2(canvas);
  
  let vs = new Flick.Shader(Flick.VERTEX_SHADER, vsCode, wgl.gl);
  let fs = new Flick.Shader(Flick.FRAGMENT_SHADER, fsCode, wgl.gl);
  let program = new Flick.Program(vs.shader, fs.shader, wgl.gl);
  console.log('[FLICK - WebGL2]',program)

  window.wgl = wgl;

  let m1 = new Flick.Model(wgl.gl);
  m1.setProgram(program);
  
  m1.verticesData =
  [
    0.5,  0.5, 0.0,  // top right
    0.5, -0.5, 0.0,  // bottom right
    -0.5, -0.5, 0.0,  // bottom let
    -0.5,  0.5, 0.0 
  ];
  
  m1.indicesData = 
  [
    0, 1, 3,   // first triangle
    1, 2, 3    // second triangle
  ];
  m1.setupBuffers();

  let m2 = new Flick.Model(wgl.gl);
  m2.setProgram(program);
  
  m2.verticesData =
  [
    0,  0.3, 0.0,  // top right
    0.7, -0.5, 0.0,  // bottom right
    -0.5, -0.5, 0.0,  // bottom let
    -0.5,  0.5, 0.0 
  ];
  
  m2.indicesData = 
  [
    0, 1, 3,   // first triangle
    1, 2, 3    // second triangle
  ];
  m2.setupBuffers();
  
  let stage = new Flick.Stage();
  // stage.addModel(m1);
  stage.addModel(m2);
  wgl.init();
  wgl.render(stage)




});
