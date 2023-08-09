import inLogger from '../inLogger';
import useHandleErrors from '../hooks/useHandleErrors';
import retrieveUser from '../logic/retrieve-user';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import retrieveLoggedUser from '../logic/retrieve-logged-user';
import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import LevelsCarrousel from '../components/LevelsCarrousel';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const handleErrors = useHandleErrors();
    const [user, setUser] = useState(null);
    const [loggedUser, setLoggedUser] = useState();
    const { id } = useParams();

    const getUser = () => {
        if (id !== 'you') {
            handleErrors(async () => {
                const user = await retrieveUser(id);
                const loggedUser = await retrieveLoggedUser();
                setUser(user);
                setLoggedUser(loggedUser);
                setIsLoading(false);
            })
        } else {
            handleErrors(async () => {
                const user = await retrieveLoggedUser();
                setUser(user);
                setLoggedUser(user);
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
        <section className="py-24 px-5 gap-5 md:gap-2 grid md:grid-cols-3 md:grid-rows-2 grid-cols-1 grid-rows-4">
            <div className="px-5">
                <UserCard userInfo={user} key={id} />
            </div>
            <div className="flex flex-col w-full justify-center align-center gap-2 md:col-span-2">
                <h2 className={`self-center text-2xl font-bold text-${user.color} `}>Achivements</h2>
            </div>
            <div className="flex flex-col w-full justify-center align-center gap-2 md:row-start-2 border-light300 bg-light400 md:shadow rounded-lg p-1">
                <h2 className={`self-center text-2xl font-bold text-${user.color} `}>Levels Created</h2>
                <LevelsCarrousel key={id} userId={user.id} type={'created'} saves={loggedUser.saves} />
            </div>
            <div className="flex flex-col w-full justify-center align-center gap-2 md:row-start-2 border-light300 bg-light400 rounded-lg md:shadow p-1 md:col-span-2">
                <h2 className={`self-center text-2xl font-bold text-${user.color} `}>Levels Saved</h2>
                <LevelsCarrousel key={id} userId={user.id} type={'saved'} saves={loggedUser.saves} />
            </div>
        </section>
    );
};

export default inLogger(Profile);