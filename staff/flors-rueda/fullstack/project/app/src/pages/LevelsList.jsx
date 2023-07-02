import { useEffect, useState } from 'react';
import LevelCard from '../components/LevelCard';
import Loader from '../components/Loader';
import retrieveLevels from '../logic/retrieve-levels';
import inLogger from '../inLogger';

const LevelsList = ({ onCreateClick, onLevelClick }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [levels, setLevels] = useState(null);

    const handleRefreshLevels = () => {
        try {
            retrieveLevels((error, levels) => {
                if (error) {
                    console.log(`retrieve levels error: ${error.message}`);
                } else {
                    setLevels(levels);
                }
                setIsLoading(false);
            });
        } catch (error) {
            console.log(`retrieve levels error: ${error.message}`);
        }
    };

    useEffect(() => {
        handleRefreshLevels();
    }, []);

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="flex flex-col w-full justify-center items-center pt-20 gap-5">
            <h1 className="text-primary100 text-5xl font-bold text-center pt-5">Ballopolis Maze Riders</h1>
            <button className="bg-transparent hover:bg-secondary300  text-secondary300  font-semibold hover:text-white py-2 px-4 border border-secondary300  hover:border-transparent rounded-xl" onClick={onCreateClick}>
                Create your level!
            </button>
            <p className="text-primary300 text-xl font-bold text-center">... or play levels already created!</p>
            <div className="flex flex-row max-w-3xl w-9/12 justify-center items-center pt-5 pb-20 gap-2 flex-wrap">
                {!isLoading ? levels.length > 0 ? levels.map((level, index) => (
                    <LevelCard
                        key={index}
                        levelInfo={level}
                        onLevelClick={onLevelClick}
                    />
                )) : <p className="text-secondary500 text-xl font-bold text-center">seems we don't have any level yet... go ahead and create one!</p> : ''
                }
            </div>
        </div>

    )
}

export default inLogger(LevelsList)