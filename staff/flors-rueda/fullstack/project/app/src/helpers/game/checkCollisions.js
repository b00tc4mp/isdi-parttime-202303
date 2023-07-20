const checkCollision = (ballPosition, ball, obj) => {
    const ballRadius = ball.geometry.parameters.radius;
    const objSize = obj.geometry.parameters.width;
    const objPosition = obj.position;

    const distance = ballPosition.distanceTo(objPosition);

    return distance <= ballRadius + objSize / 2;
};

const checkPosition = (ballPosition, ball, obj) => {
    const objPosition = obj.position;
    const ballAboveObj = ballPosition.y > objPosition.y;

    return checkCollision(ballPosition, ball, obj) && ballAboveObj;
};

export const checkCollisions = (ball, ballPosition, scene, floorObjects, onSolved, onGameWon, onBomb, onLife) => {
    let canMoveBall = true;
    const { cubeObjects, bombObjects, lifeObjects, hole, stonks } = floorObjects

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
        scene.remove(ball);
        return;
    }


}
