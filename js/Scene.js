/* exported Scene */
// eslint-disable-next-line no-unused-vars
class Scene {
  /* eslint-disable no-undef */
  constructor(gl) {
    // Just compiles the shaders, no magic
    this.vsIdle = new Shader(gl, gl.VERTEX_SHADER, 'idle-vs.glsl');
    this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, 'solid-fs.glsl');

    // Links the two shaders together and associates an attribute with a
    // specific index in the program
    this.solidProgram = new Program(gl, this.vsIdle, this.fsSolid);

    // initializes the geometry and attribute buffer values for our geometry
    // this is also used to create our vertex array objects for the attributes
    // this.triangleGeometry = new TriangleGeometry(gl);
    this.donutGeometry = new DonutGeometry(gl);

    this.now = new Date();
  }
  /* eslint-disable no-undef */

  // eslint-disable-next-line class-methods-use-this
  resize(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  // this is the fuction that is called every time a repaint happens in the browser
  // because of the requestAnimationFrame call in app.js
  // eslint-disable-next-line no-unused-vars
  update(gl, keysPressed) {
    // jshint bitwise:false
    // jshint unused:false
    // console.log(gl.canvas.width);
    // clear the screen
    gl.clearColor(0.11, 0.13, 0.13, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.useProgram(this.solidProgram.glProgram);
    // this.triangleGeometry.draw();

    const timeDiff = new Date().getTime() - this.now.getTime();

    const translationX = 0.0;
    const translationY = 0.0;

    const screenRatio = (gl.canvas.height * 1.0) / gl.canvas.width;

    const baseScale = 0.01;
    const magnitude = 0.4;
    const milliSecondsPeriod = 8000.0;
    const timeModulo = ((timeDiff % milliSecondsPeriod) / milliSecondsPeriod) * 2 * Math.PI;
    const uniformScale = (Math.sin(timeModulo + Math.PI) * magnitude) + baseScale + magnitude;

    const cubeGeometry = {
      translation: [translationX, translationY, 0, 0],
      scale: [uniformScale * screenRatio, uniformScale, 1.0, 1.0],
    };

    this.donutGeometry.draw(cubeGeometry, this.solidProgram);
  }
}
