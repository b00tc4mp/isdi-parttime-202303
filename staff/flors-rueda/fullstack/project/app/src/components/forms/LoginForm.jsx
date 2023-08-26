import { useEffect, useRef, useState } from 'react';
import inLogger from '../../inLogger';
import { useNavigate } from 'react-router-dom';
import loginUser from '../../logic/login-user';

const LoginForm = ({ onRegister, onRecover, setToast, setConnectSocket }) => {
    const submitRef = useRef();
    const [isUsernameValid, setUsernameValid] = useState(null);
    const [isPasswordValid, setPasswordValid] = useState(null);
    const formRef = useRef(null);
    const navigate = useNavigate();

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

    const onRegisterClick = (event) => {
        event.preventDefault();
        onRegister();
    };

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

        if (inputValue.length < 8) {
            event.target.setCustomValidity('Please, enter your password');
            setPasswordValid(false);
        } else {
            event.target.setCustomValidity('');
            setPasswordValid(true);
        }
        event.target.reportValidity();
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const formElement = formRef.current;
        const formData = new FormData(formElement);

        const username = formData.get('username');
        const password = formData.get('password');

        try {
            await loginUser(username, password);
            setConnectSocket(true);
            navigate('/home');
        } catch (error) {
            setToast(error.message);
            setUsernameValid(false);
            setPasswordValid(false);
        }
    }

    return (
        <div className="w-full bg-secondary600 rounded-lg shadow mt-5 sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-primary100 md:text-2xl">
                    Login
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
                            maxLength={11}
                            className={`border text-secondary200 sm:text-sm rounded-lg block w-full p-2.5 ${isUsernameValid === false ? 'border-danger200 focus:outline-none  focus:ring-danger200 focus:border-danger200' : 'border-light100 focus:outline-none focus:ring-secondary300 focus:border-secondary300'}`}
                            placeholder="UserName42"
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
                            minLength={8}
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className={`border text-secondary200 sm:text-sm rounded-lg block w-full p-2.5 ${isPasswordValid === false ? 'border-danger200 focus:outline-none  focus:ring-danger200 focus:border-danger200' : 'border-light100 focus:outline-none focus:ring-secondary300 focus:border-secondary300'}`}
                            required={true}
                            onChange={handlePasswordChange}
                        />
                        <p className="text-xs text-secondary300 text-end">
                            <a onClick={onRecover} className="font-medium cursor-pointer text-primary200 hover:underline pl-2">
                                Forgot your password?
                            </a>
                        </p>
                    </div>
                    <button
                        type="button"
                        ref={submitRef}
                        className="w-full text-primary100 bg-light500 hover:bg-light400 focus:ring-4 focus:outline-none focus:ring-primary300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={(event) => handleLogin(event)}
                    >
                        Sign in
                    </button>
                </form>
                <p className="text-sm text-secondary300">
                    You are new here?
                    <a onClick={onRegisterClick} className="font-medium cursor-pointer text-primary200 hover:underline pl-2">
                        Register now!
                    </a>
                </p>
            </div>
        </div>
    );
};

export default inLogger(LoginForm);
