#version 300 es
 
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