import { Link } from 'react-router-dom';
import retrieveUser from '../logic/retrieve-user';
import inLogger from '../inLogger';
import { useState, useEffect } from 'react';
import useHandleErrors from '../hooks/useHandleErrors';
import isCurrentUser from '../logic/is-current-user';
import avatars from '../assets/avatars/index';
import toggleLike from '../logic/toggle-like';
import toggleFollow from '../logic/toggle-follow';

const BasicLevelCard = ({ levelInfo }) => {
    const [authorData, setAuthorData] = useState({});
    const [title, setTitle] = useState('');
    const handleErrors = useHandleErrors();
    const [isLiked, setIsLiked] = useState(levelInfo.isLevelLiked);
    const [likes, setLikes] = useState(levelInfo.likes.length);
    const [isUserAuthor, setIsUserAuthor] = useState(null);
    const [isSaved, setIsSaved] = useState(false);

    const getAuthorData = () => {
        handleErrors(async () => {
            const user = await retrieveUser(levelInfo.author);
            const isUser = await isCurrentUser(levelInfo.author);
            setIsUserAuthor(isUser);
            setAuthorData(user);
        })
    }

    const handleSaveClick = () => {
        setIsSaved(!isSaved);
    }

    const handleLikeClick = () => {
        handleErrors(async () => {
            await toggleLike(levelInfo.id);
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
            setIsLiked(!isLiked);
        })
    }

    const setLevelTitle = (name) => {
        const displayName = name.length > 15 ? `${name.substring(0, 15)}...` : name;
        setTitle(displayName)
    }

    useEffect(() => {
        getAuthorData();
        setLevelTitle(levelInfo.name);
    }, [levelInfo]);

    return (
        <div className="w-full md:w-5/12 max-w-sm min-w-fit p-6 bg-light500 border border-light300 rounded-lg shadow">
            <div className="flex items-center flex-col">
                <div className="flex flex-row gap-0.5 text-2xl font-semibold truncate text-primary200 max-w-1/2">
                    <h3>{title}</h3>
                </div>
                <p className={`text-${authorData.color} text-xs`}>{new Date(levelInfo.date).toLocaleDateString("en-GB")}</p>
                <Link to={`/game/${levelInfo.id}`} className="inline-flex items-center text-secondary300 hover:underline">
                    Play now
                    <i className="bi bi-play-circle text-xl ps-1"></i>
                </Link>
                <div className={`flex flex-row gap-2 text-secondary500 text-sm font-semibold align-center items-center`}>
                    <p className={`flex flex-row gap-2 text-secondary500 text-sm font-semibold align-center items-center`}>
                        <button onClick={handleSaveClick} className={`flex flex-row text-secondary500 text-sm font-semibold ${isSaved ? 'hover:text-danger100' : 'hover:text-success100'} items-center`}>
                            <i className={`text-lg bi bi-bookmark-star${isSaved ? '-fill' : ''}`}></i>
                        </button>
                        <button onClick={handleLikeClick}>
                            <i className={`hover:text-light100 bi ${isLiked ? 'bi-suit-heart-fill' : 'bi-suit-heart'}`}></i>
                        </button>
                        {likes}
                    </p>
                </div>
            </div>
        </div>
    )
}


export default inLogger(BasicLevelCard);