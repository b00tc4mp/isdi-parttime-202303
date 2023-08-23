import { useEffect } from 'react';
import * as THREE from 'three';
import { createFloor } from '../helpers/game/createFloor';
import { checkCollisions } from '../helpers/game/checkCollisions';

/**
 * Custom hook for handling ball movement and interactions.
 *
 * @param {[string]} floor The game floor configuration.
 * @param {THREE.Scene} scene The scene in which the game is rendered.
 * @param {THREE.PerspectiveCamera} camera The camera used for rendering the scene.
 * @param {function} onSolved Callback function when the puzzle is solved.
 * @param {function} onGameWon Callback function when the game is won.
 * @param {function} onBomb Callback function when the ball collides with a bomb.
 * @param {function} onLife Callback function when the ball collides with a life object.
 * @param {string} avatar The avatar of the ball.
 */
const useMoveHandler = (floor, scene, camera, onSolved, onGameWon, onBomb, onLife, avatar) => {
    const gridSize = floor.length;
    const cellSize = 1.5;

    const floorObjects = createFloor(floor, scene, cellSize, avatar);
    const ball = floorObjects.ball;

    let isDragging = false;
    const defaultRotationSpeed = 0.01;
    const draggingRotationSpeed = 0.07;
    let rotationSpeed = defaultRotationSpeed;

    let lastClientX = 0;
    let lastClientY = 0;

    useEffect(() => {
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
                    checkCollisions(ball, ballPosition, scene, floorObjects, onSolved, onGameWon, onBomb, onLife);
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

        return () => {
            document.removeEventListener('mousedown', onMoveStart);
            document.removeEventListener('mouseup', onMoveEnd);
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('touchstart', onMoveStart);
            document.removeEventListener('touchend', onMoveEnd);
            document.removeEventListener('touchmove', onMove);

        };
    }, []);

    return;
};

export default useMoveHandler;