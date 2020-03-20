import { 
  drawScene, 
  initBuffers, 
  initShaderProgram,
  vsSource,
  fsSource
} from './webgl';


function init() {
  const canvas = document.getElementById("game");
  const gl = canvas.getContext("webgl");
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }


  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(
        shaderProgram,
        "aVertexPosition"
      ),
      vertexColor: gl.getAttribLocation(
        shaderProgram,
        "aVertexColor"
      )
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: gl.getUniformLocation(
        shaderProgram,
        "uModelViewMatrix"
      )
    }
  };

  const buffers = initBuffers(gl);
  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    drawScene(gl, programInfo, buffers, deltaTime);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

window.onload = init;