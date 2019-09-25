Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec4 vertexPosition;
  uniform vec4 u_translation;

  void main(void) {
    gl_Position = vertexPosition + u_translation;
  }
`;
