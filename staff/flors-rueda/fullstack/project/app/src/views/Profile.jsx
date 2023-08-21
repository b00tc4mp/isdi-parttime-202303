import inLogger from '../inLogger';
import useHandleErrors from '../hooks/useHandleErrors';
import retrieveUser from '../logic/retrieve-user';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import retrieveLoggedUser from '../logic/retrieve-logged-user';
import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import LevelsCarrousel from '../components/LevelsCarrousel';
import retrieveCompleteAchievements from '../logic/retrieve-complete-achievements';
import DeleteToast from '../components/toasts/DeleteToast';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const handleErrors = useHandleErrors();
    const [user, setUser] = useState(null);
    const [loggedUser, setLoggedUser] = useState();
    const [achievements, setAchievements] = useState();
    const [follows, setFollows] = useState();
    const [isDeleted, setDeleted] = useState(false);
    const { id } = useParams();
    const [toast, setToast] = useState('');

    const getUser = () => {
        if (id !== 'you') {
            handleErrors(async () => {
                const user = await retrieveUser(id);
                const loggedUser = await retrieveLoggedUser();
                const _achievements = await retrieveCompleteAchievements(user.id);
                setUser(user);
                setAchievements(_achievements);
                setLoggedUser(loggedUser);
                setFollows(user.follows);
                setIsLoading(false);
            })
        } else {
            handleErrors(async () => {
                const user = await retrieveLoggedUser();
                const _achievements = await retrieveCompleteAchievements(user.id);
                setUser(user);
                setAchievements(_achievements);
                setLoggedUser(user);
                setFollows(user.follows);
                setIsLoading(false);
            })
        }
    };

    useEffect(() => {
        getUser();
    }, [id]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            {toast && <DeleteToast handleCloseToast={() => setToast('')} levelId={toast} setDeleted={setDeleted} />}
            <section className="py-24 px-5 gap-5 md:gap-2 grid md:grid-cols-6 md:grid-rows-2 grid-cols-1 grid-rows-4 md:divide-y md:divide-x">
                <div className="px-5 md:col-span-3 md:pt-5">
                    <UserCard userInfo={user} key={id} />
                </div>
                <div className="flex flex-col w-full h-full justify-center align-center gap-2 border-light300 bg-light400 rounded-lg p-1 md:col-span-3 md:col-start-4">
                    <h2 className={`self-center text-2xl font-bold text-${user.color} `}>Trophies</h2>
                    <div className="text-secondary100">
                        <ul>
                            {achievements.map((achievement, index) => (
                                <li key={index}>{achievement.name} - {achievement.rank}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col w-full justify-center align-center gap-2 md:row-start-2 md:col-span-2 border-light300 bg-light400 rounded-lg p-1">
                    <h2 className={`self-center text-2xl font-bold text-${user.color} `}>Levels Created</h2>
                    <LevelsCarrousel setToast={setToast} key={id} userId={user.id} type={'created'} userSaves={loggedUser.saves} isDeleted={isDeleted} setDeleted={setDeleted} />
                </div>
                <div className="flex flex-col w-full justify-center align-center gap-2 md:row-start-2 md:col-start-3 border-light300 bg-light400 rounded-lg p-1 md:col-span-4">
                    <h2 className={`self-center text-2xl font-bold text-${user.color} `}>Favorite Levels</h2>
                    <LevelsCarrousel key={id} userId={user.id} type={'saved'} userSaves={loggedUser.saves} isDeleted={isDeleted} setDeleted={setDeleted} />
                </div>
            </section>
        </>
    );
};

export default inLogger(Profile);