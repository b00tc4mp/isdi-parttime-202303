import { Link, useParams } from 'react-router-dom';
import retrieveUser from '../logic/retrieve-user';
import inLogger from '../inLogger';
import { useState, useEffect } from 'react';
import useHandleErrors from '../hooks/useHandleErrors';
import avatars from '../assets/avatars/index';
import toggleLike from '../logic/toggle-like';
import toggleSave from '../logic/toggle-save';
import retrieveLoggedUser from '../logic/retrieve-logged-user';
import updateSocialAchievements from '../logic/update-social-achievements';

const LevelCard = ({ levelInfo, isLevelSaved, setSaves }) => {
    const [authorData, setAuthorData] = useState({});
    const [title, setTitle] = useState('');
    const handleErrors = useHandleErrors();
    const [isLiked, setIsLiked] = useState(levelInfo.isLevelLiked);
    const [likes, setLikes] = useState(levelInfo.likes.length);
    const [isSaved, setIsSaved] = useState(isLevelSaved);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    const getAuthorData = () => {
        handleErrors(async () => {
            const user = await retrieveUser(levelInfo.author);
            setAuthorData(user);
        });
    };

    const handleLikeClick = () => {
        if (isLoading) return;
        setIsLoading(true);
        handleErrors(async () => {
            await toggleLike(levelInfo.id);
            await updateSocialAchievements();
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
            setIsLiked(!isLiked);
        })
        setIsLoading(false);
    }

    const handleSaveClick = () => {
        if (isLoading) return;
        setIsLoading(true);
        handleErrors(async () => {
            await toggleSave(levelInfo.id);
            await updateSocialAchievements();
            const user = await retrieveLoggedUser();
            setSaves(user.saves);
            setIsSaved(!isSaved);
        })
        setIsLoading(false);
    }

    const setLevelTitle = (name) => {
        const displayName = name.length > 10 ? `${name.substring(0, 10)}...` : name;
        setTitle(displayName)
    }

    useEffect(() => {
        setAuthorData({});
        setTitle('');
        setIsLiked(levelInfo.isLevelLiked);
        setLikes(levelInfo.likes.length);
        setIsSaved(isLevelSaved);
        getAuthorData();
        setLevelTitle(levelInfo.name);
    }, [levelInfo, id]);

    let timeDifference = new Date() - new Date(levelInfo.date);
    const hours = Math.floor(timeDifference / 3600000);
    let time;

    if (hours <= 24) {
        const minutes = Math.floor(timeDifference / 60000);
        if (hours > 0) time = <time>{hours} hours ago</time>
        if (hours === 0 && minutes > 0) time = <time>{minutes} minutes ago</time>
        if (minutes === 0) time = <time>just now</time>
    } else {
        time = <time>{new Date(levelInfo.date).toLocaleDateString("en-GB")}</time>
    }

    return (
        <article className="w-full md:w-5/12 md:max-w-sm p-6 bg-light500 border border-light300 rounded-lg shadow flex justify-between">
            <div className="flex items-start flex-col">
                <div className={`flex flex-row gap-0.5 text-2xl font-semibold truncate text-${authorData.color} max-w-1/2`}>
                    <h3>{title}</h3>
                </div>
                <time className="text-secondary300 text-xs">{time}</time>
                <Link to={`/game/${levelInfo.id}`} className="inline-flex items-center text-primary200 hover:underline">
                    Play now
                    <i className="bi bi-play-circle text-xl ps-1"></i>
                </Link>
                <div className={`flex flex-row gap-2 text-secondary500 text-sm font-semibold align-center items-center`}>
                    <p className={`flex flex-row gap-2 text-secondary500 text-sm font-semibold align-center items-center`}>
                        <button onClick={handleSaveClick} className={`flex flex-row text-secondary500 text-sm font-semibold ${isSaved ? 'hover:text-light100' : 'hover:text-success100'} items-center`}>
                            <i className={`text-lg bi ${isLoading ? 'bi-hourglass-split cursor-default' : isSaved ? 'bi-bookmark-star-fill' : 'bi-bookmark-star'}`}></i>
                        </button>
                        <button onClick={handleLikeClick}>
                            <i className={`hover:text-light100 bi ${isLoading ? 'bi-hourglass-split cursor-default' : isLiked ? 'bi-suit-heart-fill' : 'bi-suit-heart'}`}></i>
                        </button>
                        {likes}
                    </p>
                </div>
            </div>
            <div className="flex items-center flex-col align-center justify-center mt-5 h-full w-1/3 gap-2">
                <Link to={`/profile/${levelInfo.author}`} className="flex items-center flex-col">
                    <img className={`bg-${authorData.color} w-12 h-12 rounded-full`} src={`${avatars[authorData.avatar]}`} alt="avatar" />
                    <p className={`text-${authorData.color} text-sm font-semibold`}>{authorData.username}</p>
                </Link>
            </div>
        </article >
    )
}


export default inLogger(LevelCard);