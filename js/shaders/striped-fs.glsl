Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es 
  precision highp float;

  out vec4 fragmentColor;

  void main(void) {
    fragmentColor = vec4(0.76, 0.49, 0.57, 1);
  }
`;
