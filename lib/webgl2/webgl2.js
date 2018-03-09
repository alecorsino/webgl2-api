import {createCanvas, setCanvasSize} from '../dom.js';
import {rgbaToFloat, byteToFloat, ClassMixin} from '../util';

import {ShaderProgram} from './shaderProgram.js'

import {Model, DRAW_ARRAYS,DRAW_ELEMENTS} from './model.js';

import {glMatrix, mat4} from 'gl-matrix'



export class WebGL2 {
  
  constructor(canvasElement = createCanvas()){

    this.gl = canvasElement.getContext('webgl2');
    this.width = canvasElement.width;
    this.height = canvasElement.height;
    // this.aModel =  new Model(this.gl);

    if (!this.gl) {
      throw new Error('Could Not create WEBGL2 context')
    }
  }


  init (gl = this.gl) {

    // Clear the canvas
    this.setSize(this.width,this.height);
    gl.clearColor(...rgbaToFloat(128,255,255), 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  }

  render(stage, gl = this.gl) {
    stage.models.forEach((m)=>{
      gl.useProgram(m.program); //TODO Group Models by Shaders
      gl.bindVertexArray(m.vao);
      if (m.drawType == DRAW_ARRAYS){
        gl.drawArrays(m.drawMode, 0, m.verticesData.length/3);
      }else {
        gl.drawElements(m.drawMode, m.indicesData.length, gl.UNSIGNED_SHORT, 0);
      }
    })
    
  }
 

  setSize(width, height){
    setCanvasSize(width, height, this.gl.canvas);
    this.gl.viewport(0, 0, this.gl.canvas.clientWidth, this.gl.canvas.clientHeight);
  }



  

}

// ClassMixin (WebGL2.prototype, {createProgram, createShader});
