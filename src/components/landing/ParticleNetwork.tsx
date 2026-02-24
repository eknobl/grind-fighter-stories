'use client';

import { useEffect, useRef } from 'react';
import type * as THREE_TYPES from 'three';

interface ParticleNetworkProps {
    onMouseMove?: (x: number, y: number) => void;
}

export default function ParticleNetwork({ onMouseMove }: ParticleNetworkProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let animId: number;
        let frameCount = 0;

        (async () => {
            const THREE = await import('three');

            // Renderer
            const renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true,
                antialias: true,
            });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);

            // Scene & camera
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 130;

            // Particles
            const COUNT = 200;
            const positions = new Float32Array(COUNT * 3);
            const velocities: THREE_TYPES.Vector3[] = [];

            const W = 320, H = 210, D = 110;

            for (let i = 0; i < COUNT; i++) {
                positions[i * 3 + 0] = (Math.random() - 0.5) * W;
                positions[i * 3 + 1] = (Math.random() - 0.5) * H;
                positions[i * 3 + 2] = (Math.random() - 0.5) * D;
                velocities.push(new THREE.Vector3(
                    (Math.random() - 0.5) * 0.06,
                    (Math.random() - 0.5) * 0.06,
                    (Math.random() - 0.5) * 0.04,
                ));
            }

            const ptGeo = new THREE.BufferGeometry();
            ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

            const ptMat = new THREE.PointsMaterial({
                color: 0xffffff,
                size: 0.9,
                opacity: 0.65,
                transparent: true,
                sizeAttenuation: true,
            });

            const points = new THREE.Points(ptGeo, ptMat);
            scene.add(points);

            // Lines placeholder
            let lineSegments: THREE_TYPES.LineSegments | null = null;
            const lineMat = new THREE.LineBasicMaterial({
                color: 0xffffff,
                opacity: 0.07,
                transparent: true,
            });

            const rebuildLines = () => {
                if (lineSegments) {
                    scene.remove(lineSegments);
                    lineSegments.geometry.dispose();
                }
                const linePositions: number[] = [];
                const DIST = 55;
                for (let a = 0; a < COUNT; a++) {
                    for (let b = a + 1; b < COUNT; b++) {
                        const dx = positions[a * 3] - positions[b * 3];
                        const dy = positions[a * 3 + 1] - positions[b * 3 + 1];
                        const dz = positions[a * 3 + 2] - positions[b * 3 + 2];
                        if (dx * dx + dy * dy + dz * dz < DIST * DIST) {
                            linePositions.push(
                                positions[a * 3], positions[a * 3 + 1], positions[a * 3 + 2],
                                positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2],
                            );
                        }
                    }
                }
                const lineGeo = new THREE.BufferGeometry();
                lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
                lineSegments = new THREE.LineSegments(lineGeo, lineMat);
                scene.add(lineSegments);
            };

            rebuildLines();

            // Mouse
            let targetX = 0, targetY = 0;
            const handleMouse = (e: MouseEvent) => {
                targetX = (e.clientX / window.innerWidth - 0.5) * 18;
                targetY = -(e.clientY / window.innerHeight - 0.5) * 12;
                onMouseMove?.(e.clientX, e.clientY);
            };
            window.addEventListener('mousemove', handleMouse);

            // Resize
            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener('resize', handleResize);

            // Animate
            const animate = () => {
                animId = requestAnimationFrame(animate);
                frameCount++;

                // Move particles
                for (let i = 0; i < COUNT; i++) {
                    positions[i * 3 + 0] += velocities[i].x;
                    positions[i * 3 + 1] += velocities[i].y;
                    positions[i * 3 + 2] += velocities[i].z;

                    // Wrap
                    if (positions[i * 3 + 0] > W / 2) positions[i * 3 + 0] = -W / 2;
                    if (positions[i * 3 + 0] < -W / 2) positions[i * 3 + 0] = W / 2;
                    if (positions[i * 3 + 1] > H / 2) positions[i * 3 + 1] = -H / 2;
                    if (positions[i * 3 + 1] < -H / 2) positions[i * 3 + 1] = H / 2;
                    if (positions[i * 3 + 2] > D / 2) positions[i * 3 + 2] = -D / 2;
                    if (positions[i * 3 + 2] < -D / 2) positions[i * 3 + 2] = D / 2;
                }
                ptGeo.attributes.position.needsUpdate = true;

                // Rebuild lines every 4 frames
                if (frameCount % 4 === 0) rebuildLines();

                // Camera lerp
                camera.position.x += (targetX - camera.position.x) * 0.018;
                camera.position.y += (targetY - camera.position.y) * 0.018;

                renderer.render(scene, camera);
            };

            animate();

            // Cleanup stored on ref so the outer cleanup can call it
            (canvas as any).__cleanup = () => {
                cancelAnimationFrame(animId);
                window.removeEventListener('mousemove', handleMouse);
                window.removeEventListener('resize', handleResize);
                renderer.dispose();
            };
        })();

        return () => {
            if (canvas && (canvas as any).__cleanup) {
                (canvas as any).__cleanup();
            }
        };
    }, [onMouseMove]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
            }}
        />
    );
}
