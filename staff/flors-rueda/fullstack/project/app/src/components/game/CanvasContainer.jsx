import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createScene } from '../../helpers/createScene';
import useMoveHandler from '../../hooks/useMoveHandler';
import inLogger from '../../inLogger';

const CanvasContainer = ({ floor, onSolved, onGameWon, onBomb, onLife }) => {
    const canvasContainerRef = useRef(null);

    const scene = createScene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    useMoveHandler(floor, scene, camera, onSolved, onGameWon, onBomb, onLife);

    useEffect(() => {
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasContainerRef.current.appendChild(renderer.domElement);

        const updateRendererSize = () => {
            const containerWidth = canvasContainerRef.current.offsetWidth;
            const containerHeight = canvasContainerRef.current.offsetHeight;

            renderer.setSize(containerWidth, containerHeight);

            const aspectRatio = containerWidth / containerHeight;
            camera.aspect = aspectRatio;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', updateRendererSize);
        updateRendererSize()


        const animate = () => {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', updateRendererSize);
            renderer.dispose();
        };
    }, []);

    return <div className="canvas-container" ref={canvasContainerRef} />;
};

export default inLogger(CanvasContainer);