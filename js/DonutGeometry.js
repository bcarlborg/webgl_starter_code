// eslint-disable-next-line no-unused-vars
class DonutGeometry {
  constructor(gl) {
    this.gl = gl;
    this.vertexArray = [];
    this.indexArray = [];
    this.uniforms = {};

    this.buildDonutVertexArray();
    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,
      new Float32Array(this.vertexArray),
      gl.STATIC_DRAW);

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(this.indexArray),
      gl.STATIC_DRAW);

    // create our vertex array object
    this.inputLayout = gl.createVertexArray();
    gl.bindVertexArray(this.inputLayout);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

    // this associates the current buffer with the index of an attribute to our program
    // that was set in the program js file. Needs to match
    // Would probably be better to use getAttribLocation to do this instead of
    // a magic constant
    gl.enableVertexAttribArray(0);

    // describe the vertex attribute data, the first argument also needs to be an
    // index that directly maps to our attribute, probably would be better with
    // getAttribLocation as well.
    gl.vertexAttribPointer(
      0,
      3, gl.FLOAT, // < three pieces of float
      false, // < do not normalize (make unit length)
      0, // < tightly packed
      0, // < data starts at array start
    );

    // binds out vertex array to the program
    gl.bindVertexArray(null);
  }

  buildDonutVertexArray() {
    // resolution variable determines how many triangle blocks will be used
    // when rendering the donut. Higher resolution means better looking donut.
    // If the resolution is 360, the donut will be built from one rectangle for
    // every one degree of rotation in the donut
    const resolution = 360;
    const delta = 360 / resolution;
    for (let i = 0; i < 360; i += delta) {
      const preAngle = (i * Math.PI) / 180;
      const postAngle = ((i + delta) * Math.PI) / 180;

      const innerScalar = 0.65;

      const preInnerCoord = {
        x: Math.cos(preAngle) * innerScalar,
        y: Math.sin(preAngle) * innerScalar,
        index: (this.vertexArray.length / 3),
      };

      const preOuterCoord = {
        x: Math.cos(preAngle),
        y: Math.sin(preAngle),
        index: preInnerCoord.index + 1,
      };

      const postInnerCoord = {
        x: Math.cos(postAngle) * innerScalar,
        y: Math.sin(postAngle) * innerScalar,
        index: preOuterCoord.index + 1,
      };

      const postOuterCoord = {
        x: Math.cos(postAngle),
        y: Math.sin(postAngle),
        index: postInnerCoord.index + 1,
      };

      this.vertexArray.push(
        preInnerCoord.x, preInnerCoord.y, 0.0,
        preOuterCoord.x, preOuterCoord.y, 0.0,
        postInnerCoord.x, postInnerCoord.y, 0.0,
        postOuterCoord.x, postOuterCoord.y, 0.0,
      );

      this.indexArray.push(
        preOuterCoord.index, postOuterCoord.index, preInnerCoord.index,
        postOuterCoord.index, postInnerCoord.index, preInnerCoord.index,
      );
    }
  }

  draw(programInfo, timeDiff, version) {
    const { gl } = this;

    this.initUniforms(timeDiff, version);

    gl.bindVertexArray(this.inputLayout);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    const translationLocation = gl.getUniformLocation(programInfo.glProgram, 'u_translation');
    gl.uniform4fv(translationLocation, this.uniforms.translation);

    const scaleLocation = gl.getUniformLocation(programInfo.glProgram, 'u_scale');
    gl.uniform4fv(scaleLocation, this.uniforms.scale);

    const stripeDensityLocation = gl.getUniformLocation(programInfo.glProgram, 'u_stripeDensity');
    gl.uniform1f(stripeDensityLocation, this.uniforms.stripeDensity);

    const stripeColorLocation = gl.getUniformLocation(programInfo.glProgram, 'u_colorScheme');
    gl.uniform1f(stripeColorLocation, this.uniforms.colorScheme);

    gl.drawElements(gl.TRIANGLES, this.indexArray.length, gl.UNSIGNED_SHORT, 0);
  }

  // eslint-disable-next-line no-unused-vars
  initUniforms(timeDiff, version) {
    let screenRatio = (this.gl.canvas.height * 1.0) / this.gl.canvas.width;
    let baseScale = 0.31;
    let magnitude = 0.3;
    let milliSecondsPeriod = 6000.0;
    let timeModulo = ((timeDiff % milliSecondsPeriod) / milliSecondsPeriod) * 2 * Math.PI;
    let uniformScale = (Math.sin(timeModulo + Math.PI) * magnitude) + baseScale + magnitude;
    let pulsingScale = {
      x: uniformScale * screenRatio,
      y: uniformScale,
    };
    const scale = pulsingScale;

    let colorScheme = 1.0;
    if (version === 1) {
      colorScheme = 0.0;
    }
    const translation = {
      x: 0.0,
      y: 0.0,
    };

    if (version === 1) {
      translation.x = -0.5;
      translation.y = -0.5;
    }

    baseScale = 1;
    magnitude = 10.0;
    milliSecondsPeriod = 4000.0;
    timeModulo = ((timeDiff % milliSecondsPeriod) / milliSecondsPeriod) * 2 * Math.PI;
    uniformScale = (Math.sin(timeModulo + Math.PI) * magnitude) + baseScale + magnitude;

    let stripeDensity = 3.0;
    if (version === 0) {
      stripeDensity *= uniformScale * 0.4;
    }

    // const scale = {
    //   x: 0.2,
    //   y: 0.2,
    // };
    // scale.x *= screenRatio;

    this.uniforms = {
      translation: [translation.x, translation.y, 0, 0],
      scale: [scale.x, scale.y, 1.0, 1.0],
      stripeDensity,
      colorScheme,
    };
  }
}
