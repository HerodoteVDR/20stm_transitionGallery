let genShader;

function preload() {
  genShader = loadShader('shader.vert', 'genShader.frag');
}

function setup() {
  createCanvas(screen.width, screen.height, WEBGL);

  shader(genShader); // Appliquer le shader une fois au début

  // Définir les uniformes après avoir appliqué le shader
  genShader.setUniform("width", width);
  genShader.setUniform("height", height);
  
  noStroke();
  // Pas besoin d'appeler shader(genShader) à nouveau ici
}

function draw() {
  background(0);
  genShader.setUniform("millis", millis() * 0.001)
  genShader.setUniform("mPosX", mouseX)
  genShader.setUniform("mPosY", mouseY)
  

  shader(genShader);
  // Draw a rectangle with the shader
  rect(0, 0, width, height);
}