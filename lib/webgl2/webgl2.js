import {createCanvas, setCanvasSize} from '../dom.js';
import {rgbaToFloat, byteToFloat, ClassMixin} from '../util';

import {createProgram} from './program.js';
import {Shader, DefaultVertexShader, DefaultFragmentShader } from './shader.js';
import {Program} from './program.js'

import Model, {DRAW_ARRAYS,DRAW_ELEMENTS} from './model.js';



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

    
    // let vShader = new Shader(gl.VERTEX_SHADER, DefaultVertexShader, gl);
    // let fs = Shader.createShader(gl.FRAGMENT_SHADER, DefaultFragmentShader, gl);

    // let program = new Program(vShader.shader, fs, gl);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // Clear the canvas
    // gl.clearColor(byteToFloat(218),byteToFloat(85),byteToFloat(186), 1);
    gl.clearColor(...rgbaToFloat(128,255,255), 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // this.aModel.setShadersProgram(program)
    // this.render(this.aModel);
  }

  render(stage, gl = this.gl) {
    stage.models.forEach((m)=>{
      gl.useProgram(m.program);
      gl.bindVertexArray(m.vao);
      if (m.drawType == DRAW_ARRAYS){
        gl.drawArrays(m.drawMode, 0, m.verticesData.length/3);
      }else {
        gl.drawElements(m.drawMode, m.indicesData.length, gl.UNSIGNED_SHORT, 0);
      }
    })
    
  }
  // render(model, gl = this.gl) {
  //   gl.useProgram(model.program);
  //   gl.bindVertexArray(model.vao);
  //   if (model.drawType == DRAW_ARRAYS){
  //     gl.drawArrays(model.drawMode, 0, model.verticesData.length/3);
  //   }else {
  //     gl.drawElements(model.drawMode, model.indicesData.length, gl.UNSIGNED_SHORT, 0);
  //   }
  // }

  setCanvasSize(width, height, gl = this.gl){
    setCanvasSize(width, height, gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  }

  activateProgram(program, gl = this.gl) {
    gl.useProgram(program);
  }



  

}

// ClassMixin (WebGL2.prototype, {createProgram, createShader});
