import ComicCarousel from '../components/ComicCarousel';
import logo from '../assets/logo-complete.svg';
import achivements from '../assets/buttonsIcons/achivements.svg';
import create from '../assets/buttonsIcons/create.svg';
import customize from '../assets/buttonsIcons/customize.svg';
import earn from '../assets/buttonsIcons/earn.svg';
import explore from '../assets/buttonsIcons/explore.svg';
import friends from '../assets/buttonsIcons/friends.svg';
import heart from '../assets/buttonsIcons/heart.svg';
import more from '../assets/buttonsIcons/more.svg';
import vote from '../assets/buttonsIcons/vote.svg';
import inLogger from '../inLogger';
import './Landing.css'
import { useState } from 'react';

const Landing = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const images = [
        'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg',
        'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(16).jpg',
        'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(17).jpg',
        'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(18).jpg',
        'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(19).jpg',
        'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(20).jpg',
        'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(21).jpg',
        'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg',
        'https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg',
    ];

    const handleFeature1Click = () => setActiveIndex(0);
    const handleFeature2Click = () => setActiveIndex(1);
    const handleFeature3Click = () => setActiveIndex(2);
    const handleFeature4Click = () => setActiveIndex(3);
    const handleFeature5Click = () => setActiveIndex(4);
    const handleFeature6Click = () => setActiveIndex(5);
    const handleFeature7Click = () => setActiveIndex(6);
    const handleFeature8Click = () => setActiveIndex(7);
    const handleFeature9Click = () => setActiveIndex(8);

    return (
        <>
            <div className="circle"></div> <div className="circle2"></div> <div className="circle3"></div><div className="circle4"></div>
            <div className="circle5"></div> <div className="circle6"></div> <div className="circle7"></div><div className="circle8"></div>
            <div className="flex flex-col w-full justify-center items-center pt-28 gap-5">
                <img src={logo} className="w-4/6" alt="Logo" />
                <div className="flex flex-col gap-5 md:gap-1 md:flex-row w-5/6 justify-center align-center bg-light300 rounded-xl opacity-90">
                    <div className="flex flex-col w-full justify-center align-center">
                        <h1 className="text-secondary400 text-xl font-bold text-center pt-2 w-full">JOIN THE MAZE RIDES</h1>
                        <div className="flex self-center flex-col gap-5 justify-center align-center px-4 pt-2 md:py-4">
                            <div className="flex flex-row gap-5">
                                <button onClick={handleFeature1Click} className={`p-2 rounded ${activeIndex === 0 ? "bg-primary300" : "bg-secondary600 hover:bg-secondary500"}`}>
                                    <img src={create} className="w-10" alt="create" />
                                </button>
                                <button onClick={handleFeature2Click} className={`p-2 rounded ${activeIndex === 1 ? "bg-primary300" : "bg-secondary600 hover:bg-secondary500"}`}>
                                    <img src={explore} className="w-10" alt="explore" />
                                </button>
                                <button onClick={handleFeature3Click} className={`p-2 rounded ${activeIndex === 2 ? "bg-primary300" : "bg-secondary600 hover:bg-secondary500"}`}>
                                    <img src={earn} className="w-10" alt="earn" />
                                </button>
                            </div>
                            <div className="flex flex-row gap-5">
                                <button onClick={handleFeature4Click} className={`p-2 rounded ${activeIndex === 3 ? "bg-primary300" : "bg-secondary600 hover:bg-secondary500"}`}>
                                    <img src={vote} className="w-10" alt="vote" />
                                </button>
                                <button onClick={handleFeature5Click} className={`p-2 rounded ${activeIndex === 4 ? "bg-primary300" : "bg-secondary600 hover:bg-secondary500"}`}>
                                    <img src={heart} className="w-10" alt="save" />
                                </button>
                                <button onClick={handleFeature6Click} className={`p-2 rounded ${activeIndex === 5 ? "bg-primary300" : "bg-secondary600 hover:bg-secondary500"}`}>
                                    <img src={achivements} className="w-10" alt="achivements" />
                                </button>
                            </div>
                            <div className="flex flex-row gap-5">
                                <button onClick={handleFeature7Click} className={`p-2 rounded ${activeIndex === 6 ? "bg-primary300" : "bg-secondary600 hover:bg-secondary500"}`}>
                                    <img src={customize} className="w-10" alt="vote" />
                                </button>
                                <button onClick={handleFeature8Click} className={`p-2 rounded ${activeIndex === 7 ? "bg-primary300" : "bg-secondary600 hover:bg-secondary500"}`}>
                                    <img src={friends} className="w-10" alt="save" />
                                </button>
                                <button onClick={handleFeature9Click} className={`p-2 rounded ${activeIndex === 8 ? "bg-primary300" : "bg-secondary600 hover:bg-secondary500"}`}>
                                    <img src={more} className="w-10" alt="achivements" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full justify-center align-center p-2">
                        <img src={images[activeIndex]} alt={`Feature ${activeIndex + 1}`} className="mx-auto align-self lg:h-96 lg:w-96 md:h-72 md:w-72 h-60 w-60 rounded-lg" />
                    </div>


                </div>
                <ComicCarousel />
            </div>
        </>

    )
}

export default inLogger(Landing);