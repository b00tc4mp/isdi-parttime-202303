import inLogger from '../inLogger';
import PasswordForm from '../components/forms/PasswordForm';
import SuccessToast from '../components/toasts/SuccessToast';
import { useState } from 'react';

const Settings = () => {
    const [toast, setToast] = useState(null);

    return (
        <section>
            {toast && <SuccessToast handleCloseToast={() => setToast(null)} message={toast} />}
            <div className="flex flex-col items-center justify-center px-4 pt-24 pb-16" >
                <h1 className="text-3xl font-bold text-center pt-5 text-secondary300">Settings</h1>
                <PasswordForm setToast={setToast} />
            </div>
        </section>
    );
}

export default inLogger(Settings);
