export const getGameCC = (gameData) => {
    const { stonks, holes, bombs, life, } = gameData;
    let cc = stonks ? 50 : 10;
    cc += (holes * 5) + (bombs * 2) + (life * 3);
    return cc;
}
