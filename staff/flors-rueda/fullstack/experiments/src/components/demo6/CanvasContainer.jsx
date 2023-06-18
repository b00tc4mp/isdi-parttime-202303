import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CanvasContainer = ({ floor, onSolved, onGameWon }) => {
    const canvasContainerRef = useRef(null);

    useEffect(() => {
        let isDragging = false;
        const defaultRotationSpeed = 0.01;
        const draggingRotationSpeed = 0.03;
        let rotationSpeed = defaultRotationSpeed;

        let lastMouseX = 0;
        let lastMouseY = 0;

        const textureLoader = new THREE.TextureLoader();

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const bgTexture = textureLoader.load('assets/demo6/floor.png');
        scene.background = bgTexture;

        const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
        scene.add(ambient);

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

        const textureBall = textureLoader.load('assets/demo6/ball.png');
        const textureWall = textureLoader.load('assets/demo6/wall.png');
        const textureDirt = textureLoader.load('assets/demo6/dirt.png');

        const ballRadius = 0.25;
        const ballGeometry = new THREE.SphereGeometry(ballRadius, 8, 8);
        const ballMaterial = new THREE.MeshBasicMaterial({ map: textureBall });

        const cubeSize = 1.5;
        const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const wallMaterial = new THREE.MeshBasicMaterial({ map: textureWall });
        const dirtMaterial = new THREE.MeshBasicMaterial({ map: textureDirt });

        const gridSize = floor.length;
        const cellSize = cubeSize;

        const cubeObjects = [];
        const bombObjects = [];
        const lifeObjects = [];

        let ball, cube, hole, stonks;

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const value = floor[row][col];

                const xPos = (col - (gridSize - 1) / 2) * cellSize;
                const yPos = ((gridSize - 1) / 2 - row) * cellSize;

                if (value === 'wall') {
                    cube = new THREE.Mesh(cubeGeometry, wallMaterial);
                    cube.position.set(xPos, yPos, 0);
                    scene.add(cube);
                    cubeObjects.push(cube);
                } else if (value === 'dirt') {
                    cube = new THREE.Mesh(cubeGeometry, dirtMaterial);
                    cube.position.set(xPos, yPos, 0);
                    scene.add(cube);
                    cubeObjects.push(cube);
                } else if (value === 'start') {
                    ball = new THREE.Mesh(ballGeometry, ballMaterial);
                    ball.position.set(xPos, yPos, 0);
                    scene.add(ball);
                } else if (value === 'bomb' || value === 'life' || value === 'stonks' || value === 'hole') {
                    const planeGeometry = new THREE.PlaneGeometry(cellSize / 1.75, cellSize / 1.75);
                    const planeMaterial = new THREE.MeshBasicMaterial({
                        map: textureLoader.load(`assets/demo6/${value}.png`),
                        transparent: true,
                    });
                    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
                    plane.position.set(xPos, yPos, 0);
                    scene.add(plane);
                    if (value === 'bomb') bombObjects.push(plane);
                    if (value === 'life') lifeObjects.push(plane);
                    if (value === 'stonks') stonks = plane;
                    if (value === 'hole') hole = plane;
                }
            }
        }

        const checkCollision = (ballPosition, obj) => {
            const ballRadius = ball.geometry.parameters.radius;
            const objSize = obj.geometry.parameters.width;
            const objPosition = obj.position;

            const distance = ballPosition.distanceTo(objPosition);

            return distance <= ballRadius + objSize / 2;
        };

        const onMouseDown = (event) => {
            isDragging = true;
            rotationSpeed = draggingRotationSpeed;
        };

        const onMouseUp = (event) => {
            isDragging = false;
            rotationSpeed = defaultRotationSpeed;
        };

        const onMouseMove = (event) => {
            if (isDragging) {
                const mouseX = event.clientX;
                const mouseY = event.clientY;

                const mouseDeltaX = mouseX - lastMouseX;
                const mouseDeltaY = mouseY - lastMouseY;

                const vector = new THREE.Vector3(
                    (mouseX / window.innerWidth) * 2 - 1,
                    -(mouseY / window.innerHeight) * 2 + 1,
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

                if (
                    ballPosition.x >= minGridX &&
                    ballPosition.x <= maxGridX &&
                    ballPosition.y >= minGridY &&
                    ballPosition.y <= maxGridY
                ) {
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

                ball.rotation.x += rotationSpeed * mouseDeltaY;
                ball.rotation.y += rotationSpeed * mouseDeltaX;

                lastMouseX = mouseX;
                lastMouseY = mouseY;
            }
        };

        const onTouchStart = (event) => {
            const touch = event.touches[0];
            lastMouseX = touch.clientX;
            lastMouseY = touch.clientY;
            onMouseDown();
        };

        const onTouchEnd = () => {
            onMouseUp();
        };

        const onTouchMove = (event) => {
            const touch = event.touches[0];
            const mouseX = touch.clientX;
            const mouseY = touch.clientY;
            const mouseDeltaX = mouseX - lastMouseX;
            const mouseDeltaY = mouseY - lastMouseY;
            onMouseMove({
                clientX: mouseX,
                clientY: mouseY,
                movementX: mouseDeltaX,
                movementY: mouseDeltaY,
            });
            lastMouseX = mouseX;
            lastMouseY = mouseY;
        };

        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchstart', onTouchStart);
        document.addEventListener('touchend', onTouchEnd);
        document.addEventListener('touchmove', onTouchMove);

        const animate = () => {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('touchend', onTouchEnd);
            document.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('resize', updateRendererSize);
            renderer.dispose();
        };
    }, []);

    return <div className="canvas-container" ref={canvasContainerRef} />;
};

export default CanvasContainer;