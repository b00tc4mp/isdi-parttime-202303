import inLogger from '../inLogger';
import useHandleErrors from '../hooks/useHandleErrors';
import retrieveUser from '../logic/retrieve-user';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import retrieveLoggedUser from '../logic/retrieve-logged-user';
import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';

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
        <section className="flex flex-col px-5 md:gap-5 md:flex-row pt-24 justify-center align-center">
            <UserCard userInfo={user} />
        </section>
    );
};

export default inLogger(Profile);