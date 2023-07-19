import { Link, useLocation } from 'react-router-dom';
import inLogger from '../inLogger';
import LoginForm from '../components/LoginForm';
import logo from '../assets/logo-complete.svg';
import { useState } from 'react';
import './background.css';
import ComicCarousel from '../components/ComicCarousel';
import RegisterForm from '../components/RegisterForm';

const SignIn = () => {
    const location = useLocation();
    const { initialView } = location.state ? location.state : {}
    const [view, setView] = useState(initialView ? initialView : 'login');

    const handleGoToRegister = () => setView('register');
    const handleGoToLogin = () => setView('login')

    return (
        <>
            <div className="circle"></div> <div className="circle2"></div> <div className="circle3"></div><div className="circle4"></div>
            <div className="circle5"></div> <div className="circle6"></div> <div className="circle7"></div><div className="circle8"></div>
            <section>
                <div className={`flex flex-col items-center justify-center px-4 pt-24 pb-16 md:px-0${view === 'login' ? 'h-screen' : 'h-fit'} `}>
                    <Link to="/" className="flex items-center">
                        <img className="h-32" src={logo} alt="logo" />
                    </Link>
                    {view === 'login' && <LoginForm onRegister={handleGoToRegister} />}
                    {view === 'register' && <RegisterForm onLogin={handleGoToLogin} />}
                </div>
            </section>
            <ComicCarousel />
        </>

    )
}


export default inLogger(SignIn);