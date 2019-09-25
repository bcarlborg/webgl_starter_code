Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  out vec4 fragmentColor;
  in vec4 v_position;

  void main(void) {
    float r = (0.5 * sin(v_position.x * 10.0)) + 0.5;
    fragmentColor = vec4(r, 0.50, 0.50, 1);
  }
`;
