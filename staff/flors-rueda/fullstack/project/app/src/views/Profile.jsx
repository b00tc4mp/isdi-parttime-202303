import inLogger from '../inLogger';
import useHandleErrors from '../hooks/useHandleErrors';
import retrieveUser from '../logic/retrieve-user';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import retrieveLoggedUser from '../logic/retrieve-logged-user';
import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import retrieveCompleteAchievements from '../logic/retrieve-complete-achievements';
import DeleteToast from '../components/toasts/DeleteToast';
import Trophies from '../components/Trophies';
import ProfileLevels from '../components/ProfileLevels';
import isCurrentUser from '../logic/is-current-user';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const handleErrors = useHandleErrors();
    const [isProfileCurrentUser, setIsProfileCurrentUser] = useState(null);
    const [user, setUser] = useState(null);
    const [loggedUser, setLoggedUser] = useState();
    const [achievements, setAchievements] = useState();
    const [isDeleted, setDeleted] = useState(false);
    const { id } = useParams();
    const [toast, setToast] = useState('');

    useEffect(() => {
        id === 'you' || isCurrentUser(id) ? setIsProfileCurrentUser(true) : setIsProfileCurrentUser(false)
    }, [id]);

    const getUser = () => {
        if (id !== 'you') {
            handleErrors(async () => {
                const user = await retrieveUser(id);
                const loggedUser = await retrieveLoggedUser();
                const _achievements = await retrieveCompleteAchievements(user.id);
                setUser(user);
                setAchievements(_achievements);
                setLoggedUser(loggedUser);
                setIsLoading(false);
            })
        } else {
            handleErrors(async () => {
                const user = await retrieveLoggedUser();
                const _achievements = await retrieveCompleteAchievements(user.id);
                setUser(user);
                setAchievements(_achievements);
                setLoggedUser(user);
                setIsLoading(false);
            })
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getUser();
    }, [id]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            {toast && <DeleteToast handleCloseToast={() => setToast('')} levelId={toast} setDeleted={setDeleted} />}
            <section className="pb-24 pt-16 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:px-20">
                    <div className="px-5 md:pt-10 md:w-4/5 md:px-0">
                        <UserCard userInfo={user} key={id} isProfileCurrentUser={isProfileCurrentUser} />
                    </div>
                    <div className="flex flex-col w-full h-full justify-center align-center gap-2 border-light300 bg-light400 rounded-lg mt-5">
                        <h2 className={`self-center text-2xl font-bold text-${user.color}`}>Trophies</h2>
                        <Trophies achievements={achievements} />
                    </div>
                </div>
                <ProfileLevels key={id} userId={user.id} type={'saved'} userSaves={loggedUser.saves} isDeleted={isDeleted} setDeleted={setDeleted} user={user} setToast={setToast} isProfileCurrentUser={isProfileCurrentUser} />
            </section>
        </>
    );
};

export default inLogger(Profile);