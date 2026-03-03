'use client';

import { useEffect, useRef } from 'react';
import type { Vector3, Mesh } from 'three';

export default function StarMapGlobe() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        let animId: number;
        let mouseX = 0;
        let mouseY = 0;
        let tiltX = 0;

        (async () => {
            const THREE = await import('three');

            const w = container.clientWidth;
            const h = container.clientHeight;

            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(w, h);
            renderer.setClearColor(0x000000, 0);
            container.appendChild(renderer.domElement);

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, w / h, 0.01, 100);
            camera.position.z = 2.8;

            // ── Globe wireframe ──────────────────────────────────────────
            const sphereGeo = new THREE.SphereGeometry(1, 16, 12);
            const sphereMat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                wireframe: true,
                transparent: true,
                opacity: 0.08,
            });
            const globe = new THREE.Mesh(sphereGeo, sphereMat);
            scene.add(globe);

            // ── Nodes ────────────────────────────────────────────────────
            const NODE_COUNT = 35;
            const ACTIVE_COUNT = 3;
            const nodePositions: Vector3[] = [];
            const nodeMeshes: Mesh[] = [];

            for (let i = 0; i < NODE_COUNT; i++) {
                const phi = Math.acos(2 * Math.random() - 1);
                const theta = Math.random() * Math.PI * 2;
                const pos = new THREE.Vector3(
                    Math.sin(phi) * Math.cos(theta),
                    Math.sin(phi) * Math.sin(theta),
                    Math.cos(phi),
                );
                nodePositions.push(pos);

                const isActive = i < ACTIVE_COUNT;
                const radius = isActive ? 0.07 : 0.04;
                const color = isActive ? 0x4fc3f7 : 0xffffff;
                const opacity = isActive ? 0.9 : 0.6;

                const geo = new THREE.IcosahedronGeometry(radius, 0);
                const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
                const mesh = new THREE.Mesh(geo, mat);
                mesh.position.copy(pos);
                scene.add(mesh);
                nodeMeshes.push(mesh);
            }

            // ── Connections between close nodes ─────────────────────────
            const linePositions: number[] = [];
            const MAX_ANGLE = (40 * Math.PI) / 180;

            for (let a = 0; a < NODE_COUNT; a++) {
                for (let b = a + 1; b < NODE_COUNT; b++) {
                    const angle = nodePositions[a].angleTo(nodePositions[b]);
                    if (angle < MAX_ANGLE) {
                        linePositions.push(
                            nodePositions[a].x, nodePositions[a].y, nodePositions[a].z,
                            nodePositions[b].x, nodePositions[b].y, nodePositions[b].z,
                        );
                    }
                }
            }
            const lineGeo = new THREE.BufferGeometry();
            lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
            const lineMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 });
            scene.add(new THREE.LineSegments(lineGeo, lineMat));

            // ── Mouse parallax ──────────────────────────────────────────
            const handleMouseMove = (e: MouseEvent) => {
                mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            };
            window.addEventListener('mousemove', handleMouseMove);

            // ── Resize ──────────────────────────────────────────────────
            const handleResize = () => {
                const nw = container.clientWidth;
                const nh = container.clientHeight;
                camera.aspect = nw / nh;
                camera.updateProjectionMatrix();
                renderer.setSize(nw, nh);
            };
            window.addEventListener('resize', handleResize);

            // ── Animate ─────────────────────────────────────────────────
            let t = 0;
            const animate = () => {
                animId = requestAnimationFrame(animate);
                t += 0.016;

                // Slow Y rotation
                globe.rotation.y += 0.002;

                // Sync nodes to globe rotation
                nodePositions.forEach((pos, i) => {
                    nodeMeshes[i].position.copy(pos).applyEuler(globe.rotation);
                });

                // Pulsing active nodes
                for (let i = 0; i < ACTIVE_COUNT; i++) {
                    const scale = 1 + 0.3 * Math.sin(t * 2 + i * 2.1);
                    nodeMeshes[i].scale.setScalar(scale);
                }

                // Mouse-parallax tilt
                const targetTiltX = -mouseY * (8 * Math.PI) / 180;
                tiltX += (targetTiltX - tiltX) * 0.02;
                globe.rotation.x = tiltX;

                // Slight Y tilt from horizontal mouse
                globe.rotation.y += mouseX * 0.0005;

                renderer.render(scene, camera);
            };
            animate();

            (container as any).__cleanup = () => {
                cancelAnimationFrame(animId);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('resize', handleResize);
                renderer.dispose();
                if (renderer.domElement.parentNode === container) {
                    container.removeChild(renderer.domElement);
                }
            };
        })();

        return () => {
            if (container && (container as any).__cleanup) {
                (container as any).__cleanup();
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
        />
    );
}
