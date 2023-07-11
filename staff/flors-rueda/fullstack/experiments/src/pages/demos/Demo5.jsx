import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Demo5 = () => {
    const containerRef = useRef(null);
    const animationFrameId = useRef(null);

    useEffect(() => {
        let camera, scene, renderer, mesh, controls;

        const init = () => {
            const container = containerRef.current;

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.set(0, 0, 4);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xaaaaaa);

            const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
            scene.add(ambient);

            const light = new THREE.DirectionalLight();
            light.position.set(0.2, 1, 1);
            scene.add(light);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            const geometry = new THREE.BoxBufferGeometry();
            const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            controls = new OrbitControls(camera, renderer.domElement);

            window.addEventListener('resize', handleResize);

            animate();
        };

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const animate = () => {
            mesh.rotateY(0.01);
            renderer.render(scene, camera);
            animationFrameId.current = requestAnimationFrame(animate);
        };

        init();

        return () => {
            cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener('resize', handleResize);
            containerRef.current.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} />;
};

export default Demo5;
