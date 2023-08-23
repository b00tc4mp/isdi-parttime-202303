/**
 * Calculates the "Customization Credits" (CC) value for a given game data.
 *
 * @param {object} gameData The game data containing stonks, holes, bombs, and life element counts.
 * @returns {number} The calculated CC value for the game data.
 */
export const getGameCC = (gameData) => {
    const { stonks, holes, bombs, life, } = gameData;
    let cc = stonks ? 50 : 10;
    cc += (holes * 5) + (bombs * 2) + (life * 3);
    return cc;
}
