import { useState, useEffect } from 'react';
import avatars from '../assets/avatars';
import inLogger from '../inLogger';
import useHandleErrors from '../hooks/useHandleErrors';
import toggleFollow from '../logic/toggle-follow';
import { useParams } from 'react-router-dom';
import isCurrentUser from '../logic/is-current-user';

const UserCard = ({ userInfo }) => {
    const [isFollowed, setIsFollowed] = useState(userInfo.isFollowed);
    const [followers, setFollowers] = useState((userInfo.followers).length);
    const [isProfileCurrentUser, setIsProfileCurrentUser] = useState(null)
    const handleErrors = useHandleErrors();
    const { id } = useParams();

    const handleFollowClick = () => {
        handleErrors(async () => {
            await toggleFollow(id);
            isFollowed ? setFollowers(followers - 1) : setFollowers(followers + 1);
            setIsFollowed(!isFollowed);
        })
    }

    useEffect(() => {
        handleErrors(async () => {
            const bool = await isCurrentUser(id);
            setIsProfileCurrentUser(bool)
        })
    }, []);

    return (
        <div className="w-full md:w-5/12 lg:w-4/12 p-4 border border-light400 bg-light500 rounded-lg shadow flex flex-row gap-2 md:flex-row-reverse justify-around">
            <div className="flex items-start flex-col">
                <h3 className={`mb-2 text-2xl text-${userInfo.color} font-semibold self-center`}>{userInfo.username}</h3>
                <p className="flex flex-col gap-2 text-sm font-semibold">
                    <span className="font-serif text-xs text-secondary100">- rider since {new Date(userInfo.joined).toLocaleDateString("en-GB")} -</span>
                    <span className="text-light100 flex flex-row gap-2">Followers: {followers}
                        {
                            !isProfileCurrentUser &&
                            <button
                                className={`w-fit py-1 ml-2 px-2 text-xs text-light400 font-bold rounded-xl transition duration-200 ${isFollowed ? 'bg-dark500 hover:bg-danger200' : 'bg-success200 hover:bg-dark500'}`} onClick={handleFollowClick}
                            >
                                {isFollowed ? 'Unfollow' : 'Follow'}
                            </button>
                        }
                    </span>
                </p>
            </div>
            <div className="flex flex-col justify-center align-center h-full py-4 md:py-0">
                <img className={`bg-${userInfo.color} w-16 w-16 md:w-18 md:h-18 rounded-full self-center`} src={`${avatars[userInfo.avatar]}`} alt="avatar" />
            </div>
        </div>
    )
}


export default inLogger(UserCard);