/**
 * Validates a floor configuration.
 *
 * @param {[string]} floor An array representing the floor configuration.
 * @param {function} setToast A function to set the toast message.
 * @param {function} setToastOn A function to set the visibility of the toast.
 * @returns {boolean} `true` if the floor is valid, `false` otherwise.
 */
export const validateFloor = (floor, setToast, setToastOn) => {
    const startCount = floor.filter((cell) => cell === 'start').length;
    const holeCount = floor.filter((cell) => cell === 'hole').length;
    const stonksCount = floor.filter((cell) => cell === 'stonks').length;
    if (startCount !== 1) {
        setToast('floor needs a starting point');
        setToastOn(true);
        return;
    }
    if (holeCount !== 1) {
        setToast('to add a new floor you need one hole');
        setToastOn(true)
        return;
    }
    if (stonksCount > 0) {
        setToast('the treasure have to be in the last floor');
        setToastOn(true)
        return;
    }
    return true;
};

/**
 * Validates a level configuration.
 * 
 * @param {[[string]]} level An array of arrays representing the level configuration.
 * @param {string} name The name of the level.
 * @param {function} setToast A function to set the toast message.
 * @param {function} setToastOn A function to set the visibility of the toast.
 * @returns {boolean} `true` if the level is valid, `false` otherwise.
 */
export const validateLevel = (level, name, setToast, setToastOn) => {
    const lastFloor = level[level.length - 1]
    const stonksCount = lastFloor.filter((cell) => cell === 'stonks').length;
    const holeCount = lastFloor.filter((cell) => cell === 'hole').length;
    const startCount = lastFloor.filter((cell) => cell === 'start').length;
    if (stonksCount !== 1) {
        setToast('the last floor needs one treasure!');
        setToastOn(true)
        return;
    }
    if (holeCount > 0) {
        setToast('the last floor shouldn\'t have any hole');
        setToastOn(true)
        return;
    }
    if (startCount !== 1) {
        setToast('floor needs a starting point');
        setToastOn(true)
        return;
    }
    if (!name) {
        setToast('the level needs a name');
        setToastOn(true)
        return;
    }
    return true;
};