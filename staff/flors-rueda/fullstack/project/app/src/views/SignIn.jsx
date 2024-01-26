import { Link, useLocation, useNavigate } from 'react-router-dom';
import inLogger from '../inLogger';
import LoginForm from '../components/forms/LoginForm';
import logo from '../assets/logo-complete.svg';
import { useState, useEffect } from 'react';
import './background.css';
import ComicCarousel from '../components/landing/ComicCarousel';
import RegisterForm from '../components/forms/RegisterForm';
import RecoverPasswordForm from '../components/forms/RecoverPasswordForm';
import AlertToast from '../components/toasts/AlertToast';

const SignIn = ({ setConnectSocket }) => {
    const location = useLocation();
    const { startingForm } = location.state ? location.state : {};
    const [form, setForm] = useState(startingForm ? startingForm : 'login');
    const [isRecoverOn, setRecoverOn] = useState(false);
    const [toast, setToast] = useState('');

    const handleGoToRegister = () => {
        if (form === 'register') {
            setForm('login');
        } else {
            setForm('register');
        }
    };

    const handleGoToLogin = () => {
        if (form === 'login') {
            setForm('register');
        } else {
            setForm('login');
        }
    };

    useEffect(() => {
        const { startingForm } = location.state ? location.state : {};
        setForm(startingForm ? startingForm : 'login');
    }, [location.state]);

    return (
        <>
            {
                toast && <AlertToast message={toast} handleCloseAlert={() => setToast('')} />
            }
            <div className="circle"></div> <div className="circle2"></div> <div className="circle3"></div><div className="circle4"></div>
            <div className="circle5"></div> <div className="circle6"></div> <div className="circle7"></div><div className="circle8"></div>
            <section>
                <div className={`flex flex-col items-center justify-center px-4 pt-24 pb-16 md:px-0${form === 'login' ? 'h-screen' : 'h-fit'} `}>
                    <Link to="/" className="flex items-center">
                        <img className="h-32" src={logo} alt="logo" />
                    </Link>
                    {isRecoverOn && <RecoverPasswordForm onExit={() => setRecoverOn(false)} setToast={setToast} />}
                    {!isRecoverOn && form === 'login' && <LoginForm onRegister={handleGoToRegister} setConnectSocket={setConnectSocket} setToast={setToast} onRecover={() => setRecoverOn(true)} />}
                    {!isRecoverOn && form === 'register' && <RegisterForm onLogin={handleGoToLogin} setConnectSocket={setConnectSocket} setToast={setToast} />}
                </div>
            </section>
            <ComicCarousel />
        </>
    );
}

export default inLogger(SignIn);
