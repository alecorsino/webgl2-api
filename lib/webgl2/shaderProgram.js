import {delayJob} from '../util';
import {Shader} from './shader.js';

export class ShaderProgram {
  static get ATTR_POSITION_LOC() { return 0};
  static get ATTR_TEXTURE_COORD_LOC() { return 2};

  constructor(vertexShaderSrc, fragmentShaderSrc, gl){
    this.gl = gl;
    this.vs = Shader.createShader(gl.VERTEX_SHADER, vertexShaderSrc, gl);
    this.fs = Shader.createShader(gl.FRAGMENT_SHADER, fragmentShaderSrc, gl);
    this.program = ShaderProgram.createProgram(this.vs, this.fs, gl);
  }
  /**
   * 
   * @param {WebGLShader} vertexShader Vertex Shader.
   * @param {WebGLShader} fragmentShader
   * @param {WebGL2RenderingContext} gl Default to this.gl to be used as a Class Mixin.
   * @returns {WebGLProgram} WebGLProgram.
   */
  static createProgram(vertexShader, fragmentShader, gl){
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return program;
    }
   
    delayJob((gl, program) => gl.deleteProgram(program), gl, program);;
    throw new Error(gl.getProgramInfoLog(program));
  }

  static setMVP(transMatrix, viewMatrix, projectionMatrix){
    gl.useProgram(m.program); //TODO Group Models by Shaders
      
    let u_modelLoc = gl.getUniformLocation(m.program, 'model')
    gl.uniformMatrix4fv(u_modelLoc, false, m.transMatrix);
    
    let u_viewLoc = gl.getUniformLocation(m.program, 'view')
    gl.uniformMatrix4fv(u_viewLoc, false, viewMatrix);
    
    let u_projectionlLoc = gl.getUniformLocation(m.program, 'projection')
    gl.uniformMatrix4fv(u_projectionlLoc, false, projectionMatrix);
  }
}



