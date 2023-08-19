import { useEffect, useState } from 'react';
import LevelCard from '../components/LevelCard';
import Loader from '../components/Loader';
import retrieveLevels from '../logic/retrieve-levels';
import retrieveLoggedUser from '../logic/retrieve-logged-user';
import inLogger from '../inLogger';
import { Link } from 'react-router-dom';
import useHandleErrors from '../hooks/useHandleErrors';

const LevelsList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [levels, setLevels] = useState(null);
    const [username, setUsername] = useState('');
    const [color, setColor] = useState('');
    const [saves, setSaves] = useState([]);
    const handleErrors = useHandleErrors();

    const handleRefreshLevels = () => {
        handleErrors(async () => {
            const levels = await retrieveLevels();
            setLevels(levels);
            setIsLoading(false);
        })
    }

    const getUserInfo = () => {
        handleErrors(async () => {
            const user = await retrieveLoggedUser();
            setUsername(user.username);
            setColor(user.color);
            setSaves(user.saves);
        })
    }

    useEffect(() => {
        handleRefreshLevels();
        getUserInfo();
    }, [saves]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className="flex flex-col w-full md:px-0 px-5 justify-center items-center pt-20 gap-5">
            <h1 className={`text-${color} text-3xl font-bold text-center pt-5`}> Hello, {username}</h1>
            <Link className="bg-transparent hover:bg-secondary300  text-secondary300  font-semibold hover:text-white py-2 px-4 border border-secondary300  hover:border-transparent rounded-xl" to="/create">
                Create your level!
            </Link>
            <p className="text-primary300 text-xl font-bold text-center">... or play levels already created!</p>
            <div className="flex flex-row w-full justify-center items-center pt-5 pb-20 gap-2 flex-wrap">
                {!isLoading ? levels.length > 0 ? levels.map((level, index) => (
                    <LevelCard
                        key={index}
                        levelInfo={level}
                        handleRefreshLevels={handleRefreshLevels}
                        isLevelSaved={saves.includes(level.id)}
                        onRefreshLevels={handleRefreshLevels}
                        setSaves={setSaves}
                    />
                )) : <p className="text-secondary500 text-xl font-bold text-center">seems we don't have any level yet... go ahead and create one!</p> : ''
                }
            </div>
        </section>

    )
}

export default inLogger(LevelsList)