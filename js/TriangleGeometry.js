
/* exported TriangleGeometry */
// eslint-disable-next-line no-unused-vars
class TriangleGeometry {
  constructor(gl) {
    this.gl = gl;

    // allocate and fill vertex buffer in device memory (OpenGL name: array buffer)
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array([
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,
        0.5, 0.0, 0.5,
      ]),
      gl.STATIC_DRAW);

    // allocate and fill index buffer in device memory (OpenGL name: element array buffer)
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array([
        0, 1, 2,
      ]),
      gl.STATIC_DRAW);

    // create our vertex array object
    this.inputLayout = gl.createVertexArray();
    gl.bindVertexArray(this.inputLayout);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

    // this associates the current buffer with the index of an attribute to our program
    // that was set in the program js file. Needs to match
    // Would probably be better to use getAttribLocation to do this instead of
    // a magic constant
    gl.enableVertexAttribArray(0);

    // describe the vertex attribute data, the first argument also needs to be an
    // index that directly maps to our attribute, probably would be better with
    // getAttribLocation as well.
    gl.vertexAttribPointer(
      0,
      3, gl.FLOAT, // < three pieces of float
      false, // < do not normalize (make unit length)
      0, // < tightly packed
      0, // < data starts at array start
    );

    // binds out vertex array to the program
    gl.bindVertexArray(null);
  }

  draw() {
    const { gl } = this;

    gl.bindVertexArray(this.inputLayout);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);
  }
}
