#version 300 es

layout (location = 0) in vec3 a_position;
layout (location = 2) in vec2 a_texCoord;

out vec2 TexCoord; 

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
 
void main() {
 
  gl_Position = projection * view * model * vec4(a_position, 1.0);
  TexCoord = a_texCoord;
}