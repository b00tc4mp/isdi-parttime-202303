import { useState } from 'react';
import editIcons from '../../assets/editIcons/index';
import inLogger from '../../inLogger';
import { validateFloor } from '../../helpers/levelValidators';

const LayoutForm = ({ level, setLevel, setToast, setToastOn }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const cellOptions = ['bomb', 'dirt', 'hole', 'stonks', 'start', 'life', 'empty'];

    const handleDropdownToggle = (floorIndex, cellIndex) => {
        const dropdownId = `dropdownDefaultRadio_${floorIndex}_${cellIndex}`;
        const dropdown = document.getElementById(dropdownId);
        const openDropdownId = `dropdownDefaultRadio_${openDropdown}`
        if (openDropdown && openDropdownId !== dropdownId) {
            const openedDropdown = document.getElementById(openDropdownId);
            openedDropdown.classList.toggle('hidden');
            dropdown.classList.toggle('hidden');
            setOpenDropdown(`${floorIndex}_${cellIndex}`);
        } else if (openDropdown && openDropdownId === dropdownId) {
            dropdown.classList.toggle('hidden');
            setOpenDropdown(null);
        } else {
            dropdown.classList.toggle('hidden');
            setOpenDropdown(`${floorIndex}_${cellIndex}`);
        }
    };

    const handleOptionChange = (floorIndex, cellIndex, selectedOption) => {
        const updatedLevel = [...level];
        updatedLevel[floorIndex][cellIndex] = selectedOption;
        const dropdownId = `dropdownDefaultRadio_${floorIndex}_${cellIndex}`;
        const dropdown = document.getElementById(dropdownId);
        setLevel(updatedLevel);
        if (dropdown) {
            dropdown.classList.toggle('hidden');
            setOpenDropdown(null)
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

    const renderRadioOptions = (floorIndex, cellIndex) => {
        const selectedOption = level[floorIndex][cellIndex];

        return cellOptions.map((option, index) => (
            <li key={`${index}_${floorIndex}_${cellIndex}`}>
                <div className="flex items-center">
                    <input
                        id={`dropdownDefaultRadio_${floorIndex}_${cellIndex}`}
                        type="radio"
                        value={option}
                        name={`default-radio-${floorIndex}-${cellIndex}`}
                        className="w-4 h-4"
                        onChange={(event) => handleOptionChange(floorIndex, cellIndex, option)}
                        checked={selectedOption === option}
                    />
                    <span className="ml-2 text-sm font-medium">
                        {option === 'stonks' ? 'treasure' : option}
                    </span>
                </div>
            </li>
        ));
    };

    return (
        <>
            {
                level.map((floor, floorIndex) => (
                    <div key={floorIndex}>
                        <h5 className="text-xl py-2 text-center font-semibold text-primary100">{`Floor ${-floorIndex}${floorIndex === 99 ? '(max)' : ''}`}</h5>
                        <div className="grid grid-cols-3 grid-rows-3 gap-4">
                            {floor.map((cell, cellIndex) => (
                                <div key={`${floorIndex}_${cellIndex}`} className="relative">
                                    <button
                                        id={`dropdownRadioButton_${floorIndex}_${cellIndex}`}
                                        data-dropdown-toggle="dropdownRadioHelper"
                                        className="text-primary300 bg-light300 hover:bg-light200 focus:ring-4 focus:outline-none focus:ring-light200 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                                        type="button"
                                        onClick={() => handleDropdownToggle(floorIndex, cellIndex)}
                                    >
                                        <img src={editIcons[cell]} className="w-14 h-14" alt={cell} />
                                        {
                                            `${floorIndex}_${cellIndex}` === openDropdown ? <i className="bi bi-x-lg"></i> : <i className="bi bi-chevron-down"></i>
                                        }
                                    </button>
                                    <div
                                        id={`dropdownDefaultRadio_${floorIndex}_${cellIndex}`}
                                        className="z-50 absolute right-0 left-0 w-46 bg-light400 divide-y divide-light300 rounded-lg shadow hidden"
                                    >
                                        <ul className="p-3 space-y-3 text-sm text-secondary200">
                                            {renderRadioOptions(floorIndex, cellIndex)}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            }
            <p className="text-lg pt-5 text-center font-bold text-secondary200">remove/add floors</p>
            <div className="pt-5 flex flex-row gap-5">
                <button onClick={removeFloor}><i className="text-5xl text-danger200 hover:text-danger100 font-bold bi bi-dash-circle-fill"></i></button>
                <button onClick={addFloor}><i className="text-5xl text-success200 hover:text-success100 font-bold bi bi-plus-circle-fill"></i></button>
            </div>
        </>
    )
}

export default inLogger(LayoutForm);