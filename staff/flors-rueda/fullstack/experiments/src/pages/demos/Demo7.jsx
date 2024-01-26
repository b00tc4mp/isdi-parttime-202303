import { useState } from 'react';
import './Demo7.css';

const Demo7 = ({ onTryLevel }) => {
    const [toast, setToast] = useState(null);
    const [isToastOn, setToastOn] = useState(false)
    const [level, setLevel] = useState([
        ['empty', 'stonks', 'hole', 'empty', 'empty', 'empty', 'empty', 'empty', 'start'],
    ]);
    const cellOptions = ['bomb', 'dirt', 'hole', 'stonks', 'start', 'life', 'empty'];

    const validateFloor = (floor) => {
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

    const validateLevel = (level) => {
        const lastFloor = level[level.length - 1]
        const stonksCount = lastFloor.filter((cell) => cell === 'stonks').length;
        const holeCount = lastFloor.filter((cell) => cell === 'hole').length;
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
        return true;
    };

    const handleCloseToast = () => setToastOn(false);

    const handleOptionChange = (floorIndex, cellIndex, selectedOption) => {
        const updatedLevel = [...level];
        updatedLevel[floorIndex][cellIndex] = selectedOption;
        setLevel(updatedLevel);
    };

    const addFloor = () => {
        const lastFloor = level[level.length - 1];
        if (level.length < 99 && validateFloor(lastFloor)) {
            const startIndex = lastFloor.indexOf('hole');
            const newFloor = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'];
            newFloor.splice(startIndex, 1, 'start');
            const updatedLevel = [...level];
            updatedLevel.push(newFloor);
            setLevel(updatedLevel);
        }
    };

    const removeFloor = () => {
        if (level.length > 1) {
            const updatedLevel = [...level];
            updatedLevel.pop();
            setLevel(updatedLevel);
        }
    };

    const configureLevel = (levelToSave) => {
        const exteriorWall = ['wall', 'wall', 'wall', 'wall', 'wall'];
        const finalLevel = [];
        levelToSave.forEach((floor) => {
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

    const handleOnTryLevel = () => {
        if (validateLevel(level)) {
            onTryLevel(configureLevel(level));
        }
    }

    return (
        <>{isToastOn &&
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div id="toast-warning" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Warning icon</span>
                    </div>
                    <div className="ml-3 text-sm font-normal">{toast}</div>
                    <button type="button" onClick={handleCloseToast} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8" data-dismiss-target="#toast-warning" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
        }
            <div className="level">
                {level.map((floor, floorIndex) => (
                    <div className="floor-info" key={floorIndex}>
                        <h5>{`Floor ${-floorIndex}${floorIndex === 99 ? '(max)' : ''}`}</h5>
                        <div className="floor">
                            {floor.map((cell, cellIndex) => (
                                <div className={`cell-${cellIndex}`} key={cellIndex}>
                                    <select
                                        className="bg-gray-50 border border-red-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5"
                                        value={cell}
                                        onChange={(event) => handleOptionChange(floorIndex, cellIndex, event.target.value)}
                                    >
                                        {cellOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <img src={`assets/demo7/${cell}.png`} className="w-14 h-14" alt={cell} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="buttons">
                    <button className="text-3xl bg-green-500 hover:bg-green-700 text-white font-bold pb-2 px-4 rounded-full" onClick={addFloor}>+</button>
                    <button className="text-3xl bg-red-500 hover:bg-red-700 text-white font-bold pb-2 px-4 rounded-full" onClick={removeFloor}>-</button>
                </div>
            </div>
            <div className="buttons mt-5">
                <button className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded" onClick={handleOnTryLevel}>Try level</button>
            </div>
        </>
    );
};

export default Demo7;
