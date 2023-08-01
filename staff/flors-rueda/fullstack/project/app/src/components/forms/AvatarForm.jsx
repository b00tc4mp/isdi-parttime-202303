import { useEffect, useState } from 'react';
import inLogger from '../../inLogger';
import { assets } from 'com';
import avatarStory from '../../assets/avatars/avatarStory'
import avatars from '../../assets/avatars';
import retrieveLoggedUser from '../../logic/retrieve-logged-user';
import useHandleErrors from '../../hooks/useHandleErrors';
import updateAvatar from '../../logic/update-avatar';

//TODO open toaster when saved

const AvatarForm = () => {
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const handleErrors = useHandleErrors();

    const getUserAvatar = () => {
        handleErrors(async () => {
            const user = await retrieveLoggedUser();
            setSelectedAvatar(user.avatar)
        })
    }

    const changeAvatar = (avatar) => {
        handleErrors(async () => {
            await updateAvatar(avatar);
        })

        setSelectedAvatar(avatar)
    }

    useEffect(() => {
        getUserAvatar()
    }, [selectedAvatar]);

    return (
        <div className="w-full mt-5">
            <div>
                <ul className="p-3 grid md:grid-cols-2 md:grid-rows-6 lg:grid-cols-3 lg:grid-rows-4 gap-5">
                    {assets.avatars.map((avatar, index) => (
                        <li key={`${index}_${avatar}`} >
                            <button
                                className={`p-2 flex items-center flex-col bg-secondary600 rounded-lg hover:ring-1 hover:ring-primary100 shadow md:hover:opacity-100 ${selectedAvatar === avatar ? 'ring-1 ring-primary100 md:ring-0 md:opacity-100' : 'md:opacity-50'}`}
                                onClick={() => changeAvatar(avatar)}
                            >
                                <div className="flex flex-row align-center">
                                    <img className="w-18 h-18" src={`${avatars[avatar]}`} alt="avatar" />
                                    <span className={`text-secondary100 text-xl font-semibold pl-2 self-center`}>{(avatarStory[avatar])[0]}</span>
                                </div>
                                <span className={`text-secondary100 text-sm text-center font-semibold pl-2 pb-0.5`}>{(avatarStory[avatar])[1]}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default inLogger(AvatarForm);