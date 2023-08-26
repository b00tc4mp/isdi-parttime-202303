import { useEffect, useRef, useState } from 'react';
import inLogger from '../../inLogger';
import { assets } from 'com';
import loginUser from '../../logic/login-user';
import registerUser from '../../logic/register-user';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ onLogin, setConnectSocket, setToast }) => {
    const [isDropdownOn, setIsDropdownOn] = useState(false);
    const [selectedColor, setSelectedColor] = useState();
    const [color, setColor] = useState('orange');
    const [isUsernameValid, setUsernameValid] = useState(null);
    const [isPasswordValid, setPasswordValid] = useState(null);
    const [isRepeatPasswordValid, setRepeatPasswordValid] = useState(null);
    const navigate = useNavigate();

    const formRef = useRef();
    const submitRef = useRef();

    const textColors = { gray: 'text-gray', red: 'text-red', orange: 'text-orange', ambar: 'text-ambar', yellow: 'text-yellow', lime: 'text-lime', green: 'text-green', teal: 'text-teal', cyan: 'text-cyan', blue: 'text-blue', indigo: 'text-indigo', violet: 'text-violet', fuchsia: 'text-fuchsia', pink: 'text-pink', rose: 'text-rose' };

    const bgColors = { gray: 'bg-gray', red: 'bg-red', orange: 'bg-orange', ambar: 'bg-ambar', yellow: 'bg-yellow', lime: 'bg-lime', green: 'bg-green', teal: 'bg-teal', cyan: 'bg-cyan', blue: 'bg-blue', indigo: 'bg-indigo', violet: 'bg-violet', fuchsia: 'bg-fuchsia', pink: 'bg-pink', rose: 'bg-rose' };

    const handleEnterDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            submitRef.current.click();
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const parentElement = submitRef.current.parentElement;
        parentElement.addEventListener('keydown', handleEnterDown);

        return () => {
            parentElement.removeEventListener('keydown', handleEnterDown);
        };
    }, []);

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

    const handleChoseColor = (color) => {
        setSelectedColor(color);
        setColor(color);
        handleDropdownToggle(color);
    }

    const handleUsernameChange = (event) => {
        const inputValue = event.target.value;
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;

        if (!alphanumericRegex.test(inputValue)) {
            event.target.setCustomValidity('Only letters and numbers are allowed.');
            setUsernameValid(false);
        } else if (inputValue.length >= 12) {
            event.target.setCustomValidity('Username too long.');
            setUsernameValid(false);
        } else {
            event.target.setCustomValidity('');
            setUsernameValid(true);
        }
        event.target.reportValidity();
    };

    const handlePasswordChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue < 8) {
            event.target.setCustomValidity('Password is too short to be secure.');
            setPasswordValid(false);
        } else {
            event.target.setCustomValidity('');
            setPasswordValid(true);
        }
        event.target.reportValidity();
    };

    const handleRecoveryChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue === 0) {
            event.target.setCustomValidity('Please write something that will help you to recover your account.');
        } else {
            event.target.setCustomValidity('');
        }
        event.target.reportValidity();
    };

    const handleRepeatPasswordChange = (event) => {
        const inputValue = event.target.value;
        const formElement = formRef.current;
        const formData = new FormData(formElement);
        const password = formData.get('password');

        if (inputValue !== password) {
            event.target.setCustomValidity('Password and confirmation password are not the same');
            setRepeatPasswordValid(false);
        } else {
            event.target.setCustomValidity('');
            setRepeatPasswordValid(true);
        }
        event.target.reportValidity();
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        const formElement = formRef.current;
        const formData = new FormData(formElement);

        const username = formData.get('username');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');
        const recoveryQuestions = [
            {
                question: formData.get('question'),
                answer: formData.get('answer'),
            }
        ];

        try {
            await registerUser(username, password, repeatPassword, recoveryQuestions, color);
            await loginUser(username, password);
            setConnectSocket(true);
            navigate('/home');
        } catch (error) {
            if (!error.message) {
                setToast('Username not available');
                setUsernameValid(false);
            }
        }
    }

    return (
        <div className="w-full bg-secondary600 rounded-lg shadow mt-5 sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-primary100 md:text-2xl">
                    Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" ref={formRef}>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-secondary100">
                            Your username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className={`border text-secondary200 sm:text-sm rounded-lg block w-full p-2.5 ${isUsernameValid === false ? 'border-danger200 focus:outline-none focus:ring-danger200 focus:border-danger200' : 'border-light100 focus:outline-none focus:ring-secondary300 focus:border-secondary300'}`}
                            placeholder="UserName42"
                            required={true}
                            maxLength={11}
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
                            minLength={8}
                            className={`border text-secondary200 sm:text-sm rounded-lg block w-full p-2.5 ${isPasswordValid === false ? 'border-danger200 focus:outline-none focus:ring-danger200 focus:border-danger200' : 'border-light100 focus:outline-none focus:ring-secondary300 focus:border-secondary300'}`}
                            required={true}
                            onChange={handlePasswordChange}
                        />
                        <input
                            type="password"
                            name="repeatPassword"
                            id="repeatPassword"
                            minLength={8}
                            placeholder="confirm your password"
                            className={`border text-secondary200 sm:text-sm rounded-lg block w-full p-2.5 ${isRepeatPasswordValid === false ? 'border-danger200 focus:outline-none focus:ring-danger200 focus:border-danger200' : 'border-light100 focus:outline-none focus:ring-secondary300 focus:border-secondary300'}`}
                            required={true}
                            onChange={handleRepeatPasswordChange}
                        />
                    </div>
                    <div>
                        <button
                            id="dropdownRadioButton"
                            data-dropdown-toggle="dropdownRadioHelper"
                            className={`bg-light500 w-full flex flex-row justify-between hover:bg-light400 focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center items-center self-center ${selectedColor ? textColors[selectedColor] : 'text-secondary100'}`}
                            type="button"
                            onClick={handleDropdownToggle}
                        >
                            {selectedColor ? selectedColor : 'Your favorite color'}
                            {isDropdownOn ? <i className="text-secondary100 bi bi-x-lg pl-2"></i> : <i className="text-secondary100 bi bi-chevron-down pl-1"></i>}
                        </button>
                        <div
                            id="dropdownRadio"
                            className="z-20 absolute w-4/6 md:w-2/6 bg-light400 shadow divide-y divide-light300 rounded-lg hidden"
                        >
                            <ul className="p-3 text-sm grid grid-cols-3 grid-rows-5 gap-2">
                                {assets.colors.map((color, index) => (
                                    <li key={`${index}_${color}`} className="flex items-center w-fit">
                                        <input
                                            type="radio"
                                            name="favoriteColor"
                                            className={`form-radio h-4 w-4 cursor-pointer ${textColors[color]} checked:bg-${bgColors[color]}`}
                                            value={color}
                                            onChange={() => handleChoseColor(color)}
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
                            className="border text-secondary200 sm:text-sm rounded-lg focus:outline-none focus:ring-secondary300 focus:border-secondary300 block w-full p-2.5 'border-light100 bg-light500"
                            required={true}
                            onChange={handleRecoveryChange}
                        />
                        <input
                            type="text"
                            name="answer"
                            id="answer"
                            placeholder="your answer"
                            className="border text-secondary200 sm:text-sm rounded-lg focus:outline-none focus:ring-secondary300 focus:border-secondary300 block w-full p-2.5 'border-light100 bg-light500"
                            required={true}
                            onChange={handleRecoveryChange}
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full text-primary100 bg-light500 hover:bg-light400 focus:ring-4 focus:outline-none focus:ring-primary300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={(event) => handleRegister(event)}
                        ref={submitRef}
                    >
                        Create an account
                    </button>
                </form>
                <p className="text-sm text-secondary300">
                    Already have an account?
                    <a onClick={onLoginClick} className="font-medium pl-2 cursor-pointer text-primary200 hover:underline">
                        Sign in here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default inLogger(RegisterForm);


