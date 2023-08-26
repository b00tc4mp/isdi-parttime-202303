import inLogger from '../inLogger';
import PasswordForm from '../components/forms/PasswordForm';
import SuccessToast from '../components/toasts/SuccessToast';
import { useEffect, useState } from 'react';
import NewQuestionForm from '../components/forms/NewQuestionForm';

const Settings = () => {
    const [toast, setToast] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <section>
            {toast && <SuccessToast handleCloseToast={() => setToast(null)} message={toast} />}
            <div className="flex flex-col items-center justify-center px-4 pt-16 pb-24" >
                <h1 className="text-3xl font-bold text-center pt-5 text-secondary300">Settings</h1>
                <PasswordForm setToast={setToast} />
                <NewQuestionForm setToast={setToast} />
            </div>
        </section>
    );
}

export default inLogger(Settings);
