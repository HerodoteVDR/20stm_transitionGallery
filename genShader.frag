#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
varying vec2 pos;

uniform sampler2D background;
uniform float millis;

uniform float width;
uniform float height; 

uniform float mPosX;
uniform float mPosY;




float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}

float sdArc( in vec2 p, in vec2 sc, in float ra, float rb )
{
    // sc is the sin/cos of the arc's aperture
    p.x = abs(p.x);
    return (sc.y*p.x > sc.x*p.y) ? length(p - ra*sc) - rb : abs(length(p) - ra) - rb;
}


void main() {
  vec2 uv = pos * 2. - 1.;
  
  uv.x += 0.;
  uv.y += 0.;
  
  
  float tb = 3.14*(0.5+0.5*cos(millis*0.31+2.0));
  float rb = 0.15*(0.5+0.5*cos(millis*0.41+3.0));
  vec2  sc = vec2(sin(tb),cos(tb));
  
  
  uv.x *= width/height;
  // shape
  // float d = sdCircle(uv, 0.5);
  float d = sdArc(uv, sc, millis,1.);
  
  // d = abs(d);
  d = sin(d);
  d = 0.2 / d;
  d = step(0.3, d);
  
  vec3 col = vec3(d,d,d);
  gl_FragColor = vec4(col,1.);
}




