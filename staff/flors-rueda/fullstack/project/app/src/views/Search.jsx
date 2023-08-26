import inLogger from '../inLogger';
import './background.css';
import { useEffect, useRef, useState } from 'react';
import retrieveLoggedUser from '../logic/retrieve-logged-user';
import useHandleErrors from '../hooks/useHandleErrors';
import searchLevels from '../logic/search-level';
import Loader from '../components/Loader';
import LevelCard from '../components/LevelCard';
import searchUsers from '../logic/search-users';
import UserCard from '../components/UserCard';

const Search = () => {
    const [color, setColor] = useState('');
    const [saves, setSaves] = useState(null);
    const [foundUsers, setFoundUsers] = useState(null);
    const [foundLevels, setFoundLevels] = useState(null);
    const [allFound, setAllFound] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleErrors = useHandleErrors();
    const formRef = useRef();

    const getUserInfo = () => {
        handleErrors(async () => {
            const user = await retrieveLoggedUser();
            setColor(user.color);
            setSaves(user.saves);
        })
    }

    const handleSearchInput = () => {
        const formElement = formRef.current;
        const formData = new FormData(formElement);
        const search = formData.get('search');
        if (search) {
            setIsLoading(true);
            handleErrors(async () => {
                const users = await searchUsers(search);
                const levels = await searchLevels(search);
                setFoundUsers(users);
                setFoundLevels(levels);
                setAllFound(levels.length + users.length);
            })
            setIsLoading(false)
        } else {
            setAllFound(null);
            setFoundUsers(null);
            setFoundLevels(null);
        }
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <section className="flex flex-col w-full md:px-0 px-5 justify-center items-center pt-20 gap-1">
            <h1 className="text-5xl font-bold text-center pt-5"><span className={`text-${color}`}>B</span><span className="text-secondary300">a</span><span className="text-primary100">l</span><span className="text-blue">l</span><span className="text-red">o</span><span className="text-yellow">o</span><span className="text-blue">g</span><span className="text-green">l</span><span className="text-red">e</span></h1>
            <form ref={formRef} className="flex items-center relative mt-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <i className="text-xl text-light100 bi bi-search"></i>
                </div>
                <input onChange={handleSearchInput} name="search" id="search" type="text" className="bg-light400 shadow border border-light100 text-dark500 text-sm rounded-lg focus:ring-primary300 focus:border-primary300 block w-full pl-10 p-2.5" placeholder="Search user / level name" required />
            </form>
            {
                allFound !== null && <div className="self-end text-sm text-light100 w-1/2">{allFound ? `found ${allFound} results` : 'no results'}</div>
            }
            <div className="flex flex-row w-full justify-center items-center pt-5 pb-20 gap-2 flex-wrap">
                {isLoading && <Loader />}
                {foundUsers && foundUsers.length > 0 && foundUsers.map((user, index) => (
                    <div className="w-full md:w-5/12 max-w-sm min-w-fit" key={index}>
                        <UserCard userInfo={user} />
                    </div>
                ))}
                {foundLevels && foundLevels.length > 0 && foundLevels.map((level, index) => (
                    <LevelCard
                        key={index}
                        levelInfo={level}
                        isLevelSaved={saves.includes(level.id)}
                        setSaves={setSaves}
                    />
                ))}
            </div>
        </section>

    )
}

export default inLogger(Search);