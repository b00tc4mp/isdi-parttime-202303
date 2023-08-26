import inLogger from '../../inLogger';
import { useEffect, useRef } from 'react';
import checkRecoveryAnswer from '../../logic/check-recovery-answer';
import useHandleErrors from '../../hooks/useHandleErrors';

const RecoverPasswordFormAnswer = ({ recoveryQuestion, setStep, step, username, setRecoverySuccessful }) => {
    const handleErrors = useHandleErrors();
    const submitRef = useRef();
    const answerRef = useRef();

    const handleCheckAnswer = (event) => {
        event.preventDefault();

        const formElement = answerRef.current;
        const formData = new FormData(formElement);
        const answer = formData.get('answer');

        handleErrors(async () => {
            const isAnswerCorrect = await checkRecoveryAnswer(username, recoveryQuestion.id, answer);
            setRecoverySuccessful(isAnswerCorrect);
            isAnswerCorrect ? setStep(step + 1) : setStep(step + 2);
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
            <form className="space-y-4 md:space-y-6" ref={answerRef}>
                <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-secondary100">
                        {recoveryQuestion.question}
                    </label>
                    <input
                        type="text"
                        name="answer"
                        id="answer"
                        className="bg-light500 border border-light100 text-secondary200 sm:text-sm rounded-lg focus:outline-none focus:ring-secondary300 focus:border-secondary300 block w-full p-2.5"
                        placeholder="your answer"
                        required={true}
                    />
                </div>
                <button
                    type="button"
                    className="w-full text-primary100 bg-light500 hover:bg-light400 focus:ring-4 focus:outline-none focus:ring-primary300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={handleCheckAnswer}
                    ref={submitRef}
                >
                    Send your answer
                </button>
            </form>
        </div>
    );
};

export default inLogger(RecoverPasswordFormAnswer);
