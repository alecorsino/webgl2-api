#version 300 es

layout (location = 0) in vec3 a_position;
layout (location = 1) in vec3 a_normal;
layout (location = 2) in vec2 a_texcoord;

out vec2 texCoord; 

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
 
void main() {
 
  gl_Position = projection * view * model * vec4(a_position, 1.0);
  texCoord = a_texcoord;
}