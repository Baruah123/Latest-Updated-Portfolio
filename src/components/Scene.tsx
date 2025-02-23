import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { Mesh } from 'three';

interface SceneProps {
  mousePosition: { x: number; y: number };
}

export default function Scene({ mousePosition }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const torusRef = useRef<Mesh>(null);

  // Smooth rotation and animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mousePosition.y * 0.2,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePosition.x * 0.2,
        0.05
      );
      // Subtle pulsing effect
      if (torusRef.current) {
        torusRef.current.scale.setScalar(1 + Math.sin(time) * 0.05);
      }
    }
  });

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.8} color="#a5b4fc" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        color="#ffffff" 
        castShadow 
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight 
        position={[-5, 5, -5]} 
        intensity={1} 
        color="#6366f1" 
        distance={20} 
      />

      {/* Main Object */}
      <group ref={groupRef}>
        <mesh ref={torusRef} position={[0, 0, 0]} castShadow receiveShadow>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <meshPhysicalMaterial
            color="#4338ca"
            metalness={0.7}
            roughness={0.2}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
            emissive="#1e3a8a"
            emissiveIntensity={0.3}
            reflectivity={0.9}
            envMapIntensity={1.5}
          />
          {/* Wireframe overlay */}
          <mesh>
            <torusKnotGeometry args={[1.01, 0.31, 128, 32]} />
            <meshBasicMaterial 
              color="#a5b4fc" 
              wireframe 
              transparent 
              opacity={0.2} 
            />
          </mesh>
        </mesh>

        {/* Floating Particles */}
        <ParticleField />
      </group>

      {/* Background Stars */}
      <Stars />
    </>
  );
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      starsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.1;
    }
  });

  const starVertices = [];
  const starColors = [];
  for (let i = 0; i < 8000; i++) {
    const x = THREE.MathUtils.randFloatSpread(150);
    const y = THREE.MathUtils.randFloatSpread(150);
    const z = THREE.MathUtils.randFloatSpread(150);
    starVertices.push(x, y, z);
    // Add subtle color variation
    const color = new THREE.Color().setHSL(
      Math.random() * 0.1 + 0.65, // Blue-ish hue
      0.8,
      Math.random() * 0.5 + 0.5
    );
    starColors.push(color.r, color.g, color.b);
  }

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starVertices.length / 3}
          array={new Float32Array(starVertices)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={starColors.length / 3}
          array={new Float32Array(starColors)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.15} 
        vertexColors 
        sizeAttenuation 
        transparent 
        opacity={0.8}
        fog={true}
      />
    </points>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const time = clock.getElapsedTime();
      particlesRef.current.rotation.y = time * 0.1;
      particlesRef.current.position.y = Math.sin(time) * 0.2;
    }
  });

  const particleVertices = [];
  for (let i = 0; i < 200; i++) {
    const x = THREE.MathUtils.randFloatSpread(3);
    const y = THREE.MathUtils.randFloatSpread(3);
    const z = THREE.MathUtils.randFloatSpread(3);
    particleVertices.push(x, y, z);
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleVertices.length / 3}
          array={new Float32Array(particleVertices)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#a5b4fc" 
        sizeAttenuation 
        transparent 
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}