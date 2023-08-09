import { useState, useEffect } from 'react';
import useHandleErrors from '../hooks/useHandleErrors';
import inLogger from '../inLogger';
import BasicLevelCard from './BasicLevelCard';
import Loader from './Loader';
import retrieveLevelsByAuthor from '../logic/retrieve-levels-by-author';
import { useParams } from 'react-router-dom';

const LevelsCarrousel = ({ type, userId }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [levels, setLevels] = useState(null);
    const handleErrors = useHandleErrors();
    const { id } = useParams();

    const handleRefreshLevels = () => {
        handleErrors(async () => {
            if (type === 'created') {
                const levels = await retrieveLevelsByAuthor(userId);
                setLevels(levels);
            } else {
                //TODO Add retrieve saved levels
            }
            setIsLoading(false);
        })
    }

    useEffect(() => {
        handleRefreshLevels();
    }, [id]);

    if (isLoading) {
        return <Loader />
    }

    const goToPreviousSlide = () => {
        if (activeIndex !== 0) {
            const newIndex = (activeIndex - 1);
            setActiveIndex(newIndex);
        }
    };

    const goToNextSlide = () => {
        if (activeIndex < levels.length - 1) {
            const newIndex = (activeIndex + 1);
            setActiveIndex(newIndex);
        }
    };

    return (

        <div className="flex items-center w-full justify-around">
            {
                levels.length > 1 &&
                <button
                    type="button"
                    onClick={goToPreviousSlide}
                    className={`border-0 bg-none p-0 text-primary100 opacity-${activeIndex === 0 ? '50' : '100 hover:text-primary200'}`}
                >
                    <i className="text-3xl font-bold bi bi-chevron-left"></i>
                </button>
            }
            <BasicLevelCard levelInfo={levels[activeIndex]} />
            {
                levels.length > 1 &&
                <button
                    type="button"
                    onClick={goToNextSlide}
                    className={`border-0 bg-none p-0 text-primary100 opacity-${activeIndex < levels.length - 1 ? '100 hover:text-primary200' : '50'} `}
                >
                    <i className="text-3xl font-bold opacity-100 bi bi-chevron-right"></i>
                </button>
            }

        </div>

    );




};

export default inLogger(LevelsCarrousel);