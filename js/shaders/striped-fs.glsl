Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  out vec4 fragmentColor;
  in vec4 v_position;

  void main(void) {
    fragmentColor = vec4(v_position.x + 1.0, v_position.y + 1.0, 0.50, 1);
  }
`;
