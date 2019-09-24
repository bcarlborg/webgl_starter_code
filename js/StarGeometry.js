/* exported StarGeometry */
// eslint-disable-next-line no-unused-vars
class StarGeometry {
  constructor(gl) {
    this.gl = gl;

    // initialize the start with the origin point
    this.starVertices = [0.0, 0.0, 0.0];

    const degreeStep = 10;
    for (let step = 0; step < 360; step += degreeStep) {
      const radians = (step * Math.PI) / 180;
      let horizontal = Math.cos(radians);
      let vertical = Math.sin(radians);

      const scale = (90 - (step % 90)) / 90;
      console.log(step, scale);
      horizontal *= scale;
      vertical *= scale;
      this.starVertices.push(horizontal, vertical, 0.0);
    }

    this.starIndices = [];
    for (let step = 1; step < this.starVertices.length / 3 - 1; step += 1) {
      this.starIndices.push(0, step, step + 1);
    }
    this.starIndices.push(0, (this.starVertices.length / 3) - 1, 1);

    console.log(this.starVertices);
    console.log(this.starIndices);

    // allocate and fill vertex buffer in device memory (OpenGL name: array buffer)
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array(this.starVertices),
      gl.STATIC_DRAW);

    // allocate and fill index buffer in device memory (OpenGL name: element array buffer)
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(this.starIndices),
      gl.STATIC_DRAW);

    // create and bind input layout with input buffer bindings (OpenGL name: vertex array)
    this.inputLayout = gl.createVertexArray();
    gl.bindVertexArray(this.inputLayout);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(
      0,
      3, gl.FLOAT, // < three pieces of float
      false, // < do not normalize (make unit length)
      0, // < tightly packed
      0, // < data starts at array start
    );

    gl.bindVertexArray(null);
  }

  draw() {
    const { gl } = this;

    gl.bindVertexArray(this.inputLayout);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    // 2nd arg is the number of indices to render
    gl.drawElements(gl.TRIANGLES, this.starIndices.length, gl.UNSIGNED_SHORT, 0);
  }
}
