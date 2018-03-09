import {ShaderProgram} from './shaderProgram.js';

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
    // [
    // 0.5,  0.5, 0.0,  // top right
    //  0.5, -0.5, 0.0,  // bottom right
    // -0.5, -0.5, 0.0,  // bottom let
    // -0.5,  0.5, 0.0 
    // ];

    this.indicesData = [];
    // [
    //   0, 1, 3,   // first triangle
    // 1, 2, 3    // second triangle
    // ]

    // this.setupBuffers();

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