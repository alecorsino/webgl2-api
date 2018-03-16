import {ShaderProgram} from 'webgl2/shaders/shaderProgram.js';


export default class WebglDataBuffer {
   /**
   * Setup VAO and VBOs
   * @param {*} gl 
   */
  static setupVAO(mesh, gl){
    let vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // Vertices buffer
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.elements), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(ShaderProgram.ATTR_POSITION_LOC);
    gl.vertexAttribPointer(
      ShaderProgram.ATTR_POSITION_LOC,
        3,          //num of component per vertex
        gl.FLOAT,   //type
        false,      //normalize data
        mesh.elementSize * 4,          // 0 = move forward size * sizeof(type) each iteration to get the next position // Number of element * size of type
        0)          //Start at the beginning of the buffer
    
    // Index buffer
    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.elementIndices), gl.STATIC_DRAW);

    // texture coord attribute
    // let texcoordeBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, texcoordeBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesData), gl.STATIC_DRAW);
    // glEnableVertexAttribArray(ShaderProgram.ATTR_TEXTURE_COORD_LOC);
    // glVertexAttribPointer(
    //   ShaderProgram.ATTR_TEXTURE_COORD_LOC,
    //   2, GL_FLOAT, true, 0, 0);
    
           
    

    //Clean up
		gl.bindVertexArray(null);					  
		gl.bindBuffer(gl.ARRAY_BUFFER,null);	
    
    return vao;
  }
}