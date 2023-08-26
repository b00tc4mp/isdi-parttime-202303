import { Link, useNavigate, useParams } from 'react-router-dom';
import retrieveUser from '../logic/retrieve-user';
import inLogger from '../inLogger';
import { useState, useEffect } from 'react';
import useHandleErrors from '../hooks/useHandleErrors';
import toggleLike from '../logic/toggle-like';
import toggleSave from '../logic/toggle-save';
import isCurrentUser from '../logic/is-current-user';
import retrieveLevel from '../logic/retrieve-level';
import updateSocialAchievements from '../logic/update-social-achievements';

const BasicLevelCard = ({ levelInfo, isLevelSaved, setToast }) => {
    const [authorData, setAuthorData] = useState({});
    const [title, setTitle] = useState('');
    const handleErrors = useHandleErrors();
    const [isLiked, setIsLiked] = useState(levelInfo.isLevelLiked);
    const [likes, setLikes] = useState(levelInfo.likes.length);
    const [isSaved, setIsSaved] = useState(isLevelSaved);
    const [isAuthorCurrentUser, setAuthorCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const getAuthorData = () => {
        handleErrors(async () => {
            const user = await retrieveUser(levelInfo.author);
            setAuthorData(user);
            const isUser = isCurrentUser(levelInfo.author);
            setAuthorCurrentUser(isUser);
        })
    }

    const handleSaveClick = () => {
        if (isLoading) return;
        setIsLoading(true);
        handleErrors(async () => {
            await toggleSave(levelInfo.id);
            await updateSocialAchievements();
            setIsSaved(!isSaved);
        })
        setIsLoading(false);
    }

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

    const setLevelTitle = (name) => {
        const displayName = name.length > 11 ? `${name.substring(0, 11)}...` : name;
        setTitle(displayName);
    }

    const handleEditLevel = () => {
        handleErrors(async () => {
            const level = await retrieveLevel(levelInfo.id);
            navigate('/create', { state: { initialLevel: level.layout, hpSelected: level.hp, nameSelected: level.name, levelId: level.id } })
        })
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
        <article className="w-full md:w-5/12 max-w-sm min-w-fit p-6 bg-light500 border border-light300 rounded-lg shadow flex items-center flex-col">
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
                    {isAuthorCurrentUser &&
                        <span className="flex flex-row gap-0.5">
                            <button onClick={() => setToast(levelInfo.id)} className="flex flex-row text-danger200 text-sm font-semibold hover:text-danger100 items-center">
                                <i className="text-lg bi bi-trash3-fill"></i>
                            </button>
                            <button onClick={handleEditLevel} className="flex flex-row text-success200 text-sm font-semibold hover:text-success100 items-center pt-0.5">
                                <i className="text-lg bi bi-pencil-square"></i>
                            </button>
                        </span>

                    }
                    <button onClick={handleSaveClick} className={`flex flex-row text-secondary500 text-sm font-semibold ${isSaved ? 'hover:text-light100' : 'hover:text-success100'} items-center`}>
                        <i className={`text-lg bi ${isLoading ? 'bi-hourglass-split cursor-default' : isSaved ? 'bi-bookmark-star-fill' : 'bi-bookmark-star'}`}></i>
                    </button>
                    <button onClick={handleLikeClick}>
                        <i className={`hover:text-light100 bi ${isLoading ? 'bi-hourglass-split cursor-default' : isLiked ? 'bi-suit-heart-fill' : 'bi-suit-heart'}`}></i>
                    </button>
                    {likes}
                </p>
            </div>
        </article>
    )
}


export default inLogger(BasicLevelCard);