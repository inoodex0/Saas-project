"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { BufferAttribute, BufferGeometry } from "three";
import type { Group, Mesh, Points } from "three";

function seeded(index: number) {
  const x = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function Starfield() {
  const ref = useRef<Points>(null);

  const geometry = useMemo(() => {
    const count = 260;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 5.5 + seeded(i * 3) * 5;
      const theta = seeded(i * 3 + 1) * Math.PI * 2;
      const phi = Math.acos(2 * seeded(i * 3 + 2) - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[i * 3 + 2] = radius * Math.cos(phi) - 3;
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    return geo;
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += Math.min(delta, 0.05) * 0.03;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        color="#34d399"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Shapes() {
  const ring = useRef<Mesh>(null);
  const ico = useRef<Mesh>(null);
  const knot = useRef<Mesh>(null);
  const orb = useRef<Mesh>(null);
  const { viewport } = useThree();

  const show = viewport.width > 4.5;
  const hw = viewport.width / 2;
  const hh = viewport.height / 2;
  const scale = Math.max(0.5, Math.min(1.15, hw / 4.6));

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.05);
    if (ring.current) {
      ring.current.rotation.z += d * 0.22;
      ring.current.rotation.x = 0.5 + Math.sin(t * 0.4) * 0.25;
      ring.current.position.y = hh * 0.42 + Math.sin(t * 0.9) * 0.2;
    }
    if (ico.current) {
      ico.current.rotation.y += d * 0.3;
      ico.current.rotation.x -= d * 0.1;
      ico.current.position.y = -hh * 0.12 + Math.cos(t * 0.75) * 0.24;
    }
    if (knot.current) {
      knot.current.rotation.y = t * 0.32;
      knot.current.rotation.x = t * 0.18;
      knot.current.position.y = -hh * 0.62 + Math.sin(t * 0.65 + 1) * 0.2;
    }
    if (orb.current) {
      orb.current.position.y = hh * 0.62 + Math.sin(t * 1.05 + 2) * 0.26;
      orb.current.position.x = hw * 0.62 + Math.cos(t * 0.55) * 0.35;
    }
  });

  if (!show) return null;

  return (
    <group>
      <mesh ref={ring} position={[-hw * 0.82, hh * 0.42, -1.6]} scale={scale}>
        <torusGeometry args={[1.7, 0.34, 24, 96]} />
        <meshStandardMaterial
          color="#059669"
          metalness={0.35}
          roughness={0.2}
          emissive="#064e3b"
          emissiveIntensity={0.35}
        />
      </mesh>

      <mesh ref={ico} position={[hw * 0.82, -hh * 0.12, -2]} scale={scale}>
        <icosahedronGeometry args={[1.55, 0]} />
        <meshBasicMaterial
          color="#16a34a"
          wireframe
          transparent
          opacity={0.42}
        />
      </mesh>

      <mesh ref={knot} position={[-hw * 0.6, -hh * 0.62, -2.6]} scale={scale}>
        <torusKnotGeometry args={[0.9, 0.22, 120, 16]} />
        <meshStandardMaterial
          color="#22d3ee"
          metalness={0.3}
          roughness={0.25}
          emissive="#0369a1"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh ref={orb} position={[hw * 0.62, hh * 0.62, -1]} scale={scale}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#4ade80"
          metalness={0.25}
          roughness={0.12}
          emissive="#15803d"
          emissiveIntensity={0.45}
        />
      </mesh>
    </group>
  );
}

function Parallax({ children }: { children: ReactNode }) {
  const ref = useRef<Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      target.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const group = ref.current;
    if (!group) return;
    const k = Math.min(1, Math.max(delta, 0.016) * 3);
    group.rotation.y += (target.current.x * 0.2 - group.rotation.y) * k;
    group.rotation.x += (-target.current.y * 0.13 - group.rotation.x) * k;
  });

  return <group ref={ref}>{children}</group>;
}

export default function HeroScene() {
  const reduced = useReducedMotion() ?? false;

  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9], fov: 45 }}
      frameloop={reduced ? "demand" : "always"}
    >
      <ambientLight intensity={1.05} />
      <directionalLight position={[5, 4, 6]} intensity={1.6} />
      <directionalLight position={[-6, -2, 3]} intensity={1.1} color="#a5b4fc" />
      <directionalLight position={[0, -5, -6]} intensity={0.9} color="#c4b5fd" />
      <Parallax>
        <Starfield />
        <Shapes />
      </Parallax>
    </Canvas>
  );
}
