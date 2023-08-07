import inLogger from '../../inLogger';
import { Link } from 'react-router-dom';
import isUserLoggedIn from '../../logic/is-user-logged-in';

const RecoverPasswordForm = ({ onExit, onRecoverPassword }) => {
    const [step, setStep] = useState(0);
    const [username, setUsername] = useState(null);

    const handleRecoverPassword = () => {
        //recoverPassword
        onExit();
    }

    const handleGetQuestion = () => {
        setUsername(document.getElementById('username').value);
        console.log(username);

    }


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
        <div className="fixed inset-0 flex w-full h-full pt-10 items-center justify-center z-30">
            <div className="w-full h-full p-4 text-dark300 text-center bg-light400 rounded-lg shadow">
                <div className="flex items-center flex-col justify-center gap-10 py-20 px-10">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-primary100 md:text-2xl">Recover your password</h1>
                    {step === 0 &&
                        <div>
                            <h1 className="text-lg font-bold text-secondary200">
                                Enter your username to get one of your recovering questions:
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="POST" ref={formRef}>
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
                                >
                                    Get your question
                                </button>
                            </form>
                        </div>

                    }

                </div>
            </div>

        </div>

    )
}

export default inLogger(RecoverPasswordForm);