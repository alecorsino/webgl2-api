import {delayJob} from 'util';
import {Shader} from 'webgl2/shaders/shader.js';
import {getUniforms, getActiveUniforms} from './shaderInputs.js'

export class ShaderProgram {
  static get ATTR_POSITION_LOC() { return 0};
  static get ATTR_NORMAL_LOC() { return 1};
  static get ATTR_TEXTURE_COORD_LOC() { return 2};

  constructor(vertexShaderSrc, fragmentShaderSrc, gl){
    this.gl = gl;
    this.vs = Shader.createShader(gl.VERTEX_SHADER, vertexShaderSrc, gl);
    this.fs = Shader.createShader(gl.FRAGMENT_SHADER, fragmentShaderSrc, gl);
    this.program = ShaderProgram.createProgram(this.vs, this.fs, gl);
    this.uniforms = getUniforms(vertexShaderSrc, fragmentShaderSrc, gl, this.program);
    
    
  }
  /**
   * Creates a GL Program form shaders sources.
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

   getCurrentProgram(gl = this.gl) {
    return gl.getParameter(gl.CURRENT_PROGRAM);
  }

   setMVP(transMatrix, viewMatrix, projectionMatrix){
      
    // let u_modelLoc = gl.getUniformLocation(m.program, 'model')
    // gl.uniformMatrix4fv(u_modelLoc, false, m.transMatrix);
    this.uniforms.setModel(false, transMatrix);
    
    // let u_viewLoc = gl.getUniformLocation(m.program, 'view')
    // gl.uniformMatrix4fv(u_viewLoc, false, viewMatrix);
    this.uniforms.setView(false, viewMatrix);
    
    // let u_projectionlLoc = gl.getUniformLocation(m.program, 'projection')
    // gl.uniformMatrix4fv(u_projectionlLoc, false, projectionMatrix);
    this.uniforms.setProjection( false, projectionMatrix);
    
    // let ouColorlLoc = gl.getUniformLocation(m.shaderProgram.program, 'ourColor')
    // gl.uniform4fv(ouColorlLoc, [1.0,0.5,0.5,1.0]);
    
  }
}



