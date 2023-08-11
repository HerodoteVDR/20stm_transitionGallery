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

uniform sampler2D image;

float sdCircle( vec2 p, float r )
{
    return length(p) - r;
}

float sdArc( in vec2 p, in vec2 sc, in float ra, float rb )
{
    p.x = abs(p.x);
    return (sc.y*p.x > sc.x*p.y) ? length(p - ra*sc) - rb : abs(length(p) - ra) - rb;
}


void main() {
  vec2 uv = pos * 2. - 1.;
  vec2 initPos = uv;

//  mPosY += height / 2.;

  uv.x -= (mPosX - width / 2.) * 0.0001;
  uv.y += (mPosY - height / 2.) * 0.0001781;

  float arcFullRevolution = 2.*(0.5+0.5*cos(millis*0.31+3.));
  float borderRadius = 5.*(0.5+0.5*cos(millis*0.41+3.0));
  vec2  arcCenter = vec2(sin(arcFullRevolution),cos(arcFullRevolution));
  
  
  uv.x *= width/height;
  // shape
//   float d = sdCircle(uv, 0.5);
  float d = sdArc(uv, arcCenter, 0.4,0.);

  // d = abs(d);
  d = sin(d);
  d = 0.02 / d;
//  d *= 0.02;
  d = step( 0.3, d);
//  d = smoothstep(sin(millis) * 0.1,sin(millis*0.02), d);


  float dB = d * -1.;
  vec4 colB = vec4(0.5,0.5,0.5,1.);
  colB *= dB;

  vec4 col = vec4(d,d,d,d);
  vec4 imageCol = texture2D(image,initPos);

  col+= colB;

  col *= imageCol;




  gl_FragColor = col;
}




