import {ShaderProgram} from './shaderProgram.js';

import {glMatrix, mat4, vec3, quat} from 'gl-matrix'


export const DRAW_ELEMENTS = 'DRAW_ELEMENTS'
export const DRAW_ARRAYS = 'DRAW_ARRAYS'

export class Model {
  constructor(gl){
    this.gl = gl;
    this.program;
    this.vao;
    this.drawMode = gl.TRIANGLES;//gl.LINE_LOOP //gl.LINE_STRIP  //DEFAULT TODO needs imput from user
    this.drawType =  DRAW_ELEMENTS; //DRAW_ARRAYS; 
    this.verticesData = [];
    
    this.indicesData = [];
    
    this.transMatrix = mat4.create();
    // this.setupBuffers();

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
    this.program = program.program;
  }

  /**
   * Setup VAO and VBOs
   * @param {*} gl 
   */
  setupBuffers(gl = this.gl){
    console.log('[SETTING UP VAO]');
    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);

    // Vertices buffer
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verticesData), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(ShaderProgram.ATTR_POSITION_LOC);
    gl.vertexAttribPointer(
      ShaderProgram.ATTR_POSITION_LOC,
        3,          //num of component per vertex
        gl.FLOAT,   //type
        false,      //normalize data
        0,          // 0 = move forward size * sizeof(type) each iteration to get the next position
        0)          //Start at the beginning of the buffer
    
    // Index buffer
    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesData), gl.STATIC_DRAW);
    
           
    

    //Clean up
		gl.bindVertexArray(null);					  
		gl.bindBuffer(gl.ARRAY_BUFFER,null);	

  }
}