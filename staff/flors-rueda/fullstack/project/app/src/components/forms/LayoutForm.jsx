import { useState } from 'react';
import editIcons from '../../assets/editIcons/index';
import inLogger from '../../inLogger';
import { validateFloor } from '../../helpers/levelValidators';
import isUserLoggedIn from '../../logic/is-user-logged-in';

const LayoutForm = ({ level, setLevel, setToast, setToastOn, setCost, cost, prices }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const cellOptions = ['bomb', 'empty', 'life', 'stonks', 'dirt', 'start', 'hole'];

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
        const previousOption = level[floorIndex][cellIndex];
        updatedLevel[floorIndex][cellIndex] = selectedOption;
        const dropdownId = `dropdownDefaultRadio_${floorIndex}_${cellIndex}`;
        const dropdown = document.getElementById(dropdownId);
        const previousCost = prices[previousOption] ? prices[previousOption] : 0;
        const newCost = prices[selectedOption] ? prices[selectedOption] : 0;
        setCost(cost - previousCost + newCost);
        setLevel(updatedLevel);
        if (dropdown) {
            dropdown.classList.toggle('hidden');
            setOpenDropdown(null)
        }
    };

    const addFloor = () => {
        const lastFloor = level[level.length - 1];
        if (level.length <= 99 && validateFloor(lastFloor, setToast, setToastOn)) {
            const startIndex = lastFloor.indexOf('hole');
            const newFloor = ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'];
            newFloor.splice(startIndex, 1, 'start');
            const updatedLevel = [...level];
            updatedLevel.push(newFloor);
            setLevel(updatedLevel);
        }
    };

    const duplicateFloor = (floorIndex) => {
        const floorToDuplicate = level[floorIndex]
        if (level.length <= 99 && validateFloor(floorToDuplicate, setToast, setToastOn)) {
            const newFloor = [...floorToDuplicate];
            const updatedLevel = [...level];
            updatedLevel.splice(floorIndex, 0, newFloor);
            setLevel(updatedLevel);
            let floorValue = 0;
            for (const cell of newFloor) {
                if (prices[cell]) floorValue += prices[cell];
            }
            const newCost = cost + floorValue;
            setCost(newCost);
        }
    };

    const removeFloor = () => {
        if (level.length > 1) {
            const lastFloor = level[level.length - 1];
            let floorValue = 0;
            for (const cell of lastFloor) {
                if (prices[cell]) floorValue += prices[cell];
            }
            const newCost = cost - floorValue;
            setCost(newCost);
            const updatedLevel = [...level];
            updatedLevel.pop();
            setLevel(updatedLevel);
        }
    };

    const renderRadioOptions = (floorIndex, cellIndex) => {
        const selectedOption = level[floorIndex][cellIndex];

        return cellOptions.map((option, index) => (
            <li key={`${index}_${floorIndex}_${cellIndex}`} className="flex items-center w-fit">
                <input
                    id={`dropdownDefaultRadio_${floorIndex}_${cellIndex}`}
                    type="radio"
                    value={option}
                    name={`default-radio-${floorIndex}-${cellIndex}`}
                    className="w-4 h-4"
                    onChange={(event) => handleOptionChange(floorIndex, cellIndex, option)}
                    checked={selectedOption === option}
                />
                <span className="text-secondary100 ml-2 text-sm font-mediun flex flex-col gap-1 justify-around">
                    <b>{option === 'stonks' ? 'treasure' : option}</b>
                    {isUserLoggedIn() &&
                        <p className="text-primary300 text-xs font-semibold">{prices[option] ? `${prices[option]} cc` : ''}</p>
                    }
                </span>
            </li >
        ));
    };

    return (
        <>
            {
                level.map((floor, floorIndex) => (
                    <div key={floorIndex} className="flex flex-col">
                        <h3 className="self-center text-xl py-2 text-center font-semibold text-primary100">{`Floor ${-floorIndex}${floorIndex === 99 ? '(max)' : ''}`}</h3>
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
                                        className={`z-20 absolute w-48 bg-light400 mx-auto rounded-lg shadow hidden ${cellIndex === 0 || cellIndex === 3 || cellIndex === 6 ? 'left-1' : 'right-1 lg:left-1'}`}
                                    >
                                        <ul className="p-3 space-y-3 text-sm text-secondary200 grid grid-cols-2 grid-rows-4">
                                            {renderRadioOptions(floorIndex, cellIndex)}
                                            <li></li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {level.length <= 99 && <button onClick={() => duplicateFloor(floorIndex)} className="text-sm text-secondary400 hover:text-secondary200 shadow p-1 px-2 rounded-md self-end mt-2">duplicate floor<i className="bi bi-file-earmark-plus pl-1"></i></button>}
                    </div>
                ))
            }
            <p className="text-lg pt-5 text-center font-bold text-secondary200">remove/add floors</p>
            <div className="pt-5 flex flex-row gap-5">
                <button onClick={removeFloor}><i className={`text-5xl font-bold bi bi-dash-circle-fill ${level.length === 1 ? 'cursor-default text-light100' : 'text-danger200 hover:text-danger100'}`}></i></button>
                <button onClick={addFloor}><i className={`text-5xl font-bold bi bi-plus-circle-fill ${level.length > 99 ? 'cursor-default text-light100' : 'text-success200 hover:text-success100'}`}></i></button>
            </div>
        </>
    )
}

export default inLogger(LayoutForm);