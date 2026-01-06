import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const WaveParticles = () => {
    const points = useRef();
    const count = 10000; // 100 x 100 grid

    // Generate positions and initial indices
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const distance = 2; // Spacing between points

        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < 100; j++) {
                const x = (i - 50) * distance;
                const z = (j - 50) * distance;
                const y = 0;
                let index = (i * 100 + j);
                positions[index * 3] = x;
                positions[index * 3 + 1] = y;
                positions[index * 3 + 2] = z;
            }
        }
        return positions;
    }, [count]);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color('#00f0e8') } // Cyan-neon
    }), []);

    useFrame((state) => {
        const { clock, pointer } = state;
        if (points.current) {
            points.current.material.uniforms.uTime.value = clock.getElapsedTime();

            // Map normalized pointer (-1 to 1) to rough world coordinates for interaction
            // Since camera is static, we can approximate or just use the pointer direct for simple effect
            // For better effect, we'd raycast, but raw mouse movement is cheaper and looks "techy" enough
            points.current.material.uniforms.uMouse.value.x = pointer.x * 50;
            points.current.material.uniforms.uMouse.value.y = pointer.y * 50;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesPosition.length / 3}
                    array={particlesPosition}
                    itemSize={3}
                />
            </bufferGeometry>
            <shaderMaterial
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                vertexColors={false}
                uniforms={uniforms}
                vertexShader={`
                    uniform float uTime;
                    uniform vec2 uMouse;
                    
                    varying float vDistance;
                    varying vec3 vPosition;

                    void main() {
                        vec3 pos = position;
                        
                        // Wave Motion
                        float wave1 = sin(pos.x * 0.2 + uTime) * 1.5;
                        float wave2 = cos(pos.z * 0.1 + uTime * 0.5) * 1.0;
                        
                        // Interactive Displacement
                        float d = distance(pos.xz, uMouse);
                        float interact = max(0.0, (15.0 - d) / 15.0); // 15 unit radius
                        
                        pos.y = wave1 + wave2 + (interact * 10.0 * sin(uTime * 3.0));
                        
                        vDistance = interact;
                        vPosition = pos; // Pass to fragment

                        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                        gl_PointSize = (6.0 * (1.0 + interact * 2.0)) * (100.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `}
                fragmentShader={`
                    uniform float uTime;
                    varying float vDistance;
                    varying vec3 vPosition;

                    // Cosine based palette function (iq style)
                    // Adjusted for Blue/Purple/Green vibes
                    vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
                        return a + b*cos( 6.28318*(c*t+d) );
                    }

                    void main() {
                        // Circular Particle
                        float dist = length(gl_PointCoord - vec2(0.5));
                        if (dist > 0.5) discard;

                        // Create wavy pattern coordinates
                        vec2 uv = vPosition.xz * 0.05;
                        
                        // Wavy pattern logic
                        float d = sin(uv.x * 5.0 + uTime) * 0.8 + sin(uv.y * 5.0 + uTime) * 0.8;
                        
                        // Strict Cool Color Palette (Blue, Green, Purple)
                        // defined manually to avoid any Red+Green overlap (Yellow)
                        
                        vec3 colPurple = vec3(0.5, 0.0, 0.9);
                        vec3 colTeal   = vec3(0.0, 0.8, 0.7);
                        vec3 colBlue   = vec3(0.0, 0.3, 0.9);

                        // Interact/Time factor
                        float info = d + uTime * 0.3;

                        // Mix 1: Purple to Teal
                        vec3 color = mix(colPurple, colTeal, 0.5 + 0.5 * sin(info));
                        
                        // Mix 2: Blend in Deep Blue
                        color = mix(color, colBlue, 0.5 + 0.5 * cos(info * 0.7));

                        // Intesify with interaction
                        color += vDistance * vec3(0.2, 1.0, 1.0); // Cyan/Bright interaction

                        // Alpha Fade on edges of circle
                        float shapeAlpha = 1.0 - smoothstep(0.3, 0.5, dist);
                        
                        // Logic: "closest start off with less opacity and get brighter as it goes back"
                        float depthNorm = (50.0 - vPosition.z) / 100.0;
                        float depthAlpha = 0.1 + (0.9 * depthNorm);

                        // Reduced overall opacity by 20%
                        gl_FragColor = vec4(color, shapeAlpha * depthAlpha * 0.8);
                    }
                `}
            />
        </points>
    );
};

const ParticleWave = () => {
    return (
        <div id="canvas-container" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -100,
            background: '#000' // Dark fallback
        }}>
            <Canvas camera={{ position: [0, 20, 50], fov: 60 }}>
                <WaveParticles />
            </Canvas>
        </div>
    );
};

export default ParticleWave;
