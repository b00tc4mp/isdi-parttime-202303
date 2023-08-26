import { useRef, useState, useEffect } from 'react';
import inLogger from '../../inLogger';
import addRecoveryQuestion from '../../logic/add-recovery-question';
import useAppContext from '../../hooks/useAppContext';

const NewQuestionForm = ({ setToast }) => {
    const [isPasswordValid, setPasswordValid] = useState(null);
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

    const handleAddQuestion = async () => {
        const formElement = formRef.current;
        const formData = new FormData(formElement);

        const password = formData.get('password');
        const question = formData.get('question');
        const answer = formData.get('answer');

        try {
            await addRecoveryQuestion(password, [{ question, answer }]);
            setToast('new question saved');
            setPasswordValid(null);
            formElement.reset();
        } catch (error) {
            if (error.message === 'Failed to add question') {
                alert('wrong credentials');
                setPasswordValid(false);
            } else {
                alert(error.message);
            }
        }
    }

    const handleRecoveryChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue === 0) {
            event.target.setCustomValidity('Please write something that will help you to recover your account.');
        } else {
            event.target.setCustomValidity('');
        }
        event.target.reportValidity();
    }

    const handlePasswordChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue < 8) {
            event.target.setCustomValidity('Password is too short.');
            setPasswordValid(false);
        } else {
            event.target.setCustomValidity('');
            setPasswordValid(true);
        }
        event.target.reportValidity();
    };

    return (
        <div className="w-full bg-secondary600 rounded-lg shadow mt-5 sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h2 className="text-xl font-bold leading-tight tracking-tight text-primary100 md:text-2xl">
                    Add a recovery question
                </h2>
                <form className="space-y-4 md:space-y-6" ref={formRef}>
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
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-secondary100">
                            Confirm with your password
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
                    </div>
                    <button
                        type="button"
                        className="w-full text-primary100 bg-light500 hover:bg-light400 focus:ring-4 focus:outline-none focus:ring-primary300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={handleAddQuestion}
                        ref={submitRef}
                    >
                        Add question
                    </button>
                </form>
            </div>
        </div>
    );
};

export default inLogger(NewQuestionForm);


