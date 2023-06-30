export const configureLevelToRender = (levelToConfigure) => {
    const exteriorWall = ['wall', 'wall', 'wall', 'wall', 'wall'];
    const finalLevel = [];
    levelToConfigure.forEach((floor) => {
        const finalFloor = [exteriorWall];
        for (let row = 0; row < 3; row++) {
            const finalRow = ['wall'];
            for (let column = 0; column < 3; column++) {
                finalRow.push(floor[row * 3 + column]);
            }
            finalRow.push('wall');
            finalFloor.push(finalRow);
        }
        finalFloor.push(exteriorWall);
        finalLevel.push(finalFloor);
    });
    return finalLevel;
};
