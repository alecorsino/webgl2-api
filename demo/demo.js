document.addEventListener("DOMContentLoaded", 
  function (){

  console.log('[INIT]')
  let c = Flick.createCanvas('Mycanvas', 500,500);
  document.body.appendChild(c);
  let screen = new Flick.WebGL2(c);
  
  let programCustom = new Flick.ShaderProgram(vsCode, fsCode, screen.gl);
  console.log('[FLICK - WebGL2]',programCustom)

  // window.wgl = screen;

  let m1 = new Flick.Model(screen.gl);
  m1.setProgram(programCustom);
  let cubeMesh = Flick.WavefrontParser.parse(cube);
  
  m1.verticesData = cubeMesh.vertices;
  m1.indicesData = cubeMesh.indices;
  m1.setupBuffers();

  let m2 = new Flick.Model(screen.gl);
  
  let programDefault = new Flick.ShaderProgram(Flick.DefaultVertexShader, Flick.DefaultFragmentShader, screen.gl);
  m2.setProgram(programDefault);
  
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
  stage.addModel(m1);
  stage.addModel(m2);
  // screen.setSize(window.innerWidth, window.innerHeight);
  screen.init();
  screen.render(stage)




});
