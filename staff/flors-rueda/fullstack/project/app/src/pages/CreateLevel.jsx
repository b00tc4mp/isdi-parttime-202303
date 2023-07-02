import { useState } from 'react';
import { validateFloor, validateLevel } from '../helpers/levelValidators';
import { configureLevelToRender } from '../helpers/configureLevelToRender';
import editIcons from '../assets/editIcons/index';
import createLevel from '../logic/create-level';
import inLogger from '../inLogger';

//TODO mark selected ratio on load
//TODO only one ratio list open each time

const CreateLevel = ({ onTryLevelClick }) => {
    const [toast, setToast] = useState(null);
    const [isToastOn, setToastOn] = useState(false)
    const [level, setLevel] = useState([
        ['empty', 'stonks', 'hole', 'empty', 'empty', 'empty', 'empty', 'empty', 'start'],
    ]);

    const cellOptions = ['bomb', 'dirt', 'hole', 'stonks', 'start', 'life', 'empty'];

    const handleCloseToast = () => setToastOn(false);

    const handleOptionChange = (floorIndex, cellIndex, selectedOption) => {
        const updatedLevel = [...level];
        updatedLevel[floorIndex][cellIndex] = selectedOption;
        const dropdownId = `dropdownDefaultRadio_${floorIndex}_${cellIndex}`;
        const dropdown = document.getElementById(dropdownId);
        setLevel(updatedLevel);
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    };

    const addFloor = () => {
        const lastFloor = level[level.length - 1];
        if (level.length < 99 && validateFloor(lastFloor, setToast, setToastOn)) {
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

    const handleOnTryLevel = () => {
        const name = document.getElementById('level-name').value;
        if (validateLevel(level, name, setToast, setToastOn)) {
            try {
                createLevel(name, level, error => {
                    if (error) {
                        console.log(`create level error: ${error.message}`)
                        return;
                    }
                    onTryLevelClick(configureLevelToRender(level));
                });

            } catch (error) {
                alert(`create level error: ${error.message}`, 'danger');
            }
        }
    }

    const handleDropdownToggle = (floorIndex, cellIndex) => {
        const dropdownId = `dropdownDefaultRadio_${floorIndex}_${cellIndex}`;
        const dropdown = document.getElementById(dropdownId);
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    };

    return (
        <>
            {isToastOn &&
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div id="toast-warning" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
                        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg">
                            <i className="bi bi-exclamation-triangle"></i>
                        </div>
                        <div className="ml-3 text-sm font-normal">{toast}</div>
                        <button type="button" onClick={handleCloseToast} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8" data-dismiss-target="#toast-warning" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                </div>
            }
            <div className="flex items-center flex-col gap-2 pt-20 pb-5">
                <div className="flex items-center py-2">
                    <div className="w-1/3">
                        <label className="block text-secondary300 font-bold md:text-right mb-1 md:mb-0 pr-4" forhtml="level-name">
                            Level name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-light300 appearance-none border-2 border-light100 rounded w-full py-2 px-4 text-dark400 leading-tight focus:outline-none focus:bg-primary600 focus:border-secondary400" id="level-name" type="text" />
                    </div>
                </div>
                {level.map((floor, floorIndex) => (
                    <div className="" key={floorIndex}>
                        <h5 className="text-xl py-2 text-center font-semibold text-primary100">{`Floor ${-floorIndex}${floorIndex === 99 ? '(max)' : ''}`}</h5>
                        <div className="grid grid-cols-3 grid-rows-3 gap-4">
                            {floor.map((cell, cellIndex) => (
                                <div key={cellIndex} className="relative">
                                    <button
                                        id={`dropdownRadioButton_${floorIndex}_${cellIndex}`}
                                        data-dropdown-toggle="dropdownRadioHelper"
                                        className="text-white bg-light300 hover:bg-light200 focus:ring-4 focus:outline-none focus:ring-light200 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                                        type="button"
                                        onClick={() => handleDropdownToggle(floorIndex, cellIndex)}
                                    >
                                        <img src={editIcons[cell]} className="w-14 h-14" alt={cell} />
                                        <i className="bi bi-chevron-down"></i>
                                    </button>
                                    <div
                                        id={`dropdownDefaultRadio_${floorIndex}_${cellIndex}`}
                                        className="z-50 absolute right-0 left-0 w-46 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 hidden"
                                    >
                                        <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
                                            {cellOptions.map((option, index) => (
                                                <li key={index}>
                                                    <div className="flex items-center">
                                                        <input id={`dropdownDefaultRadio_${floorIndex}_${cellIndex}`} type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2" onChange={(event) => handleOptionChange(floorIndex, cellIndex, option)} />
                                                        <label forhtml={`dropdownDefaultRadio_${floorIndex}_${cellIndex}`} className="ml-2 text-sm font-medium text-gray-900">{option}</label>
                                                    </div>
                                                </li>

                                            ))}

                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <p className="text-lg pt-5 text-center font-bold text-secondary200">remove/add floors</p>
                <div className="pt-5 flex flex-row gap-5">
                    <button className="text-3xl bg-red-500 hover:bg-red-700 text-white font-bold pb-2 px-4 rounded-full" onClick={removeFloor}>-</button>
                    <button className="text-3xl bg-green-500 hover:bg-green-700 text-white font-bold pb-2 px-3 rounded-full" onClick={addFloor}>+</button>
                </div>
                <div className="pt-5 pb-20">
                    <button className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded" onClick={handleOnTryLevel}>try and post</button>
                </div>
            </div>
        </>
    );
};

export default inLogger(CreateLevel);
