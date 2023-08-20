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
    const [sort, setSort] = useState(0); //0 => newest, 1 => oldest, 2 => liked
    const [currentPage, setCurrentPage] = useState(1);
    const [totalLevels, setTotalLevels] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const handleErrors = useHandleErrors();

    const handleRefreshLevels = (sort, page) => {
        handleErrors(async () => {
            setIsLoading(true);
            const dataLevels = await retrieveLevels(sort, page);
            setLevels(dataLevels.levels);
            setTotalLevels(dataLevels.totalLevels);
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
        handleRefreshLevels(sort, currentPage);
    }, [currentPage, sort]);

    useEffect(() => {
        setTotalPages(Math.ceil(totalLevels / 12));
    }, [totalLevels]);

    useEffect(() => {
        getUserInfo();
    }, []);

    return (<>
        {isLoading && <Loader />}
        {!isLoading && <section className="flex flex-col w-full md:px-0 px-5 justify-center items-center pt-20 gap-5">
            <h1 className={`text-${color} text-3xl font-bold text-center pt-5`}> Hello, {username}</h1>
            <Link className="bg-transparent hover:bg-secondary300  text-secondary300  font-semibold hover:text-white py-2 px-4 border border-secondary300  hover:border-transparent rounded-xl" to="/create">
                Create your level!
            </Link>
            <p className="text-primary300 text-xl font-bold text-center">... or play levels already created!</p>
            <div className="flex flex-col gap-0.5">
                <p className="text-secondary200 text-lg font-bold text-center">Sort by</p>
                <div className="flex flex-row text-secondary100 gap-3 justify-around">
                    <button onClick={() => setSort(0)} className={`text-lg pt-0.5 ${sort === 0 ? 'text-primary100 decoration-primary300 underline' : 'text-secondary200 hover:text-primary100 hover:underline hover:decoration-primary300'}`}>Newest</button>
                    <span className="text-xl text-light300 font-semibold">||</span>
                    <button onClick={() => setSort(1)} className={`text-lg pt-0.5 ${sort === 1 ? 'text-primary100 decoration-primary300 underline' : 'text-secondary200 hover:text-primary100 hover:underline hover:decoration-primary300'}`}>Oldest</button>
                    <span className="text-xl text-light300 font-semibold">||</span>
                    <button onClick={() => setSort(2)} className={`text-lg pt-0.5 ${sort === 2 ? 'text-primary100 decoration-primary300 underline' : 'text-secondary200 hover:text-primary100 hover:underline hover:decoration-primary300'}`}>Most Liked</button>
                </div>
            </div>
            <div className="flex flex-row w-full justify-center items-center pt-5 pb-20 gap-2 flex-wrap">
                {!isLoading ? levels.length > 0 ? levels.map((level, index) => (
                    <LevelCard
                        key={index}
                        levelInfo={level}
                        isLevelSaved={saves.includes(level.id)}
                        setSaves={setSaves}
                    />
                )) : <p className="text-secondary500 text-xl font-bold text-center">seems we don't have any level yet... go ahead and create one!</p> : ''
                }
            </div>
            <div className="flex justify-center items-center mb-28">
                {currentPage > 1 && (
                    <button
                        className="mr-2"
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        <i className="bi bi-chevron-double-left text-xl hover:text-primary100 text-secondary300"></i>
                    </button>
                )}
                <span className="text-sm font-bold text-primary100">page {currentPage}</span>
                {currentPage < totalPages && (
                    <button
                        className="ml-2"
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        <i className="bi bi-chevron-double-right text-xl hover:text-primary100 text-secondary300"></i>
                    </button>
                )}
            </div>
        </section>}
    </>
    )
}

export default inLogger(LevelsList)