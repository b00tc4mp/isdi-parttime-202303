import { useEffect, useState } from 'react';
import LevelCard from '../components/LevelCard';
import Loader from '../components/Loader';
import retrieveLevelsByFollowed from '../logic/retrieve-levels-by-followed';
import retrieveLoggedUser from '../logic/retrieve-logged-user';
import inLogger from '../inLogger';
import retrieveLevelsSaved from '../logic/retrieve-levels-saved';
import useHandleErrors from '../hooks/useHandleErrors';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [levels, setLevels] = useState(null);
    const [username, setUsername] = useState('');
    const [color, setColor] = useState('');
    const handleErrors = useHandleErrors();
    const [saves, setSaves] = useState([]);

    const handleRefreshLevels = () => {
        handleErrors(async () => {
            const levels = await retrieveLevelsByFollowed();
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
            <p className="text-dark300 text-xl font-bold text-center">Check what your friends are creating</p>
            <div className="flex flex-row w-full justify-center items-center pt-5 pb-20 gap-2 flex-wrap">
                {!isLoading ? levels.length > 0 ? levels.map((level, index) => (
                    <LevelCard
                        key={index}
                        levelInfo={level}
                        handleRefreshLevels={handleRefreshLevels}
                        isLevelSaved={saves.includes(level.id)}
                        setSaves={setSaves}
                    />
                )) : <p className="text-secondary500 text-xl font-bold text-center px-6 md:px-24">seems you don't have any level around yet... go ahead and create one, or browse all the levels and follow more people!</p> : ''
                }
            </div>
        </section>

    )
}

export default inLogger(Home)