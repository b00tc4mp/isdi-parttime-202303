import { Link, useLocation, useNavigate } from 'react-router-dom';
import inLogger from '../inLogger';
import LoginForm from '../components/forms/LoginForm';
import logo from '../assets/logo-complete.svg';
import { useState, useEffect, useRef } from 'react';
import './background.css';
import ComicCarousel from '../components/ComicCarousel';
import RegisterForm from '../components/forms/RegisterForm';
import loginUser from '../logic/login-user';
import registerUser from '../logic/register-user';
import useHandleErrors from '../hooks/useHandleErrors';

const SignIn = () => {
    const location = useLocation();
    const { startingForm } = location.state ? location.state : {};
    const [form, setForm] = useState(startingForm ? startingForm : 'login');
    const formRef = useRef(null);
    const [color, setColor] = useState('orange')
    const handleErrors = useHandleErrors();
    const navigate = useNavigate();

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

    const handleLogin = (event) => {
        event.preventDefault();
        const formElement = formRef.current;
        const formData = new FormData(formElement);

        const username = formData.get('username');
        const password = formData.get('password');

        handleErrors(async () => {
            await loginUser(username, password);
            navigate('/levels');
        })
    }

    const handleRegister = (event) => {
        event.preventDefault();

        const formElement = formRef.current;
        const formData = new FormData(formElement);

        const username = formData.get('username');
        const password = formData.get('password');
        const repeatPassword = formData.get('repeatPassword');
        const recoveryQuestions = [
            {
                question: formData.get('question'),
                answer: formData.get('answer'),
            }
        ]

        handleErrors(async () => {
            await registerUser(username, password, repeatPassword, recoveryQuestions, color);
            await loginUser(username, password);
            navigate('/levels');
        })
    }

    useEffect(() => {
        const { startingForm } = location.state ? location.state : {};
        setForm(startingForm ? startingForm : 'login');
    }, [location.state]);

    return (
        <>
            <div className="circle"></div> <div className="circle2"></div> <div className="circle3"></div><div className="circle4"></div>
            <div className="circle5"></div> <div className="circle6"></div> <div className="circle7"></div><div className="circle8"></div>
            <section>
                <div className={`flex flex-col items-center justify-center px-4 pt-24 pb-16 md:px-0${form === 'login' ? 'h-screen' : 'h-fit'} `}>
                    <Link to="/" className="flex items-center">
                        <img className="h-32" src={logo} alt="logo" />
                    </Link>
                    {form === 'login' && <LoginForm onRegister={handleGoToRegister} onLoginUser={handleLogin} formRef={formRef} />}
                    {form === 'register' && <RegisterForm onLogin={handleGoToLogin} onRegisterUser={handleRegister} formRef={formRef} setColor={setColor} />}
                </div>
            </section>
            <ComicCarousel />
        </>
    );
}

export default inLogger(SignIn);
