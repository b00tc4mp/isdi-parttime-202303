import { useState } from 'react';
import inLogger from '../inLogger';
import { assets } from 'com';

const RegisterForm = ({ onLogin }) => {
    const [isDropdownOn, setIsDropdownOn] = useState(false);

    const textColors = { gray: 'text-gray', red: 'text-red', orange: 'text-orange', ambar: 'text-ambar', yellow: 'text-yellow', lime: 'text-lime', green: 'text-green', teal: 'text-teal', cyan: 'text-cyan', blue: 'text-blue', indigo: 'text-indigo', violet: 'text-violet', fuchsia: 'text-fuchsia', pink: 'text-pink', rose: 'text-rose' };

    const bgColors = { gray: 'bg-gray', red: 'bg-red', orange: 'bg-orange', ambar: 'bg-ambar', yellow: 'bg-yellow', lime: 'bg-lime', green: 'bg-green', teal: 'bg-teal', cyan: 'bg-cyan', blue: 'bg-blue', indigo: 'bg-indigo', violet: 'bg-violet', fuchsia: 'bg-fuchsia', pink: 'bg-pink', rose: 'bg-rose' };

    const onLoginClick = (event) => {
        event.preventDefault();
        onLogin();
    };

    const handleDropdownToggle = () => {
        const dropdown = document.getElementById('dropdownRadio');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
            setIsDropdownOn(!isDropdownOn);
        }
    };

    const handleUsernameChange = (event) => {
        const inputValue = event.target.value;
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;

        if (!alphanumericRegex.test(inputValue)) {
            event.target.setCustomValidity('Only letters and numbers are allowed.');
        } else {
            event.target.setCustomValidity('');
        }
    };

    return (
        <div className="w-full bg-secondary600 rounded-lg shadow mt-5 sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-primary100 md:text-2xl">
                    Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-secondary100">
                            Your username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="bg-light500 border border-light100 text-secondary200 sm:text-sm rounded-lg focus:outline-none focus:ring-secondary300 focus:border-secondary300 block w-full p-2.5"
                            placeholder="UserName123"
                            required={true}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-secondary100">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-light500 border border-light100 text-secondary200 sm:text-sm rounded-lg focus:outline-none focus:ring-secondary300 focus:border-secondary300 block w-full p-2.5"
                            required={true}
                        />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="confirm your password"
                            className="bg-light500 border border-light100 text-secondary200 sm:text-sm rounded-lg focus:outline-none focus:ring-secondary300 focus:border-secondary300 block w-full p-2.5"
                            required={true}
                        />
                    </div>
                    <div>
                        <button
                            id="dropdownRadioButton"
                            data-dropdown-toggle="dropdownRadioHelper"
                            className="text-sm font-medium text-secondary100 bg-light500 hover:bg-light400 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center self-center"
                            type="button"
                            onClick={handleDropdownToggle}
                        >
                            Your favorite color{' '}
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
                                        />
                                        <span className={`${textColors[color]} font-semibold pl-2 pb-0.5`}>{color}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="question" className="block mb-1 text-sm font-medium text-secondary100">
                            Recovery question
                            <span className="block mb-1 pt-1 text-xs font-medium text-light100">
                                this will be your way to recover the password, so use something only you know.
                            </span>
                        </label>
                        <input
                            type="text"
                            name="question"
                            id="question"
                            placeholder="your question"
                            className="bg-light500 border border-light100 text-secondary200 sm:text-sm rounded-lg focus:outline-none focus:ring-secondary300 focus:border-secondary300 block w-full p-2.5"
                            required={true}
                        />
                        <input
                            type="text"
                            name="answer"
                            id="answer"
                            placeholder="your answer"
                            className="bg-light500 border border-light100 text-secondary200 sm:text-sm rounded-lg focus:outline-none focus:ring-secondary300 focus:border-secondary300 block w-full p-2.5"
                            required={true}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-primary100 bg-light500 hover:bg-light400 focus:ring-4 focus:outline-none focus:ring-primary300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Create an account
                    </button>
                    <p className="text-sm text-secondary300">
                        Already have an account?
                        <button onClick={onLoginClick} className="font-medium pl-2 text-primary200 hover:underline">
                            Sign in here
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default inLogger(RegisterForm);


