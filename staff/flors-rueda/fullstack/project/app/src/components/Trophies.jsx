import { useState } from 'react';
import inLogger from '../inLogger';
import Loader from './Loader';
import ranks from '../assets/trophies/ranks'
import codes from '../assets/trophies/codes'

const Trophies = ({ achievements }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    if (achievements === null) {
        return <Loader />
    }

    const goToPreviousSlide = () => {
        if (activeIndex !== 0) {
            const newIndex = (activeIndex - 2);
            setActiveIndex(newIndex);
        }
    };

    const goToNextSlide = () => {
        if (activeIndex < achievements.length - 2) {
            const newIndex = (activeIndex + 2);
            setActiveIndex(newIndex);
        }
    };

    if (achievements && achievements.length === 0) {
        return <p className="w-full flex align-center items-center justify-center text-dark200 text-xl">No trophies here!</p>;
    }

    return (

        <div className="flex items-center w-full justify-around">
            {
                achievements.length > 1 &&
                <button
                    type="button"
                    onClick={goToPreviousSlide}
                    className={`border-0 bg-none p-0 text-primary100 opacity-${activeIndex === 0 ? '50' : '100 hover:text-primary200'}`}
                >
                    <i className="text-3xl font-bold bi bi-chevron-left"></i>
                </button>
            }
            <div className="flex h-28 flex-row gap-1">
                <div className="relative">
                    <img src={ranks[achievements[activeIndex].rank]} alt="rank" className="absolute inset-0 w-full h-full" />
                    <img src={codes[achievements[activeIndex].code]} alt="trophie" className="relative z-10 rounded-full h-28 p-2" />
                </div>
                {
                    achievements[activeIndex + 1] &&
                    <div className="relative">
                        <img src={ranks[achievements[activeIndex + 1].rank]} alt="rank" className="absolute inset-0 w-full h-full" />
                        <img src={codes[achievements[activeIndex + 1].code]} alt="trophie" className="relative z-10 rounded-full h-28 p-2" />
                    </div>
                }

            </div>
            {
                achievements.length > 1 &&
                <button
                    type="button"
                    onClick={goToNextSlide}
                    className={`border-0 bg-none p-0 text-primary100 opacity-${activeIndex < achievements.length - 1 ? '100 hover:text-primary200' : '50'} `}
                >
                    <i className="text-3xl font-bold opacity-100 bi bi-chevron-right"></i>
                </button>
            }

        </div>

    );
};

export default inLogger(Trophies);