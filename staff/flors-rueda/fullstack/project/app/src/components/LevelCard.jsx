import { Link } from 'react-router-dom';
import retrieveUser from '../logic/retrieve-user';
import inLogger from '../inLogger';
import { useState, useEffect } from 'react';
import useHandleErrors from '../hooks/useHandleErrors';
import avatars from '../assets/avatars/index';

const LevelCard = ({ levelInfo }) => {
    const [authorData, setAuthorData] = useState({});
    const [title, setTitle] = useState('')
    const handleErrors = useHandleErrors();



    const getAuthorData = () => {
        handleErrors(async () => {
            const user = await retrieveUser(levelInfo.author);
            setAuthorData(user);
        })
    }

    const setLevelTitle = (name) => {
        const displayName = name.length > 10 ? `${name.substring(0, 10)}...` : name;
        setTitle(displayName)
    }

    useEffect(() => {
        getAuthorData();
        setLevelTitle(levelInfo.name);
    }, []);



    return (
        <div className="w-full md:w-5/12 md:max-w-sm p-6 bg-light500 border border-light300 rounded-lg shadow">
            <div className="flex justify-between">
                <div className="flex items-start flex-col">
                    <h3 className="mb-2 text-2xl font-semibold truncate text-primary200 max-w-1/2">{title}</h3>
                    <Link to={`/game/${levelInfo.id}`} className="inline-flex items-center text-secondary300 hover:underline">
                        Play now
                        <i className="bi bi-play-circle text-xl ps-1"></i>
                    </Link>
                    <p className={`flex flex-row gap-2 text-secondary500 text-sm font-semibold`}>
                        <button><i className="bi bi-suit-heart"></i></button>
                        {levelInfo.likes.length}
                    </p>
                </div>
                <div className="flex items-center flex-col">
                    <img className={`bg-${authorData.color} w-10 h-10 rounded-full`} src={`${avatars[authorData.avatar]}`} alt="avatar" />
                    <p className={`text-${authorData.color} text-sm font-semibold`}>{authorData.username}</p>
                    <p className={`text-${authorData.color} text-xs`}>{new Date(levelInfo.date).toLocaleDateString("en-GB")}</p>
                </div>
            </div>
        </div>
    )
}


export default inLogger(LevelCard);