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
    const { id } = useParams();

    const getUser = () => {
        if (id !== 'you') {
            handleErrors(async () => {
                const user = await retrieveUser(id);
                setUser(user);
                setIsLoading(false);
            })
        } else {
            handleErrors(async () => {
                const user = await retrieveLoggedUser();
                setUser(user);
                setIsLoading(false);
            })
        }
        console.log(user)
    };

    useEffect(() => {
        getUser();
    }, [id]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className="pt-24 grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 grid-rows-4 md:gap-5">
            <div className="md:pl-10 px-5">
                <UserCard userInfo={user} />
            </div>
            <div className="flex flex-col w-full justify-center align-center gap-2">
                <h2 className={`self-center text-2xl font-bold text-${user.color} `}>Levels Created</h2>
                <LevelsCarrousel userId={user.id} type={'created'} />
            </div>
        </section>
    );
};

export default inLogger(Profile);