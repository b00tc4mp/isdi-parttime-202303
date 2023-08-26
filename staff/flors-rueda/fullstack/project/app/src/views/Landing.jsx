import ComicCarousel from '../components/landing/ComicCarousel';
import { Link, useNavigate } from 'react-router-dom';
import Previews from '../components/landing/Previews';
import TrophiesPreview from '../components/landing/TrophiesPreviews';
import RandomRider from '../components/landing/RandomRider';
import ThingsToDo from '../components/landing/ThingsToDo';
import logo from '../assets/logo-complete.svg';
import win from '../assets/win.svg';
import build from '../assets/build.svg';
import inLogger from '../inLogger';
import './background.css';

const Landing = () => {
    const navigate = useNavigate();

    const handleToRegister = () => {
        navigate('/signin', { state: { startingForm: 'register' } });
    }

    return (
        <>
            <div className="circle"></div> <div className="circle2"></div> <div className="circle3"></div><div className="circle4"></div>
            <div className="circle5"></div> <div className="circle6"></div> <div className="circle7"></div><div className="circle8"></div>
            <section className="flex flex-col w-full justify-center items-center pt-28">
                <div className="flex-col flex justify-center items-center">
                    <img src={logo} className="w-4/6 md:w-1/3 mb-2" alt="Logo" />
                    <h1 className="self-center text-4xl md:text-5xl text-center font-bold text-dark200 text-shadow mb-3">Play. Create. Explore. Enjoy.</h1>
                    <h2 className="self-center text-center text-xl md:text-2xl font-semibold text-dark500  text-shadow pb-5">A web game to create and play original levels.</h2>
                </div>
                <div className="flex flex-col md:flex-row gap-2 w-full justify-center align-center">
                    <button onClick={handleToRegister} className="bg-primary100 self-center md:w-fit max-w-xs w-3/4 px-5 pt-2 pb-2.5 hover:bg-transparent text-2xl text-light500 hover:text-primary100 border border-primary100 font-bold rounded-2xl transition duration-200 text-center">Join the Riders</button>
                    <p className="self-center text-lg md:text-xl font-semibold text-light100 ">- or - </p>
                    <Link to="/tutorial" className="bg-secondary300 self-center md:w-fit max-w-xs w-3/4  px-5 hover:bg-transparent  pt-2 pb-2.5 text-2xl text-light500 hover:text-secondary300 border border-secondary300 font-bold rounded-2xl transition duration-200 text-center">Learn the basics</Link>
                </div>
                <Previews />
                <TrophiesPreview />
                <div className="flex flex-col md:flex-row w-full justify-center px-2 md:px-10 bg-secondaryShadow items-center py-4 md:py-1">
                    <h2 className="text-2xl md:text-3xl text-center font-bold text-dark100 text-shadow">With every level you play, you win Customization Credits.</h2>
                    <img src={win} className="w-4/6 md:w-1/3" alt="Logo" />
                </div>
                <div className="flex flex-col md:flex-row-reverse w-full justify-center px-2 md:px-10 bg-primaryShadow items-center py-12">
                    <h2 className="text-2xl md:text-3xl text-center font-bold text-dark100 text-shadow">Spend those on creating more levels or unlocking new maze riders...</h2>
                    <img src={build} className="w-4/6 md:w-1/3" alt="Logo" />
                </div>
                <RandomRider />
                <ThingsToDo handleToRegister={handleToRegister} />
                <ComicCarousel />
            </section>
        </>

    )
}

export default inLogger(Landing);