Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  precision highp float;

  out vec4 fragmentColor;
  in vec4 v_position;

  void main(void) {
    float stripeDensity = 10.0;
    float colorScheme = 0.0;

    float sinX = ceil(sin(v_position.x * stripeDensity) + 1.0);

    float myRedFirst;
    float myGreenFirst;
    float myBlueFirst;

    float myRedSecond;
    float myGreenSecond;
    float myBlueSecond;

    float redChannel;
    float greenChannel;
    float blueChannel;


    if (colorScheme == 0.0) {
      // nice Orange
      myRedFirst = 0.894;
      myGreenFirst = 0.341;
      myBlueFirst = 0.18;

      // nice blue 
      myRedSecond = 0.49;
      myGreenSecond = 0.74;
      myBlueSecond = 0.76;
    }

    if (colorScheme == 1.0) {
      // nice green
      myRedFirst = 0.80;
      myGreenFirst = 0.90;
      myBlueFirst = 0.69;

      // nice purple
      myRedSecond = 0.55;
      myGreenSecond = 0.35;
      myBlueSecond = 0.59;
    }

    if (sinX == 1.0) {
      redChannel = myRedFirst;
      greenChannel = myGreenFirst;
      blueChannel = myBlueFirst;
    }

    if (sinX == 2.0) {
      redChannel = myRedSecond;
      greenChannel = myGreenSecond;
      blueChannel = myBlueSecond;
    }

    fragmentColor = vec4(redChannel, greenChannel, blueChannel, 1);
  }
`;
