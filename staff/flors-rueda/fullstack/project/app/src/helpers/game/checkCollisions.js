import bombSound from '/game/sounds/bomb.mp3';
import cubeSound from '/game/sounds/cube.mp3';
import holeSound from '/game/sounds/hole.mp3';
import lifeSound from '/game/sounds/life.mp3';
import winSound from '/game/sounds/win.mp3';
const bombAudio = new Audio(bombSound);
const cubeAudio = new Audio(cubeSound);
const holeAudio = new Audio(holeSound);
const lifeAudio = new Audio(lifeSound);
const winAudio = new Audio(winSound);

/**
 * Checks if a ball collides with an object.
 *
 * @param {Vector3} ballPosition The position of the ball.
 * @param {Mesh} ball The ball object.
 * @param {Mesh} obj The object to check collision with.
 * @returns {boolean} `true` if collision occurs, `false` otherwise.
 */
const checkCollision = (ballPosition, ball, obj) => {
    const ballRadius = ball.geometry.parameters.radius;
    const objSize = obj.geometry.parameters.width;
    const objPosition = obj.position;

    const distance = ballPosition.distanceTo(objPosition);

    return distance <= ballRadius + objSize / 2;
};

/**
 * Checks if a ball's position is above an object and collides with it.
 *
 * @param {Vector3} ballPosition The position of the ball.
 * @param {Mesh} ball The ball object.
 * @param {Mesh} obj The object to check position and collision with.
 * @returns {boolean} `true` if both collision and position conditions are met, `false` otherwise.
 */
const checkPosition = (ballPosition, ball, obj) => {
    const objPosition = obj.position;
    const ballAboveObj = ballPosition.y > objPosition.y;

    return checkCollision(ballPosition, ball, obj) && ballAboveObj;
};

/**
 * Checks for collisions and interactions between the ball and various objects in the scene.
 *
 * @param {Mesh} ball The ball object.
 * @param {Vector3} ballPosition The position of the ball.
 * @param {Scene} scene The scene where objects are placed.
 * @param {object} floorObjects An object containing cubeObjects, bombObjects, lifeObjects, hole, and stonks.
 * @param {function} onSolved A function to be called when the level is solved.
 * @param {function} onGameWon A function to be called when the game is won.
 * @param {function} onBomb A function to be called when the ball interacts with a bomb.
 * @param {function} onLife A function to be called when the ball interacts with a life object.
 */
export const checkCollisions = (ball, ballPosition, scene, floorObjects, onSolved, onGameWon, onBomb, onLife) => {
    let canMoveBall = true;
    const { wallObjects, cubeObjects, bombObjects, lifeObjects, hole, stonks } = floorObjects;

    for (const obj of wallObjects) {
        if (checkCollision(ballPosition, ball, obj)) {
            canMoveBall = false;
            return;
        }
    }

    for (const obj of cubeObjects) {
        if (checkCollision(ballPosition, ball, obj)) {
            canMoveBall = false;
            cubeAudio.play();
            return;
        }
    }

    if (canMoveBall) {
        ball.position.copy(ballPosition);
    }

    for (const obj of bombObjects) {
        if (checkCollision(ballPosition, ball, obj)) {
            scene.remove(obj);
            const index = bombObjects.indexOf(obj);
            bombObjects.splice(index, 1);
            bombAudio.play();
            onBomb();
            return;
        }
    }

    for (const obj of lifeObjects) {
        if (checkCollision(ballPosition, ball, obj)) {
            scene.remove(obj);
            const index = lifeObjects.indexOf(obj);
            lifeObjects.splice(index, 1);
            lifeAudio.play();
            onLife();
            return;
        }
    }

    if (hole && checkPosition(ballPosition, ball, hole)) {
        const timerThreshold = 100;
        const scaleFactor = 0.8;
        holeAudio.play();

        setTimeout(() => {
            const interval = setInterval(() => {
                ball.scale.multiplyScalar(scaleFactor);
                if (ball.scale.x < 0.01) {
                    clearInterval(interval);
                    onSolved();
                    return;
                }
            }, 25);
        }, timerThreshold);
    }

    if (stonks && checkCollision(ballPosition, ball, stonks)) {
        winAudio.play();
        onGameWon();
        return;
    }
}
