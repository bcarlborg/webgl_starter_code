Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  out vec4 fragmentColor;
  in vec4 v_position;

  void main(void) {
    float sinX = ceil(sin(v_position.x * 10.0) + 1.0);
    float r;
    if (sinX == 1.0) {
      r = 0.5;
    }
    if (sinX == 2.0) {
      r = 0.1;
    }
    fragmentColor = vec4(r, 0.50, 0.50, 1);
  }
`;
