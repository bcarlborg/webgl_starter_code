/* exported Porgram */
// eslint-disable-next-line no-unused-vars
class Program {
  constructor(gl, vertexShader, fragmentShader) {
    this.gl = gl;
    this.sourceFileNames = { vs: vertexShader.sourceFileName, fs: fragmentShader.sourceFileName };
    this.glProgram = gl.createProgram();
    gl.attachShader(this.glProgram, vertexShader.glShader);
    gl.attachShader(this.glProgram, fragmentShader.glShader);

    // bind attribute to a specific location (index) in the shader program
    // calling gl.getAttribLocation DOES return the second argument
    gl.bindAttribLocation(this.glProgram, 0, 'vertexPosition');

    gl.linkProgram(this.glProgram);
    if (!gl.getProgramParameter(this.glProgram, gl.LINK_STATUS)) {
      throw new Error(`Could not link shaders [vertex shader: ${vertexShader.sourceFileName}]:[fragment shader: ${fragmentShader.sourceFileName}
       ${gl.getProgramInfoLog(this.glProgram)}`);
    }
  }
}
