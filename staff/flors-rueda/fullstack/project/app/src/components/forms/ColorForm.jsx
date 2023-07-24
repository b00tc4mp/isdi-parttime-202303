import { useState } from 'react';
import inLogger from '../../inLogger';
import { assets } from 'com';

const ColorForm = ({ setColor, onSaveColorChange }) => {
    const [isDropdownOn, setIsDropdownOn] = useState(false);

    const textColors = { gray: 'text-gray', red: 'text-red', orange: 'text-orange', ambar: 'text-ambar', yellow: 'text-yellow', lime: 'text-lime', green: 'text-green', teal: 'text-teal', cyan: 'text-cyan', blue: 'text-blue', indigo: 'text-indigo', violet: 'text-violet', fuchsia: 'text-fuchsia', pink: 'text-pink', rose: 'text-rose' };

    const bgColors = { gray: 'bg-gray', red: 'bg-red', orange: 'bg-orange', ambar: 'bg-ambar', yellow: 'bg-yellow', lime: 'bg-lime', green: 'bg-green', teal: 'bg-teal', cyan: 'bg-cyan', blue: 'bg-blue', indigo: 'bg-indigo', violet: 'bg-violet', fuchsia: 'bg-fuchsia', pink: 'bg-pink', rose: 'bg-rose' };

    const handleDropdownToggle = () => {
        const dropdown = document.getElementById('dropdownRadio');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
            setIsDropdownOn(!isDropdownOn);
        }
    };


    return (
        <div className="w-full bg-secondary600 rounded-lg shadow mt-5 sm:max-w-md">
            <form className="space-y-6 flex flex-col md:flex-row px-2 pb-5 pt-0 gap-2 align-center justify-center" action="POST">
                <div>
                    <button
                        id="dropdownRadioButton"
                        data-dropdown-toggle="dropdownRadioHelper"
                        className="w-full text-sm font-medium text-secondary100 bg-light500 hover:bg-light400 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center flex justify-around items-center mt-6 self-center"
                        type="button"
                        onClick={handleDropdownToggle}
                    >
                        Select a new color color{' '}
                        {isDropdownOn ? <i className="bi bi-x-lg pl-1"></i> : <i className="bi bi-chevron-down pl-1"></i>}
                    </button>
                    <div
                        id="dropdownRadio"
                        className="z-50 absolute w-4/6 md:w-2/6 bg-light400 shadow divide-y divide-light300 rounded-lg hidden"
                    >
                        <ul className="p-3 text-sm grid grid-cols-3 grid-rows-5 gap-2">
                            {assets.colors.map((color, index) => (
                                <li key={`${index}_${color}`} className="flex items-center w-fit">
                                    <input
                                        type="radio"
                                        name="favoriteColor"
                                        className={`form-radio h-4 w-4 cursor-pointer ${textColors[color]} checked:bg-${bgColors[color]}`}
                                        value={color}
                                        onChange={() => setColor(color)}
                                    />
                                    <span className={`${textColors[color]} font-semibold pl-2 pb-0.5`}>{color}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <button
                    type="button"
                    className="w-full md:w-1/2 text-primary100 bg-light500 hover:bg-light400 focus:ring-4 focus:outline-none focus:ring-primary300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={(event) => onSaveColorChange(event)}
                >
                    Save color
                </button>
            </form>
        </div>
    );
};

export default inLogger(ColorForm);