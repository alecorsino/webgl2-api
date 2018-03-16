#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision"
precision mediump float;
 
// we need to declare an output for the fragment shader
in vec2 texCoord;
out vec4 outColor;

uniform sampler2D u_texture;
uniform vec4 ourColor;
 
void main() {
  // Just set the output to a constant redish-purple
  // outColor = vec4(1, 0, 0.5, 1);
  outColor = ourColor;
  // outColor = texture(u_texture, v_texcoord);
}
