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
    const { cubeObjects, bombObjects, lifeObjects, hole, stonks } = floorObjects;

    for (const obj of cubeObjects) {
        if (checkCollision(ballPosition, ball, obj)) {
            canMoveBall = false;
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
            onBomb();
            return;
        }
    }

    for (const obj of lifeObjects) {
        if (checkCollision(ballPosition, ball, obj)) {
            scene.remove(obj);
            const index = lifeObjects.indexOf(obj);
            lifeObjects.splice(index, 1);
            onLife();
            return;
        }
    }

    if (hole && checkPosition(ballPosition, ball, hole)) {
        const timerThreshold = 1000;
        const scaleFactor = 0.8;

        setTimeout(() => {
            const interval = setInterval(() => {
                ball.scale.multiplyScalar(scaleFactor);
                if (ball.scale.x < 0.01) {
                    clearInterval(interval);
                    onSolved();
                    return;
                }
            }, 100);
        }, timerThreshold);
    }

    if (stonks && checkCollision(ballPosition, ball, stonks)) {
        onGameWon();
        return;
    }
}
