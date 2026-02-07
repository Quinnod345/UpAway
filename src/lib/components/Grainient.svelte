<script>
  import { onMount, onDestroy } from 'svelte';
  import { Renderer, Program, Mesh, Triangle } from 'ogl';
  
  export let color1 = '#7B949C';
  export let color2 = '#536C7C';
  export let color3 = '#213C4E';
  export let timeSpeed = 0.25;
  export let colorBalance = 0;
  export let warpStrength = 1;
  export let warpFrequency = 5;
  export let warpSpeed = 2;
  export let warpAmplitude = 50;
  export let blendAngle = 0;
  export let blendSoftness = 0.05;
  export let rotationAmount = 500;
  export let noiseScale = 2;
  export let grainAmount = 0.1;
  export let grainScale = 2;
  export let grainAnimated = false;
  export let contrast = 1.5;
  export let gamma = 1;
  export let saturation = 1;
  export let centerX = 0;
  export let centerY = 0;
  export let zoom = 0.9;
  export let opacity = 1.0;
  
  let container;
  let animationId;
  let renderer;
  
  // Random starting time offset for each instance
  const timeOffset = Math.random() * 10000;
  
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [1, 1, 1];
    return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
  };
  
  const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;

  const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uOpacity;
out vec4 fragColor;

#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}

void main(){
  float t=iTime*uTimeSpeed;
  vec2 uv=gl_FragCoord.xy/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);
  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;
  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);
  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));
  
  // Add grain (original algorithm)
  vec2 grainUv = uv * max(uGrainScale, 0.001);
  if(uGrainAnimated > 0.5) { grainUv += vec2(t * 0.05); }
  float grain = fract(sin(dot(grainUv, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * uGrainAmount;
  
  // Apply contrast
  col = (col - 0.5) * uContrast + 0.5;
  
  // Apply saturation
  float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(luma), col, uSaturation);
  
  // Apply gamma
  col = pow(max(col, 0.0), vec3(1.0 / max(uGamma, 0.001)));
  col = clamp(col, 0.0, 1.0);
  
  fragColor = vec4(col, uOpacity);
}`;

  onMount(() => {
    if (!container) return;
    
    renderer = new Renderer({ 
      canvas: container,
      alpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    
    const geometry = new Triangle(gl);
    
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iResolution: { value: [container.width, container.height] },
        iTime: { value: 0 },
        uTimeSpeed: { value: timeSpeed },
        uColorBalance: { value: colorBalance },
        uWarpStrength: { value: warpStrength },
        uWarpFrequency: { value: warpFrequency },
        uWarpSpeed: { value: warpSpeed },
        uWarpAmplitude: { value: warpAmplitude },
        uBlendAngle: { value: blendAngle },
        uBlendSoftness: { value: blendSoftness },
        uRotationAmount: { value: rotationAmount },
        uNoiseScale: { value: noiseScale },
        uGrainAmount: { value: grainAmount },
        uGrainScale: { value: grainScale },
        uGrainAnimated: { value: grainAnimated ? 1 : 0 },
        uContrast: { value: contrast },
        uGamma: { value: gamma },
        uSaturation: { value: saturation },
        uCenterOffset: { value: [centerX, centerY] },
        uZoom: { value: zoom },
        uColor1: { value: hexToRgb(color1) },
        uColor2: { value: hexToRgb(color2) },
        uColor3: { value: hexToRgb(color3) },
        uOpacity: { value: opacity }
      }
    });
    
    const mesh = new Mesh(gl, { geometry, program });
    
    const resize = () => {
      const rect = container.parentElement.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      program.uniforms.iResolution.value = [rect.width, rect.height];
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    const animate = (time) => {
      program.uniforms.iTime.value = (time + timeOffset) * 0.001;
      renderer.render({ scene: mesh });
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  });
  
  onDestroy(() => {
    if (animationId) cancelAnimationFrame(animationId);
  });
</script>

<canvas bind:this={container} class="grainient-canvas"></canvas>

<style>
  .grainient-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
</style>
