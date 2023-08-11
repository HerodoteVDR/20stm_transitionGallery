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

uniform sampler2D imageA;
uniform sampler2D imageB;

float dCircle( vec2 p, float r )
{
    return length(p) - r;
}

float dArc(in vec2 p, in vec2 sc, in float ra, float rb, float rotation)
{
  p = mat2(cos(rotation), -sin(rotation), sin(rotation), cos(rotation)) * p;
  p.x = abs(p.x);
  return (sc.y * p.x > sc.x * p.y) ? length(p - ra * sc) - rb : abs(length(p) - ra) - rb;
}

void main() {
  vec2 uv = pos * 2. - 1.;
  vec2 initPos = pos;
  initPos.y =1. - pos.y;

  uv.x -= (mPosX - width / 2.) * 0.0003;
  uv.y += (mPosY - height / 2.) * 0.0005343;

  float arcFullRevolution = 2.14*(0.5+0.5*cos(millis*0.7+0.));
  float borderRadius = 5.*(0.5+0.5*cos(millis*0.41+3.0));
  vec2  arcCenter = vec2(sin(arcFullRevolution),cos(arcFullRevolution));
  float rotation = 2.0 * 3.141592653589793 * (millis) * 0.2;  // Rotation based on millis
  
  uv.x *= width/height;
  float d = dArc(uv, arcCenter, 0.6  , 0., rotation);

  d = sin(d * 0.2);
  d = 0.02 / d;

  float dA = smoothstep(1.,5., d);
  float dB = smoothstep(5.,1., d);

  vec4 imageColA = texture2D(imageA,initPos) * dA;
  vec4 imageColB = texture2D(imageB, initPos) * dB;

  gl_FragColor = imageColA + imageColB;
}
