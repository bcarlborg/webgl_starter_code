"use strict";
/* exported App */
class App{
  constructor(canvas, overlay) {
    this.canvas = canvas;
    this.overlay = overlay;

    this.gl = canvas.getContext("webgl2"); 
  
    if (this.gl === null) {
      throw new Error("Browser does not support WebGL2");
    }
   
    this.scene = new Scene(this.gl);

    this.resize();
  }

  // match rendering resolution and viewport to the canvas size
  resize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
    this.scene.resize(this.gl, this.canvas);
  }

  registerEventHandlers() {
    document.onkeydown = (event) => {
      //jshint unused:false
    };
    document.onkeyup = (event) => {
      //jshint unused:false
    };
    this.canvas.onmousedown = (event) => {
      //jshint unused:false
    };
    this.canvas.onmousemove = (event) => {
      //jshint unused:false
      event.stopPropagation();
    };
    this.canvas.onmouseout = (event) => {
      //jshint unused:false
    };
    this.canvas.onmouseup = (event) => {
      //jshint unused:false
    };
    window.addEventListener('resize', () => this.resize() );

    // asks the browser to execute a function every time a update an animation before a
    // repaint occurs on the screen. (This is the entry point for exectuing our code)
    window.requestAnimationFrame( () => this.update() );
  }

  // animation frame update
  update() {

    this.scene.update(this.gl, this.keysPressed);

    // requestAnimationFrame must be called in this function
    // in order to access the next frame of the animation
    window.requestAnimationFrame( () => this.update() );
  }
}

// entry point from HTML -- the load listener is executed when all of the
// page assests are downloaded (fully _loaded_)
window.addEventListener('load', () => {
  const canvas = document.getElementById("canvas");
  const overlay = document.getElementById("overlay");

  const app = new App(canvas, overlay);
  app.registerEventHandlers();
});