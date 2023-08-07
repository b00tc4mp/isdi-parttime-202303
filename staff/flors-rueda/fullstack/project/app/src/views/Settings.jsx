import { useNavigate } from 'react-router-dom';
import inLogger from '../inLogger';
import { useRef, useState } from 'react';
import useHandleErrors from '../hooks/useHandleErrors';
import ColorForm from '../components/forms/ColorForm';
import updatePassword from '../logic/update-password';
import PasswordForm from '../components/forms/PasswordForm';

const Settings = () => {
    const handleErrors = useHandleErrors();
    const navigate = useNavigate();
    const formRef = useRef();

    const handleUpdatePassword = (event) => {
        event.preventDefault();

        const formElement = formRef.current;
        const formData = new FormData(formElement);

        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');
        const oldPassword = formData.get('oldPassword');

        handleErrors(async () => {
            await updatePassword(password, repeatPassword, oldPassword);
            navigate('/profile/you');
        })
    }

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-4 pt-24 pb-16" >
                <h1 className="text-3xl font-bold text-center pt-5 text-secondary300">Settings</h1>
                <PasswordForm onUpdatePassword={handleUpdatePassword} formRef={formRef} />
            </div>
        </section>
    );
}

export default inLogger(Settings);
