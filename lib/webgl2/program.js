import {delayJob} from '../util';

export class Program {
  constructor(vertexShader, fragmentShader, gl){
    this.gl = gl;
    this.program = Program.createProgram(vertexShader, fragmentShader, gl);
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
}



