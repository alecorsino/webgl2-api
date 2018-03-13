#version 300 es
 
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
layout (location = 0) in vec3 a_position;
layout (location = 2) in vec2 a_texCoord;

out vec2 TexCoord; 

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
 
// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = projection * view * model * vec4(a_position, 1.0);
  TexCoord = a_texCoord;
}