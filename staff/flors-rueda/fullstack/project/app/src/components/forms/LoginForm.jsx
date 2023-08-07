import { useEffect, useRef } from 'react';
import inLogger from '../../inLogger';


const LoginForm = ({ onRegister, onRecover, onLoginUser, formRef }) => {
    const submitRef = useRef();

    const handleEnterDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            submitRef.current.click();
        }
    };

    useEffect(() => {
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
        } else {
            event.target.setCustomValidity('');
        }
        event.target.reportValidity();
    };

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
                            maxLength={12}
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
                            minLength={8}
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-light500 border border-light100 text-secondary200 sm:text-sm rounded-lg focus:outline-none focus:ring-secondary300 focus:border-secondary300 block w-full p-2.5"
                            required={true}
                        />
                        <p className="text-xs text-secondary300 text-end">
                            <button onClick={onRecover} className="font-medium text-primary200 hover:underline pl-2">
                                Forgot your password?
                            </button>
                        </p>
                    </div>
                    <button
                        type="button"
                        ref={submitRef}
                        className="w-full text-primary100 bg-light500 hover:bg-light400 focus:ring-4 focus:outline-none focus:ring-primary300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={(event) => onLoginUser(event)}
                    >
                        Sign in
                    </button>
                </form>
                <p className="text-sm text-secondary300">
                    You are new here?
                    <button onClick={onRegisterClick} className="font-medium text-primary200 hover:underline pl-2">
                        Register now!
                    </button>
                </p>
            </div>
        </div>
    );
};

export default inLogger(LoginForm);
