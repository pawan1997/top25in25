import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const fragmentShader = `
uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D iChannel0;

// Helper function - distance field for the scene
float map(vec3 p, float i) {
    float t = iTime * 0.5;
    p.x += sin(p.z * 0.5 + t) * 0.3;
    p.y += cos(p.z * 0.5 + t * 0.7) * 0.3;

    float sphere = length(p) - 1.5;
    float box = max(max(abs(p.x) - 0.8, abs(p.y) - 0.8), abs(p.z) - 0.8);

    return mix(sphere, box, sin(i * 0.1 + t) * 0.5 + 0.5);
}

// Simplified 3D texture sampling
vec3 tex3D(sampler2D tex, vec3 p, vec3 n) {
    vec3 col = texture2D(tex, p.xy * 0.5 + 0.5).rgb;
    col += texture2D(tex, p.yz * 0.5 + 0.5).rgb;
    col += texture2D(tex, p.zx * 0.5 + 0.5).rgb;
    return col / 3.0;
}

void main() {
    vec2 I = gl_FragCoord.xy;
    vec4 O = vec4(0.0);

    float i = 0.0;
    float d = 0.0;
    float s = 0.0;
    vec3 p;
    vec3 c = vec3(0.0);
    vec3 r = vec3(iResolution, 1.0);
    vec3 e = vec3(0.0001, 0.0, 0.0);

    // Rotation matrix
    float angle = iTime / 3.0;
    mat2 R = mat2(cos(angle), sin(angle), -sin(angle), cos(angle));

    for(float iter = 0.0; iter < 100.0; iter++) {
        i = iter;

        // Ray position calculation
        vec2 uv = (I + I - r.xy) / r.y * d;
        p = vec3(uv * R, d - 8.0);
        p.xz *= R;

        s = map(p, i);
        d += s;

        // Color accumulation with glow effect
        vec3 colorContrib = max(1.3 * sin(vec3(3.0, 2.0, 1.0) + i * 0.4) / s, -length(p * p));
        c += colorContrib;

        if(s < 0.001 || d > 20.0) break;
    }

    // Normal calculation
    vec3 normal = normalize(map(p, i) - vec3(
        map(p - e.xyy, i),
        map(p - e.yxy, i),
        map(p - e.yyx, i)
    ));

    // Create a simple procedural texture instead of iChannel0
    vec3 texCol = vec3(
        sin(p.x * 3.0 + iTime),
        sin(p.y * 3.0 + iTime * 0.7),
        sin(p.z * 3.0 + iTime * 0.5)
    ) * 0.5 + 0.5;

    c *= 0.3 + texCol;

    // Tonemap and output - increased brightness
    O.rgb = tanh(c * c / 1e5) * 2.0; // Increased brightness significantly
    O.a = 1.0;

    gl_FragColor = O;
}
`;

const vertexShader = `
void main() {
    gl_Position = vec4(position, 1.0);
}
`;

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) {
      console.error('ShaderBackground: Canvas or container ref is null');
      return;
    }

    console.log('ShaderBackground: Initializing Three.js...');

    // Setup Three.js scene
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const width = container.offsetWidth || 500;
    const height = container.offsetHeight || 500;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    // Create shader material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(width, height) },
        iChannel0: { value: new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1) }
      }
    });
    materialRef.current = material;

    // Create fullscreen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = (Date.now() - startTime) * 0.001;

      if (materialRef.current) {
        materialRef.current.uniforms.iTime.value = currentTime;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    console.log('ShaderBackground: Animation loop started');

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.offsetWidth || 500;
      const newHeight = containerRef.current.offsetHeight || 500;

      renderer.setSize(newWidth, newHeight);

      if (materialRef.current) {
        materialRef.current.uniforms.iResolution.value.set(newWidth, newHeight);
      }
      console.log('ShaderBackground: Resized to', newWidth, 'x', newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          opacity: 0.8,
          zIndex: 1
        }}
      />
    </div>
  );
}
