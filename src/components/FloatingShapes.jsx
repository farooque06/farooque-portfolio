import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, scale, color, speed = 1, distort = 0.3 }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <icosahedronGeometry args={[1, 1]} />
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={distort}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
};

const FloatingSphere = ({ position, scale, color }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.08;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
            <Sphere ref={meshRef} args={[1, 64, 64]} position={position} scale={scale}>
                <meshStandardMaterial
                    color={color}
                    roughness={0.1}
                    metalness={0.9}
                    envMapIntensity={1}
                />
            </Sphere>
        </Float>
    );
};

const FloatingTorus = ({ position, scale, color }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <Float speed={1} rotationIntensity={2} floatIntensity={1}>
            <Torus ref={meshRef} args={[1, 0.4, 32, 64]} position={position} scale={scale}>
                <meshStandardMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.8}
                    wireframe
                />
            </Torus>
        </Float>
    );
};

const GlowingOrb = ({ position, color, intensity = 1 }) => {
    return (
        <Float speed={3} rotationIntensity={0} floatIntensity={3}>
            <pointLight position={position} color={color} intensity={intensity} distance={10} />
            <mesh position={position}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshBasicMaterial color={color} />
            </mesh>
        </Float>
    );
};

const FloatingShapes = () => {
    return (
        <div className="canvas-container">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
                <pointLight position={[10, -10, 10]} intensity={0.5} color="#00d4ff" />

                {/* Floating Shapes */}
                <FloatingShape
                    position={[-4, 2, -2]}
                    scale={1.2}
                    color="#00d4ff"
                    speed={0.8}
                    distort={0.4}
                />
                <FloatingShape
                    position={[4, -1, -3]}
                    scale={0.8}
                    color="#a855f7"
                    speed={1.2}
                    distort={0.3}
                />
                <FloatingSphere
                    position={[3, 2.5, -1]}
                    scale={0.5}
                    color="#ec4899"
                />
                <FloatingSphere
                    position={[-3, -2, -2]}
                    scale={0.6}
                    color="#22c55e"
                />
                <FloatingTorus
                    position={[0, -3, -4]}
                    scale={0.7}
                    color="#00d4ff"
                />
                <FloatingTorus
                    position={[-5, 0, -5]}
                    scale={0.5}
                    color="#a855f7"
                />

                {/* Glowing Orbs */}
                <GlowingOrb position={[5, 3, 0]} color="#00d4ff" intensity={2} />
                <GlowingOrb position={[-5, -3, 1]} color="#a855f7" intensity={2} />
                <GlowingOrb position={[0, 4, -2]} color="#ec4899" intensity={1.5} />
            </Canvas>
        </div>
    );
};

export default FloatingShapes;
