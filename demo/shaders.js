const vsCode = `#version 300 es
 
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
layout (location = 0) in vec3 a_position;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
// all shaders have a main function

void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = projection * view * model * vec4(a_position, 1.0);
}
`;

const fsCode = `#version 300 es

precision mediump float;
 
// we need to declare an output for the fragment shader
out vec4 outColor;
// varying vec4 pos;
 
void main() {
  // Just set the output to a constant redish-purple
  // if (gl_FragCoord.x < 0.1 ) {
  //     outColor = vec4(0,0.5 , 0, 1);
  // }else {
  //   outColor = vec4(0.5,0.5 , 0.5, 1);
  // }

  outColor = vec4(0.5,0.5 , 0.5, 1);
  
}
`