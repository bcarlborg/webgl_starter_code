
/* exported App */
class App {
  constructor(canvas, overlay) {
    this.canvas = canvas;
    this.overlay = overlay;
    this.keysPressed = {};

    this.gl = canvas.getContext('webgl2');

    if (this.gl === null) {
      throw new Error('Browser does not support WebGL2');
    }

    // compiles our shaders and our program
    // eslint-disable-next-line no-undef
    this.scene = new Scene(this.gl);

    // resize the canvas for the first time
    this.resize();
  }

  // match rendering resolution and viewport to the canvas size
  resize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.scene.resize(this.gl, this.canvas);
  }

  /* eslint-disable no-unused-vars */
  registerEventHandlers() {
    document.onkeydown = (event) => {
      // jshint unused:false
    };
    document.onkeyup = (event) => {
      // jshint unused:false
    };
    this.canvas.onmousedown = (event) => {
      const { x, y } = event;
      this.keysPressed.x = x;
      this.keysPressed.y = this.gl.canvas.height - y;
    };
    this.canvas.onmousemove = (event) => {
      event.stopPropagation();
    };
    this.canvas.onmouseout = (event) => {
      // jshint unused:false
    };
    this.canvas.onmouseup = (event) => {
      // jshint unused:false
    };

    // Continually will execute our resize funciton as the screen size is changed
    window.addEventListener('resize', () => this.resize());

    // asks the browser to execute a function every time a update an animation before a
    // repaint occurs on the screen. (This is the entry point for exectuing our code)
    window.requestAnimationFrame(() => this.update());
  }
  /* eslint-disable no-unused-vars */

  // animation frame update
  update() {
    this.scene.update(this.gl, this.keysPressed);

    // requestAnimationFrame must be called in this function
    // in order to access the next frame of the animation
    window.requestAnimationFrame(() => this.update());
  }
}

// entry point from HTML -- the load listener is executed when all of the
// page assests are downloaded (fully _loaded_)
window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const overlay = document.getElementById('overlay');

  const app = new App(canvas, overlay);
  app.registerEventHandlers();
});
