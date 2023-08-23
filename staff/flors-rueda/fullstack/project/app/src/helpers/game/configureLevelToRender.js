/**
 * Configures a level for rendering by adding exterior walls and arranging cells.
 *
 * This function takes a level configuration and configures it for rendering by adding exterior walls and arranging cells.
 * It constructs a new level with walls surrounding each floor and properly arranged cells.
 *
 * @param {[[string]]} levelToConfigure The level configuration to be configured.
 * @returns {[[string]]} The configured level for rendering.
 */
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
