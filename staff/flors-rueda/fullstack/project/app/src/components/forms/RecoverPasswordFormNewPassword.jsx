import inLogger from '../../inLogger';
import { useEffect, useRef, useState } from 'react';
import recoverPassword from '../../logic/recover-password';
import useHandleErrors from '../../hooks/useHandleErrors';

const RecoverPasswordFormNewPassword = ({ setStep, step, username }) => {
    const handleErrors = useHandleErrors();
    const submitRef = useRef();
    const formRef = useRef();
    const [isPasswordValid, setPasswordValid] = useState(null);
    const [isRepeatPasswordValid, setRepeatPasswordValid] = useState(null);

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

    const handleRecoverPassword = (event) => {
        event.preventDefault();

        const formElement = formRef.current;
        const formData = new FormData(formElement);
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');

        handleErrors(async () => {
            await recoverPassword(username, password, repeatPassword);
            setStep(step + 1);
        })
    };

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


    return (
        <div>
            <form className="space-y-4 md:space-y-6" ref={formRef}>
                <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-secondary100">
                        Set your new password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        minLength={8}
                        className={`border text-secondary200 sm:text-sm rounded-lg block w-full mb-3 p-2.5 ${isPasswordValid === false ? 'border-danger200 focus:outline-none focus:ring-danger200 focus:border-danger200' : 'border-light100 focus:outline-none focus:ring-secondary300 focus:border-secondary300'}`}
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
                <button
                    type="button"
                    className="w-full text-primary100 bg-light500 hover:bg-light400 focus:ring-4 focus:outline-none focus:ring-primary300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={handleRecoverPassword}
                    ref={submitRef}
                >
                    Set your new password
                </button>
            </form>
        </div>
    );
};

export default inLogger(RecoverPasswordFormNewPassword);
