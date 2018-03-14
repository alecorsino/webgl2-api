import {ShaderProgram} from 'webgl2/shaders/shaderProgram.js';
import WebglDataBuffer from './webglDataBuffer.js'

import {glMatrix, mat4, vec3, quat} from 'gl-matrix'


export const DRAW_ELEMENTS = 'DRAW_ELEMENTS'
export const DRAW_ARRAYS = 'DRAW_ARRAYS'

export class Model {
  constructor(gl, mesh){
    this.gl = gl;
    this.shaderProgram;
    this.vao;
    this.mesh = mesh;
    this.drawMode = gl.TRIANGLES;//gl.TRIANGLES;//gl.LINE_LOOP //gl.LINE_STRIP  //DEFAULT TODO needs imput from user
    this.drawType =  DRAW_ELEMENTS; //DRAW_ARRAYS; 
    this.verticesData = [];
    
    this.indicesData = [];
    
    this.transMatrix = mat4.create();
    this.setupBuffers();

  }

  /**
   * 
   * @param {Array} rotationAxis 3d axis vector orientation
   * @param {number} angle Angle in degrees. Is used in combination with rotationAxis
   * @param {Array} position 3d vector x,y,z translation.
   * @param {Array} scale 3d vector x, y, z. 
   */
  transform(rotationAxis, angle, position, scale) {
    mat4.fromRotationTranslationScale(
      this.transMatrix,
      quat.setAxisAngle([0,0,0,0],rotationAxis,glMatrix.toRadian(angle)),
      position,
      scale );
    // Modify one by one and then mutliply matrices
    // model = mat4.fromTranslation( model, vec3.fromValues(-2.0, -3.0, 1.0));
    // model = mat4.fromRotation(model, glMatrix.toRadian(145),vec3.fromValues(0, 1, 0));
    // model = mat4.fromScaling(model, vec3.fromValues(2,2,2));
  }

  setProgram(program) {
    this.shaderProgram = program;
  }

  /**
   * Setup VAO and VBOs
   * @param {*} gl 
   */
  setupBuffers(gl = this.gl){

    this.vao = WebglDataBuffer.setupVAO(this.mesh.vertices, this.mesh.indices, gl)
    ;	

  }
}