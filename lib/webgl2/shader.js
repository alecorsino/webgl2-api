import {delayJob} from '../util';

import DVShader from './shaders/DefaultVShader.vs'
import DFShader from './shaders/DefaultFShader.fs'

export const DefaultVertexShader = DVShader;
export const DefaultFragmentShader = DFShader;

export const VERTEX_SHADER = WebGL2RenderingContext.VERTEX_SHADER;
export const FRAGMENT_SHADER = WebGL2RenderingContext.FRAGMENT_SHADER;



export class Shader {

  static get ATTR_POSITION_LOC() { return 0};

  constructor(type, source, gl){
    this.gl = gl;
    this.shader = Shader.createShader(type, source, gl);
  }
  /**
 * Static shader factory
 * @param {Shader Type} type WebGL2RenderingContext.VERTEX_SHADER | WebGL2RenderingContext.FRAGMENT_SHADER
 * @param {String} source GL Shading Language code
 * @param {WebGL2RenderingContext} gl Webgl canvas context.
 * 
 * @returns {WebGLShader}
 */
  static createShader(type, source, gl){
    
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    
    if (success) {
      return shader;
    }
    
    
    delayJob((gl, shader) => gl.deleteShader(shader), gl, shader);
    throw new Error(gl.getShaderInfoLog(shader));
  }
}