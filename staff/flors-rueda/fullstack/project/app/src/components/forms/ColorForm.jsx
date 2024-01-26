import { useEffect, useState } from 'react';
import inLogger from '../../inLogger';
import { assets } from 'com';
import useHandleErrors from '../../hooks/useHandleErrors';
import retrieveLoggedUser from '../../logic/retrieve-logged-user';
import updateColor from '../../logic/update-color';
import Loader from '../Loader';

const ColorForm = ({ setUpdateUserInfo, setToast }) => {
    const [isDropdownOn, setIsDropdownOn] = useState(false);
    const [color, setColor] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleErrors = useHandleErrors();

    const textColors = { gray: 'text-gray', red: 'text-red', orange: 'text-orange', ambar: 'text-ambar', yellow: 'text-yellow', lime: 'text-lime', green: 'text-green', teal: 'text-teal', cyan: 'text-cyan', blue: 'text-blue', indigo: 'text-indigo', violet: 'text-violet', fuchsia: 'text-fuchsia', pink: 'text-pink', rose: 'text-rose' };

    const bgColors = { gray: 'bg-gray', red: 'bg-red', orange: 'bg-orange', ambar: 'bg-ambar', yellow: 'bg-yellow', lime: 'bg-lime', green: 'bg-green', teal: 'bg-teal', cyan: 'bg-cyan', blue: 'bg-blue', indigo: 'bg-indigo', violet: 'bg-violet', fuchsia: 'bg-fuchsia', pink: 'bg-pink', rose: 'bg-rose' };

    const handleDropdownToggle = () => {
        const dropdown = document.getElementById('dropdownRadio');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
            setIsDropdownOn(!isDropdownOn);
        }
    };

    const changeColor = (color) => {
        setIsLoading(true);
        handleErrors(async () => {
            setUpdateUserInfo(false);
            await updateColor(color);
            setToast('new color saved');
            setUpdateUserInfo(true);
            handleDropdownToggle();
        })
        setIsLoading(false);
    }

    useEffect(() => {
        handleErrors(async () => {
            const user = await retrieveLoggedUser();
            setColor(user.color);
        })
    }), []

    return (
        <>
            {isLoading && <Loader />}
            <div className="w-full bg-secondary600 rounded-lg shadow mt-5 sm:max-w-md">
                <form className="flex flex-row w-full px-2 py-3 gap-2 align-center justify-center items-center">
                    <h2 className="text-2xs font-bold text-secondary300 self-center">Select color</h2>
                    <div>
                        <button
                            id="dropdownRadioButton"
                            data-dropdown-toggle="dropdownRadioHelper"
                            className={`w-36 font-medium bg-light500 hover:bg-light400 focus:outline-none rounded-lg text-sm px-4 py-2.5 text-center flex justify-between items-center self-center ${color ? textColors[color] : 'text-secondary200'}`}
                            type="button"
                            onClick={handleDropdownToggle}
                        >
                            {color}
                            {isDropdownOn ? <i className="text-secondary100  bi bi-x-lg pl-1"></i> : <i className="text-secondary100 bi bi-chevron-down pl-1"></i>}
                        </button>
                        <div
                            id="dropdownRadio"
                            className="z-20 left-10 md:left-1/2 absolute w-4/6 md:w-2/6 bg-light400 shadow divide-y divide-light300 rounded-lg hidden"
                        >
                            <ul className="p-3 text-sm grid grid-cols-3 grid-rows-5 gap-2">
                                {assets.colors.map((color, index) => (
                                    <li key={`${index}_${color}`} className="flex items-center w-fit">
                                        <input
                                            type="radio"
                                            name="favoriteColor"
                                            className={`form-radio h-4 w-4 cursor-pointer ${textColors[color]} checked:bg-${bgColors[color]}`}
                                            value={color}
                                            onChange={() => changeColor(color)}
                                        />
                                        <span className={`${textColors[color]} font-semibold pl-2 pb-0.5`}>{color}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default inLogger(ColorForm);