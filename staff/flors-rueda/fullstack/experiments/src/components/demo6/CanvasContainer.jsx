import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createScene } from './createScene';
import { createFloor } from './createFloor';

const CanvasContainer = ({ floor, onSolved, onGameWon }) => {
    const canvasContainerRef = useRef(null);

    useEffect(() => {
        const scene = createScene();
        const gridSize = floor.length;
        const cellSize = 1.5;

        const { cubeObjects, bombObjects, lifeObjects, ball, hole, stonks } = createFloor(floor, scene, cellSize);

        let isDragging = false;
        const defaultRotationSpeed = 0.01;
        const draggingRotationSpeed = 0.07;
        let rotationSpeed = defaultRotationSpeed;

        let lastClientX = 0;
        let lastClientY = 0;


        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

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


        const checkCollision = (ballPosition, obj) => {
            const ballRadius = ball.geometry.parameters.radius;
            const objSize = obj.geometry.parameters.width;
            const objPosition = obj.position;

            const distance = ballPosition.distanceTo(objPosition);

            return distance <= ballRadius + objSize / 2;
        };

        const onMoveStart = () => {
            isDragging = true;
            rotationSpeed = draggingRotationSpeed;
        };

        const onMoveEnd = () => {
            isDragging = false;
            rotationSpeed = defaultRotationSpeed;
        };

        const onMove = (event) => {
            if (isDragging) {
                const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
                const clientY = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;

                const clientDeltaX = clientX - lastClientX;
                const clientDeltaY = clientY - lastClientY;

                const vector = new THREE.Vector3(
                    (clientX / window.innerWidth) * 2 - 1,
                    -(clientY / window.innerHeight) * 2 + 1,
                    0.5
                );
                vector.unproject(camera);
                const dir = vector.sub(camera.position).normalize();
                const distance = -camera.position.z / dir.z;
                const ballPosition = camera.position.clone().add(dir.multiplyScalar(distance));

                const minGridX = -(gridSize) / 2 * cellSize;
                const maxGridX = (gridSize) / 2 * cellSize;
                const minGridY = -(gridSize) / 2 * cellSize;
                const maxGridY = (gridSize) / 2 * cellSize;

                if (ballPosition.x >= minGridX && ballPosition.x <= maxGridX && ballPosition.y >= minGridY && ballPosition.y <= maxGridY) {
                    let canMoveBall = true;
                    for (const obj of cubeObjects) {
                        if (checkCollision(ballPosition, obj)) {
                            canMoveBall = false;
                            return;
                        }
                    }

                    if (canMoveBall) {
                        ball.position.copy(ballPosition);
                    }

                    for (const obj of bombObjects) {
                        if (checkCollision(ballPosition, obj)) {
                            scene.remove(obj);
                            const index = bombObjects.indexOf(obj);
                            bombObjects.splice(index, 1);
                            console.log('boom');
                            return;
                        }
                    }

                    for (const obj of lifeObjects) {
                        if (checkCollision(ballPosition, obj)) {
                            scene.remove(obj);
                            const index = lifeObjects.indexOf(obj);
                            lifeObjects.splice(index, 1);
                            console.log('life ++');
                            return;
                        }
                    }

                    if (hole && checkCollision(ballPosition, hole)) {
                        console.log('level complete');
                        onSolved();
                        return;
                    }

                    if (stonks && checkCollision(ballPosition, stonks)) {
                        console.log('stonks');
                        onGameWon();
                        scene.remove(ball);
                        return;
                    }
                }

                ball.rotation.x += rotationSpeed * clientDeltaY;
                ball.rotation.y += rotationSpeed * clientDeltaX;

                lastClientX = clientX;
                lastClientY = clientY;
            }
        };

        document.addEventListener('mousedown', onMoveStart);
        document.addEventListener('mouseup', onMoveEnd);
        document.addEventListener('mousemove', onMove);
        document.addEventListener('touchstart', onMoveStart);
        document.addEventListener('touchend', onMoveEnd);
        document.addEventListener('touchmove', onMove);

        const animate = () => {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            document.removeEventListener('mousedown', onMoveStart);
            document.removeEventListener('mouseup', onMoveEnd);
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('touchstart', onMoveStart);
            document.removeEventListener('touchend', onMoveEnd);
            document.removeEventListener('touchmove', onMove);
            window.removeEventListener('resize', updateRendererSize);
            renderer.dispose();
        };
    }, []);

    return <div className="canvas-container" ref={canvasContainerRef} />;
};

export default CanvasContainer;