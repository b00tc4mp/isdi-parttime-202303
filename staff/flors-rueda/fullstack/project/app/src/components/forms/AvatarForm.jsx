import { useEffect, useState } from 'react';
import inLogger from '../../inLogger';
import { assets } from 'com';
import avatarStory from '../../assets/avatars/avatarStory'
import avatarPrice from '../../assets/avatars/avatarPrice'
import avatars from '../../assets/avatars';
import retrieveLoggedUser from '../../logic/retrieve-logged-user';
import useHandleErrors from '../../hooks/useHandleErrors';
import updateAvatar from '../../logic/update-avatar';
import retrieveUnlockAvatars from '../../logic/retrieve-unlock-avatars';
import retrieveCC from '../../logic/retrieve-cc';
import updateCC from '../../logic/update-cc';
import updateCCAchievements from '../../logic/update-cc-achievements';
import updateUnlockAvatar from '../../logic/update-unlock-avatar';
import Loader from '../Loader';

const AvatarForm = ({ setUpdateUserInfo, setToast }) => {
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [unlockAvatars, setUnlockAvatars] = useState([]);
    const [budget, setBudget] = useState(0);
    const handleErrors = useHandleErrors();
    const [isLoading, setIsLoading] = useState(false);
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = (index) => {
        setHovered(index);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    const refreshUserAvatars = () => {
        handleErrors(async () => {
            const user = await retrieveLoggedUser();
            const userAvatars = await retrieveUnlockAvatars();
            setSelectedAvatar(user.avatar);
            setUnlockAvatars(userAvatars);
        })
    }

    const refreshUserBudget = () => {
        setIsLoading(true);
        handleErrors(async () => {
            const userBudget = await retrieveCC();
            setBudget(userBudget);
        })
        setIsLoading(false);
    }

    const changeAvatar = (avatar) => {
        setIsLoading(true);
        setUpdateUserInfo(false);
        handleErrors(async () => {
            await updateAvatar(avatar);
            setToast('new avatar saved');
            setSelectedAvatar(avatar);
            setUpdateUserInfo(true);
        })
        setIsLoading(false);
    }

    const unlockAvatar = (avatar) => {
        setIsLoading(false);
        handleErrors(async () => {
            await updateCCAchievements(avatarPrice[avatar], '-');
            await updateUnlockAvatar(avatar);
            await updateCC(avatarPrice[avatar], '-');
            changeAvatar(avatar);
        })
        setIsLoading(true);
    }

    useEffect(() => {
        refreshUserAvatars();
        refreshUserBudget();
    }, [selectedAvatar]);

    return (
        <>
            {isLoading && <Loader />}
            <div className="w-full mt-5 mb-6">
                <ul className="p-3 grid md:grid-cols-2 md:grid-rows-6 lg:grid-cols-3 lg:grid-rows-4 gap-5">
                    {assets.avatars.map((avatar, index) => (
                        <li key={`${index}_${avatar}`} className='p-2 pb-3 flex items-center justify-around flex-col bg-secondary600 rounded-lg shadow' >
                            <div className="flex flex-row align-center">
                                <img className="w-32 h-32" src={`${avatars[avatar]}`} alt="avatar" />
                                <h3 className={`text-primary100 text-xl font-semibold pl-2 self-center`}>{(avatarStory[avatar])[0]}</h3>
                            </div>
                            <p className={`text-secondary200 text-sm text-center font-semibold pl-2 pb-0.5`}>{(avatarStory[avatar])[1]}</p>
                            {
                                selectedAvatar === avatar &&
                                <div className="flex flex-row w-fit py-1 px-3 gap-1 mt-3 mx-4 text-xs text-secondary400 font-bold items-center">
                                    <i className="text-xl bi bi-check-circle"></i>
                                    <span className="pt-0.5">SELECTED</span>
                                </div>
                            }
                            {
                                unlockAvatars.includes(avatar) && selectedAvatar !== avatar &&
                                <button className="flex flex-row w-fit py-1 px-3 gap-1 mt-3 mx-4 text-xs text-primary200 font-bold items-center border border-light200 rounded-lg shadow hover:border-primary600" onClick={() => changeAvatar(avatar)} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={handleMouseLeave}>
                                    <i className={`text-sm bi ${hovered === index ? 'bi-check-circle' : 'bi-circle'}`}></i>
                                    <span className="pt-0.5">CHOSE</span>

                                </button>
                            }
                            {
                                !unlockAvatars.includes(avatar) && avatarPrice[avatar] <= budget &&
                                <button className="flex flex-row w-fit py-1 px-3 gap-1 mt-3 mx-4 text-xs text-primary200 font-bold items-center border border-light200 rounded-lg shadow hover:border-primary600" onClick={() => unlockAvatar(avatar)}>
                                    <i className="text-xl bi bi-key-fill"></i>
                                    UNLOCK NOW
                                    <span className="text-secondary400">{avatarPrice[avatar]}cc</span>
                                </button>
                            }
                            {
                                !unlockAvatars.includes(avatar) && avatarPrice[avatar] > budget &&
                                <div className="flex flex-row w-fit py-1 px-3 gap-1 mt-3 mx-4 text-xs text-primary200 font-semibold items-center">
                                    <i className="text-xl bi bi-shield-lock"></i>
                                    available for
                                    <span className="text-secondary400 font-bold">{avatarPrice[avatar]}cc</span>
                                </div>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default inLogger(AvatarForm);