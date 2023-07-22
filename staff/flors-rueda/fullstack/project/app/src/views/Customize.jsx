import { Link, useLocation, useNavigate } from 'react-router-dom';
import inLogger from '../inLogger';
import logo from '../assets/logo-complete.svg';
import { useState, useEffect, useRef } from 'react';
import useHandleErrors from '../hooks/useHandleErrors';
import ColorForm from '../components/forms/ColorForm';
import updateColor from '../logic/update-color';

const Customize = () => {
    const location = useLocation();
    const { startingForm } = location.state ? location.state : {};
    const [form, setForm] = useState(startingForm ? startingForm : 'login');
    const formRef = useRef(null);
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
            </div>
        </section>
    );
}

export default inLogger(Customize);
