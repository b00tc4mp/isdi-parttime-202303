import inLogger from '../../inLogger';
import { useEffect, useRef, useState } from 'react';
import retrieveRandomRecoveryQuestion from '../../logic/retrieve-random-recovery-question';
import useHandleErrors from '../../hooks/useHandleErrors';

const RecoverPasswordFormUsername = ({ setRecoveryQuestion, setUsername, setStep, step }) => {
    const handleErrors = useHandleErrors();
    const submitRef = useRef();
    const usernameRef = useRef();

    const handleGetQuestion = (event) => {
        event.preventDefault();

        const formElement = usernameRef.current;
        const formData = new FormData(formElement);
        const username = formData.get('username');

        setUsername(username);

        handleErrors(async () => {
            const question = await retrieveRandomRecoveryQuestion(username);
            setRecoveryQuestion(question);
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
        const parentElement = submitRef.current.parentElement;
        parentElement.addEventListener('keydown', handleEnterDown);

        return () => {
            parentElement.removeEventListener('keydown', handleEnterDown);
        };
    }, []);

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
        <div>
            <form className="space-y-4 md:space-y-6" ref={usernameRef}>
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
                <button
                    type="button"
                    className="w-full text-primary100 bg-light500 hover:bg-light400 focus:ring-4 focus:outline-none focus:ring-primary300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={handleGetQuestion}
                    ref={submitRef}
                >
                    Get your question
                </button>
            </form>
        </div>
    );
};

export default inLogger(RecoverPasswordFormUsername);
