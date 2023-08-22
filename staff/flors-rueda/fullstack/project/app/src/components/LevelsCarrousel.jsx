import { useState, useEffect } from 'react';
import useHandleErrors from '../hooks/useHandleErrors';
import inLogger from '../inLogger';
import BasicLevelCard from './BasicLevelCard';
import LevelCard from './LevelCard';
import Loader from './Loader';
import retrieveLevelsByAuthor from '../logic/retrieve-levels-by-author';
import { useParams } from 'react-router-dom';
import retrieveLevelsSaved from '../logic/retrieve-levels-saved';

const LevelsCarrousel = ({ type, userId, userSaves, setToast, isDeleted, setDeleted }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [levels, setLevels] = useState(null);
    const [saves, setSaves] = useState(userSaves);
    const handleErrors = useHandleErrors();
    const { id } = useParams();

    const handleRefreshLevels = () => {
        handleErrors(async () => {
            if (type === 'created') {
                const levels = await retrieveLevelsByAuthor(userId);
                setLevels(levels);
            } else {
                const levels = await retrieveLevelsSaved(userId);
                setLevels(levels);
            }
            setIsLoading(false);
        })
    }

    useEffect(() => {
        handleRefreshLevels();
        setDeleted(false);
    }, [id, userId, saves, isDeleted]);

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

    if (!levels || levels.length === 0) {
        return <i className="w-full flex align-center items-center justify-center text-light100 text-xl">No levels to be seen here!</i>;
    }

    return (

        <div className="flex items-center w-full justify-around">
            {
                levels.length > 1 &&
                <button
                    type="button"
                    onClick={goToPreviousSlide}
                    className={`border-0 bg-none p-0 text-primary100 opacity-${activeIndex === 0 ? '50 cursor-default' : '100 hover:text-primary200'}`}
                >
                    <i className="text-3xl font-bold bi bi-chevron-left"></i>
                </button>
            }
            {levels.length > 0 &&
                type === 'created' ?
                <BasicLevelCard levelInfo={levels[activeIndex]} isLevelSaved={saves.includes(levels[activeIndex].id)} setToast={setToast} />
                :
                <LevelCard levelInfo={levels[activeIndex]} isLevelSaved={saves.includes(levels[activeIndex].id)} setSaves={setSaves} />
            }
            {
                levels.length > 1 &&
                <button
                    type="button"
                    onClick={goToNextSlide}
                    className={`border-0 bg-none p-0 text-primary100 opacity-${activeIndex < levels.length - 1 ? '100 hover:text-primary200' : '50 cursor-default'} `}
                >
                    <i className="text-3xl font-bold opacity-100 bi bi-chevron-right"></i>
                </button>
            }

        </div>

    );




};

export default inLogger(LevelsCarrousel);