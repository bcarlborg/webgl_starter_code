Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec4 vertexPosition;
  uniform vec4 u_translation;
  uniform vec4 u_scale;
  out vec4 v_position;

  void main(void) {
    vec4 scaledPosition = vertexPosition * u_scale;
    vec4 translatedPosition = scaledPosition + u_translation;
    v_position = vertexPosition;
    gl_Position = translatedPosition;
  }
`;
