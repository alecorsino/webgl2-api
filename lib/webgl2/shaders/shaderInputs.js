import {capitalize} from 'util/index';

/**
 * Offline Static Shader parsing analysis to get uniforms declarations from source code
 * @param {string} vsSource 
 * @param {string} fsSource 
 */
export const getUniforms = (vsSource, fsSource, gl, program) => {
  let vslines = vsSource.split('\n');
  let fslines = fsSource.split('\n');
  let uniforms = {
    gl,
    program,
    list:[]
  };

  parseLines(vslines, uniforms);
  parseLines(fslines, uniforms);

  return uniforms;
}



/**
 * GL Type mapping to GL uniform setters function
 * //TODO: Multiple setter can exist for same uniform type
 * 
 */
const TYPES = new Map();
TYPES.set('mat2','uniformMatrix2fv'); 
TYPES.set('mat3','uniformMatrix3fv'); 
TYPES.set('mat4','uniformMatrix4fv'); 

TYPES.set('vec2','uniform2fv'); 
TYPES.set('vec3','uniform3fv'); 
TYPES.set('vec4','uniform4fv'); 



const uniformRegex = /uniform (\w+) (\w+)/;


const parseLines = (lines, uniforms) => {
  lines.forEach(l => {
    let u = uniformRegex.exec(l);
    
    if (u){

      let [,uType,uName] = u;

      uniforms.list.push(
        {
         name: capitalize(uName),
         location: function(){
          return uniforms.gl.getUniformLocation(uniforms.program, uName)
         }
        })
      
        //Create Setters
      let setter = `set${capitalize(uName)}`;
      let uLoc = uniforms.gl.getUniformLocation(uniforms.program, uName);
      
      if (!uniforms[setter]){
        //Same Uniform can be declared on both shaders. Ignore the second
        uniforms[setter] = (...args) => {uniforms.gl[`${TYPES.get(uType)}`](uLoc, ...args)};
      }

    }
  });
}

/**
 * Get Uniforms actually beign used in the shader. 
 * Analize compiled shader Program.
 * @param {WEBGL} gl WebGL context
 * @param {*} program compiled shader program
 */
export const getActiveUniforms = (gl, program) => {
  let numUni = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  let uniformsNames = [];
  for(let i = 0; i < numUni; i++){
    //Type is a number. It should be compared with every type to determine the Type Name. 
    //i.e GL_FLOAT === info.type 
    let info = gl.getActiveUniform(program, i )
    uniformsNames.push( info.name);
  }

  return uniformsNames;
}

const s = `#version 300 es
 

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
`



// let u = getUniforms(s);
// console.log('[UNIFORMS]', u);
// u.setModel()
