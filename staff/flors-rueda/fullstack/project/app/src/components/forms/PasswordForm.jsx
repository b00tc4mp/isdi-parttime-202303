import { useRef, useState, useEffect } from 'react';
import inLogger from '../../inLogger';
import updatePassword from '../../logic/update-password';
import useAppContext from '../../hooks/useAppContext';

const PasswordForm = ({ setToast }) => {
    const [isPasswordValid, setPasswordValid] = useState(null);
    const [isRepeatPasswordValid, setRepeatPasswordValid] = useState(null);
    const [isOldPasswordValid, setOldPasswordValid] = useState(null);
    const formRef = useRef();
    const submitRef = useRef();
    const { alert } = useAppContext();

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

    const handleUpdatePassword = async () => {
        const formElement = formRef.current;
        const formData = new FormData(formElement);

        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');
        const oldPassword = formData.get('oldPassword');

        try {
            await updatePassword(password, repeatPassword, oldPassword);
            setToast('new password saved');
            setOldPasswordValid(null);
            setPasswordValid(null);
            setRepeatPasswordValid(null);
            formElement.reset();
        } catch (error) {
            if (error.message === 'Failed to update password') {
                alert('wrong credentials');
                setOldPasswordValid(false);
            } else {
                alert(error.message);
                setPasswordValid(false);
                setRepeatPasswordValid(false);
            }
        }
    }

    const handleOldPasswordChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue < 8) {
            event.target.setCustomValidity('Password is too short.');
            setOldPasswordValid(false);
        } else {
            event.target.setCustomValidity('');
            setOldPasswordValid(true);
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


    return (
        <div className="w-full bg-secondary600 rounded-lg shadow mt-5 sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-primary100 md:text-2xl">
                    Change your password
                </h1>
                <form className="space-y-4 md:space-y-6" ref={formRef}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-secondary100">
                            New password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            minLength={8}
                            className={`border text-secondary200 sm:text-sm rounded-lg block w-full mb-3 p-2.5 ${isPasswordValid === false ? 'border-danger200 focus:outline-none  focus:ring-danger200 focus:border-danger200' : 'border-light100 focus:outline-none focus:ring-secondary300 focus:border-secondary300'}`}
                            required={true}
                            onChange={handlePasswordChange}
                        />
                        <input
                            type="password"
                            name="repeatPassword"
                            id="repeatPassword"
                            minLength={8}
                            placeholder="confirm your password"
                            className={`border text-secondary200 sm:text-sm rounded-lg block w-full mb-3 p-2.5 ${isRepeatPasswordValid === false ? 'border-danger200 focus:outline-none  focus:ring-danger200 focus:border-danger200' : 'border-light100 focus:outline-none focus:ring-secondary300 focus:border-secondary300'}`}
                            required={true}
                            onChange={handleRepeatPasswordChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="oldPassword" className="block mb-1 text-sm font-medium text-secondary100">
                            Confirm with your old password
                        </label>
                        <input
                            type="password"
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="••••••••"
                            minLength={8}
                            className={`border text-secondary200 sm:text-sm rounded-lg block w-full mb-3 p-2.5 ${isOldPasswordValid === false ? 'border-danger200 focus:outline-none focus:ring-danger200 focus:border-danger200' : 'border-light100 focus:outline-none focus:ring-secondary300 focus:border-secondary300'}`}
                            required={true}
                            onChange={handleOldPasswordChange}
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full text-primary100 bg-light500 hover:bg-light400 focus:ring-4 focus:outline-none focus:ring-primary300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={handleUpdatePassword}
                        ref={submitRef}
                    >
                        Change password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default inLogger(PasswordForm);


