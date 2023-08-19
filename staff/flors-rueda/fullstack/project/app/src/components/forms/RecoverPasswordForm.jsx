import inLogger from '../../inLogger';
import { useState } from 'react';
import RecoverPasswordFormUsername from './RecoverPasswordFormUsername';
import RecoverPasswordFormAnswer from './RecoverPasswordFormAnswer'
import RecoverPasswordFormNewPassword from './RecoverPasswordFormNewPassword';

const RecoverPasswordForm = ({ onExit, setToast }) => {
    const [step, setStep] = useState(0);
    const [username, setUsername] = useState('');
    const [recoveryQuestion, setRecoveryQuestion] = useState(null);
    const [isRecoverySuccessful, setRecoverySuccessful] = useState(null);

    return (
        <div className="w-full bg-secondary600 rounded-lg shadow mt-5 sm:max-w-md">
            <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-lg font-bold leading-tight tracking-tight text-primary100 md:text-xl">Recover your password</h1>
                {step === 0 &&
                    <RecoverPasswordFormUsername setStep={setStep} setUsername={setUsername} setRecoveryQuestion={setRecoveryQuestion} step={step} setToast={setToast} />
                }
                {step === 1 &&
                    <RecoverPasswordFormAnswer recoveryQuestion={recoveryQuestion} username={username} step={step} setStep={setStep} setRecoverySuccessful={setRecoverySuccessful} setToast={setToast} />
                }
                {step === 2 &&
                    <RecoverPasswordFormNewPassword setStep={setStep} step={step} username={username} setToast={setToast} />
                }
                {step === 3 &&
                    <div>
                        <p className="block mb-2 text-sm font-medium text-secondary100">
                            {isRecoverySuccessful ?
                                'Password changed! You can login now.'
                                :
                                'Something went wrong, please try again'
                            }
                        </p>
                    </div>
                }
                <p className="text-xs text-secondary300 text-end">
                    <button onClick={onExit} className="font-medium text-primary200 hover:underline pl-2">
                        Go back to login
                    </button>
                    {
                        step === 3 && !isRecoverySuccessful && <button onClick={() => setStep(0)} className="font-medium text-primary200 hover:underline pl-2">
                            ||<span className="pl-2">Start again</span>
                        </button>
                    }
                </p>
            </div>
        </div>

    )
}

export default inLogger(RecoverPasswordForm);