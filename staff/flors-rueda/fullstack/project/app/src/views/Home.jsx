import { useEffect, useState } from 'react';
import LevelCard from '../components/LevelCard';
import Loader from '../components/Loader';
import retrieveLevelsByFollowed from '../logic/retrieve-levels-by-followed';
import retrieveLoggedUser from '../logic/retrieve-logged-user';
import inLogger from '../inLogger';
import { Link } from 'react-router-dom';
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
            setIsLoading(true);
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
        window.scrollTo(0, 0);
        handleRefreshLevels();
        getUserInfo();
    }, []);

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className="flex flex-col w-full md:px-0 px-5 justify-center items-center pt-12 md:pt-24 gap-2">
            <h1 className={`text-${color} text-3xl font-bold text-center pt-5`}> Hello, {username}</h1>
            {
                !isLoading && levels.length > 0 ?
                    <>
                        <Link className="bg-transparent hover:bg-secondary300  text-secondary300  font-semibold hover:text-white py-2 px-4 border border-secondary300  hover:border-transparent rounded-xl" to="/create">
                            Create your level!
                        </Link>
                        <h2 className="text-primary200 text-xl font-bold text-center">Or check what your guild is creating</h2>
                        <div className="flex flex-row w-full justify-center items-center pt-5 pb-20 gap-2 flex-wrap">
                            {levels.map((level, index) => (
                                <LevelCard
                                    key={index}
                                    levelInfo={level}
                                    handleRefreshLevels={handleRefreshLevels}
                                    isLevelSaved={saves.includes(level.id)}
                                    setSaves={setSaves}
                                />
                            ))
                            }
                        </div>
                    </>
                    :
                    <>
                        <h2 className="text-dark400 text-xl font-bold text-center px-6 md:px-24">Are you new here?</h2>
                        <p className="text-dark500 text-sm font-bold text-center px-6 md:px-24">Here you have some things you could do:</p>
                        <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-3 gap-2 md:gap-8 md:pt-5">
                            <Link className="bg-transparent hover:bg-light500 shadow text-dark300  font-semibold py-2 px-4 hover:text-secondary300 text-center border border-light500 rounded-xl" to="/tutorial">
                                <i className="bi bi-mortarboard-fill pe-1" />Play the tutorial
                            </Link>
                            <Link className="bg-transparent hover:bg-light500 shadow text-dark300  font-semibold py-2 px-4 hover:text-secondary300 text-center border border-light500 rounded-xl" to="/customize">
                                <i className="bi bi-palette pe-1" />Customize your profile
                            </Link>
                            <Link className="bg-transparent hover:bg-light500 shadow text-dark300  font-semibold py-2 px-4 hover:text-secondary300 text-center border border-light500 rounded-xl" to="/levels">
                                <i className="bi bi-collection-play-fill pe-1" />Beat some levels and earn CC
                            </Link>
                            <Link className="bg-transparent hover:bg-light500 shadow text-dark300  font-semibold py-2 px-4 hover:text-secondary300 text-center border border-light500 rounded-xl" to="/create">
                                <i className="bi bi-grid-3x3-gap-fill pe-1" />Create a level
                            </Link>
                            <Link className="bg-transparent hover:bg-light500 shadow text-dark300  font-semibold py-2 px-4 hover:text-secondary300 text-center border border-light500 rounded-xl" to="/search">
                                <i className="bi bi-search pe-1" />Look for someone to follow
                            </Link>
                            <Link className="bg-transparent hover:bg-light500 shadow text-dark300  font-semibold py-2 px-4 hover:text-secondary300 text-center border border-light500 rounded-xl" to="/about">
                                <i className="bi bi-info-square-fill pe-1" />Learn more about Ballopolis
                            </Link>
                        </div>
                    </>
            }
        </section>
    )
}

export default inLogger(Home)