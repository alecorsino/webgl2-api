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
    
    //Normal
    gl.enableVertexAttribArray(ShaderProgram.ATTR_NORMAL_LOC);
    gl.vertexAttribPointer(
      ShaderProgram.ATTR_NORMAL_LOC,
      3, gl.FLOAT, false, mesh.elementSize * 4, 3 * 4 ); //4 Bytes is the size of a Float
        
   
    // Index buffer
    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.elementIndices), gl.STATIC_DRAW);

   if (mesh.texture){

          // texture coord attribute
    // let texcoordBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.enableVertexAttribArray(ShaderProgram.ATTR_TEXTURE_COORD_LOC);
    gl.vertexAttribPointer(
      ShaderProgram.ATTR_TEXTURE_COORD_LOC,
      2, gl.FLOAT, true, mesh.elementSize * 4, 6 * 4 ); //4 Bytes is the size of a Float
    
      // Create a texture.
      let texture = gl.createTexture();

      // use texture unit 0
      gl.activeTexture(gl.TEXTURE0 + 0);

      // bind to the TEXTURE_2D bind point of texture unit 0
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mesh.texture);
      // gl.pixelStorei(gl.UNPACK_ALIGNMENT, 8);
      console.log('[MESH]',mesh);
      
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, mesh.texture.width, mesh.texture.height, 0, gl.RGBA, gl.UNSIGNED_BYTE,mesh.texture);
      // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
      gl.generateMipmap(gl.TEXTURE_2D);
   }
  
           
    

    //Clean up
		gl.bindVertexArray(null);					  
		gl.bindBuffer(gl.ARRAY_BUFFER,null);	
    
    return vao;
  }
}