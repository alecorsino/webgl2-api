#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision"
precision mediump float;
 
// we need to declare an output for the fragment shader
in vec2 v_texCoord;
in vec3 v_normal;

out vec4 outColor;
 
uniform vec3 u_reverseLightDirection;
uniform vec4 u_color;

uniform sampler2D u_texture;
 
void main() {
  // Just set the output to a constant redish-purple
  // outColor = vec4(1, 0, 0.5, 1);
  outColor = texture(u_texture, v_texCoord);

  vec3 normal = normalize(v_normal);
 
  float light = dot(normal, u_reverseLightDirection);
 
  // outColor = u_color;
 
  outColor.rgb *= light ;
}
