import { useNavigate } from 'react-router-dom';
import inLogger from '../inLogger';
import { useState } from 'react';
import useHandleErrors from '../hooks/useHandleErrors';
import ColorForm from '../components/forms/ColorForm';
import updateColor from '../logic/update-color';
import AvatarForm from '../components/forms/AvatarForm';

const Customize = () => {
    const [color, setColor] = useState('orange')
    const handleErrors = useHandleErrors();
    const navigate = useNavigate();

    const changeColor = (event) => {
        event.preventDefault();

        handleErrors(async () => {
            await updateColor(color);
            navigate('/levels');
        })
    }

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-4 pt-24 pb-16" >
                <h1 className="text-3xl font-bold text-center pt-5 text-secondary300">Customize your profile</h1>
                <ColorForm setColor={setColor} onSaveColorChange={changeColor} />
                <h1 className="text-2xl font-bold text-center pt-10 text-secondary300">Chose your maze rider</h1>
                <AvatarForm />
            </div>
        </section>
    );
}

export default inLogger(Customize);
