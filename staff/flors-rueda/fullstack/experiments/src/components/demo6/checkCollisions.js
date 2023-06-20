const checkCollision = (ballPosition, ball, obj) => {
    const ballRadius = ball.geometry.parameters.radius;
    const objSize = obj.geometry.parameters.width;
    const objPosition = obj.position;

    const distance = ballPosition.distanceTo(objPosition);

    return distance <= ballRadius + objSize / 2;
};

export const checkCollisions = (ball, ballPosition, scene, floorObjects, onSolved, onGameWon) => {
    let canMoveBall = true;
    const { cubeObjects, bombObjects, lifeObjects, hole, stonks } = floorObjects

    for (const obj of cubeObjects) {
        if (checkCollision(ballPosition, ball, obj)) {
            canMoveBall = false;
            return;
        }
        if (canMoveBall) {
            ball.position.copy(ballPosition);
        }
    }

    for (const obj of bombObjects) {
        if (checkCollision(ballPosition, ball, obj)) {
            scene.remove(obj);
            const index = bombObjects.indexOf(obj);
            bombObjects.splice(index, 1);
            console.log('boom');
            return;
        }
    }

    for (const obj of lifeObjects) {
        if (checkCollision(ballPosition, ball, obj)) {
            scene.remove(obj);
            const index = lifeObjects.indexOf(obj);
            lifeObjects.splice(index, 1);
            console.log('life ++');
            return;
        }
    }

    if (hole && checkCollision(ballPosition, ball, hole)) {
        console.log('level complete');
        onSolved();
        return;
    }

    if (stonks && checkCollision(ballPosition, ball, stonks)) {
        console.log('stonks');
        onGameWon();
        scene.remove(ball);
        return;
    }


}
