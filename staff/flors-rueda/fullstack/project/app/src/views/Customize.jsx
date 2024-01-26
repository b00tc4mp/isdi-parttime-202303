import inLogger from '../inLogger';
import ColorForm from '../components/forms/ColorForm';
import AvatarForm from '../components/forms/AvatarForm';
import { useState } from 'react';
import SuccessToast from '../components/toasts/SuccessToast';

const Customize = ({ setUpdateUserInfo }) => {
    const [toast, setToast] = useState(null);

    return (
        <section>
            {toast && <SuccessToast handleCloseToast={() => setToast(null)} message={toast} />}
            <div className="flex flex-col items-center justify-center px-4 pt-24 pb-16" >
                <h1 className="text-3xl font-bold text-center pt-5 text-secondary300">Customize your profile</h1>
                <ColorForm setUpdateUserInfo={setUpdateUserInfo} setToast={setToast} />
                <h2 className="text-2xl font-bold text-center pt-10 text-secondary300">Chose your maze rider</h2>
                <AvatarForm setUpdateUserInfo={setUpdateUserInfo} setToast={setToast} />
            </div>
        </section>
    );
}

export default inLogger(Customize);
