import {ShaderProgram} from 'webgl2/shaders/shaderProgram.js';


export default class WebglDataBuffer {
   /**
   * Setup VAO and VBOs
   * @param {*} gl 
   */
  static setupVAO(verticesData, indicesData, gl){
    console.log('[SETTING UP VAO]');
    let vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // Vertices buffer
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesData), gl.STATIC_DRAW);
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
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesData), gl.STATIC_DRAW);

    // texture coord attribute
    // glEnableVertexAttribArray(ShaderProgram.ATTR_TEXTURE_COORD_LOC);
    // glVertexAttribPointer(
    //   ShaderProgram.ATTR_TEXTURE_COORD_LOC,
    //   2, GL_FLOAT, GL_FALSE, 8 * sizeof(float), (void*)(6 * sizeof(float)));
    
           
    

    //Clean up
		gl.bindVertexArray(null);					  
		gl.bindBuffer(gl.ARRAY_BUFFER,null);	
    
    return vao;
  }
}