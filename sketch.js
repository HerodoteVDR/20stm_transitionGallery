let genShader;
let images = [
  "https://images.unsplash.com/photo-1682686581498-5e85c7228119?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1691485455368-8b8f6f7583d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=732&q=80",
  "https://images.unsplash.com/photo-1687360440747-cafed773d446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
];
function preload() {
  genShader = loadShader('shader.vert', 'genShader.frag');
    for (let i = 0; i < images.length; i++) {
      images[i] = loadImage(images[i]);
    }
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);

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
  genShader.setUniform("image", images[0]);

  shader(genShader);
  // Draw a rectangle with the shader
  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}