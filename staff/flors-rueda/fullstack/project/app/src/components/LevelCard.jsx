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
                    <h3 className="text-2xl font-semibold truncate text-primary200 max-w-1/2">{title}</h3>
                    <p className={`text-${authorData.color} text-xs`}>{new Date(levelInfo.date).toLocaleDateString("en-GB")}</p>
                    <Link to={`/game/${levelInfo.id}`} className="inline-flex items-center text-secondary300 hover:underline">
                        Play now
                        <i className="bi bi-play-circle text-xl ps-1"></i>
                    </Link>
                    <p className={`flex flex-row gap-2 text-secondary500 text-sm font-semibold`}>
                        <button><i className="bi bi-suit-heart"></i></button>
                        {levelInfo.likes.length}
                    </p>
                </div>
                <div className="flex items-center flex-col h-full w-1/3 gap-2">
                    <Link to={`/profile/${levelInfo.author}`} className="flex items-center flex-col text-${authorData.color}">
                        <img className={`bg-${authorData.color} w-12 h-12 rounded-full`} src={`${avatars[authorData.avatar]}`} alt="avatar" />
                        <p className={`text-${authorData.color} text-sm font-semibold`}>{authorData.username}</p>
                    </Link>
                    <button
                        className="w-fit py-1 px-2 bg-success200 hover:bg-dark500 text-xs text-light400 font-bold rounded-xl transition duration-200"
                    >
                        Follow
                    </button>
                </div>
            </div>
        </div>
    )
}


export default inLogger(LevelCard);