import {createCanvas, setCanvasSize} from '../dom.js';
import {rgbaToFloat, byteToFloat, ClassMixin} from '../util';

import {ShaderProgram} from './shaderProgram.js'

import {Model, DRAW_ARRAYS,DRAW_ELEMENTS} from './model.js';

import {glMatrix, mat4, vec3, quat} from 'gl-matrix'

glMatrix.setMatrixArrayType(Float32Array)

export class WebGL2 {
  
  constructor(canvasElement = createCanvas()){

    this.gl = canvasElement.getContext('webgl2');
    this.width = canvasElement.width;
    this.height = canvasElement.height;

    this.view = mat4.create();
    this.lookAt(10,10,10);
    this.projection = mat4.create();
    mat4.perspective(this.projection, glMatrix.toRadian(45), this.width/this.height, 0.1, 100)
    
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

  lookAt(x,y,z) {
    mat4.lookAt(this.view, vec3.fromValues(x,y,z),vec3.fromValues(0,0,0),vec3.fromValues(0,1,0));
    
  }
  render(stage, gl = this.gl) {
    // let model = mat4.create();
    

    gl.clearColor(...rgbaToFloat(128,255,255), 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   
   
    // ShaderProgram.setMVP(transMatrix, viewMatrix, projectionMatrix)
    stage.models.forEach((m)=>{
      gl.useProgram(m.shaderProgram.program); //TODO Group Models by Shaders
      
      let u_modelLoc = gl.getUniformLocation(m.shaderProgram.program, 'model')
      gl.uniformMatrix4fv(u_modelLoc, false, m.transMatrix);
      
      let u_viewLoc = gl.getUniformLocation(m.shaderProgram.program, 'view')
      gl.uniformMatrix4fv(u_viewLoc, false, this.view);
      
      let u_projectionlLoc = gl.getUniformLocation(m.shaderProgram.program, 'projection')
      gl.uniformMatrix4fv(u_projectionlLoc, false, this.projection);
      
      gl.bindVertexArray(m.vao);
      if (m.drawType == DRAW_ARRAYS){
        gl.drawArrays(m.drawMode, 0, m.mesh.vertices.length/3);
      }else {
        gl.drawElements(m.drawMode, m.mesh.indices.length, gl.UNSIGNED_SHORT, 0);
      }
    })
    
  }
 

  setSize(width, height){
    setCanvasSize(width, height, this.gl.canvas);
    this.gl.viewport(0, 0, this.gl.canvas.clientWidth, this.gl.canvas.clientHeight);
  }



  

}

// ClassMixin (WebGL2.prototype, {createProgram, createShader});
