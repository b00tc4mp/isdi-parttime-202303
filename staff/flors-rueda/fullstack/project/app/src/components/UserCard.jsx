import { useState, useEffect } from 'react';
import avatars from '../assets/avatars';
import inLogger from '../inLogger';
import useHandleErrors from '../hooks/useHandleErrors';
import toggleFollow from '../logic/toggle-follow';
import { Link } from 'react-router-dom';
import updateSocialAchievements from '../logic/update-social-achievements';

const UserCard = ({ userInfo, isProfileCurrentUser }) => {
    const [isFollowed, setIsFollowed] = useState(userInfo.isFollowed);
    const [followers, setFollowers] = useState((userInfo.followers).length);
    const [isLoading, setIsLoading] = useState(false);
    const handleErrors = useHandleErrors();
    if (!isProfileCurrentUser) isProfileCurrentUser = false;

    const handleFollowClick = () => {
        if (isLoading) return;
        setIsLoading(true);
        handleErrors(async () => {
            await toggleFollow(userInfo.id);
            await updateSocialAchievements();
            isFollowed ? setFollowers(followers - 1) : setFollowers(followers + 1);
            setIsFollowed(!isFollowed);
        })
        setIsLoading(false);
    }

    return (
        <article className="w-full p-4 border border-light400 bg-light500 rounded-lg shadow flex flex-row gap-5 md:flex-row-reverse justify-center md:mb-5">
            <div className="flex items-start flex-col">
                <h3 className={`mb-2 text-2xl text-${userInfo.color} font-semibold self-center`}>{userInfo.username}</h3>
                <p className="flex flex-col gap-2 text-sm font-semibold">
                    <time className="italic text-xs text-secondary100">- rider since {new Date(userInfo.joined).toLocaleDateString("en-GB")} -</time>
                    <span className="text-light100 flex flex-row gap-2">Followers: {followers}
                        {
                            !isProfileCurrentUser &&
                            <button
                                className={`w-fit py-1 ml-2 px-2 text-xs text-light400 font-bold rounded-xl transition duration-200 ${isLoading ? 'cursor-default' : isFollowed ? 'bg-dark500 hover:bg-danger200' : 'bg-success200 hover:bg-dark500'}`} onClick={handleFollowClick}
                            >
                                {isLoading ? <i className="bi bi-hourglass-split"></i> : isFollowed ? 'Unfollow' : 'Follow'}
                            </button>
                        }
                    </span>
                </p>
            </div>
            <Link to={`/profile/${userInfo.id}`} className="flex flex-col justify-center align-center h-full py-4 md:py-0">
                <img className={`bg-${userInfo.color} md:mt-3 w-16 md:w-18 md:h-18 rounded-full self-center`} src={`${avatars[userInfo.avatar]}`} alt="avatar" />
            </Link>
        </article>
    )
}

export default inLogger(UserCard);