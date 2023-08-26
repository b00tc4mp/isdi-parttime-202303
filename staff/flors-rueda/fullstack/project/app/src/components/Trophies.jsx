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
        return <i className="w-full flex align-center items-center justify-center text-light100  text-xl">No trophies here!</i>;
    }

    return (
        <section className="flex items-center w-full justify-around">
            {
                achievements.length > 1 &&
                <button
                    type="button"
                    onClick={goToPreviousSlide}
                    className={`border-0 bg-none p-0 opacity-${activeIndex !== 0 ? '100 text-primary100 hover:text-primary200' : '0 text-light400 cursor-default'}`}
                >
                    <i className="text-3xl font-bold bi bi-chevron-left"></i>
                </button>
            }
            <article className="flex h-28 flex-row gap-1">
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

            </article>
            {
                achievements.length > 1 &&
                <button
                    type="button"
                    onClick={goToNextSlide}
                    className={`border-0 bg-none p-0 opacity-${activeIndex < achievements.length - 2 ? '100 text-primary100 hover:text-primary200' : '0 text-light400 cursor-default'} `}
                >
                    <i className="text-3xl font-bold opacity-100 bi bi-chevron-right"></i>
                </button>
            }

        </section>

    );
};

export default inLogger(Trophies);