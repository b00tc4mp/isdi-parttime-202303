export const validateFloor = (floor, setToast, setToastOn) => {
    const startCount = floor.filter((cell) => cell === 'start').length;
    const holeCount = floor.filter((cell) => cell === 'hole').length;
    const stonksCount = floor.filter((cell) => cell === 'stonks').length;
    if (startCount !== 1) {
        setToast('floor needs a starting point');
        setToastOn(true)
        return console.log('floor needs a starting point');
    }
    if (holeCount !== 1) {
        setToast('to add a new floor you need one hole');
        setToastOn(true)
        return console.log('to add a new floor you need one hole');
    }
    if (stonksCount > 0) {
        setToast('the stonks have to be in the last floor');
        setToastOn(true)
        return console.log('the stonks have to be in the last floor');
    }
    return true;
};

export const validateLevel = (level, name, setToast, setToastOn) => {
    const lastFloor = level[level.length - 1]
    const stonksCount = lastFloor.filter((cell) => cell === 'stonks').length;
    const holeCount = lastFloor.filter((cell) => cell === 'hole').length;
    const startCount = lastFloor.filter((cell) => cell === 'start').length;
    if (stonksCount !== 1) {
        setToast('the last floor needs one stonks!');
        setToastOn(true)
        return console.log('the last floor needs one stonks!');
    }
    if (holeCount > 0) {
        setToast('the last floor shouldn\'t have any hole');
        setToastOn(true)
        return console.log('the last floor shouldn\'t have any hole');
    }
    if (startCount !== 1) {
        setToast('floor needs a starting point');
        setToastOn(true)
        return console.log('floor needs a starting point');
    }
    if (!name) {
        setToast('the level needs a name');
        setToastOn(true)
        return console.log('the level needs a name');
    }
    return true;
};