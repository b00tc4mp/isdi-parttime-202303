import { Link } from 'react-router-dom';
import retrieveUser from '../logic/retrieve-user';
import inLogger from '../inLogger';
import { useState, useEffect } from 'react';
import useHandleErrors from '../hooks/useHandleErrors';
import avatars from '../assets/avatars/index';

const LevelCard = ({ levelInfo }) => {
    const [authorData, setAuthorData] = useState({});
    const handleErrors = useHandleErrors();

    const getAuthorData = () => {
        handleErrors(async () => {
            const user = await retrieveUser(levelInfo.author);
            console.log(user);
            setAuthorData(user);
        })
    }

    useEffect(() => {
        getAuthorData();
    }, []);


    return (
        <div className="w-full md:w-5/12 lg:w-3/12 md:max-w-sm p-6 bg-light500 border border-light300 rounded-lg shadow">
            <div className="flex justify-between">
                <div claclassNamess="flex items-start flex-col">
                    <h3 className="mb-2 text-2xl font-semibold tracking-tight text-primary200">{levelInfo.name}</h3>
                    <Link to={`/game/${levelInfo.id}`} className="inline-flex items-center text-secondary300 hover:underline">
                        Play now
                        <i className="bi bi-play-circle text-xl ps-1"></i>
                    </Link>
                </div>
                <div className="flex items-center flex-col">
                    <img className={`bg-${authorData.color} w-10 h-10 rounded-full`} src={`${avatars[authorData.avatar]}`} alt="avatar" />
                    <p className={`text-${authorData.color} text-sm font-semibold`}>{authorData.username}</p>
                    <p className={`text-${authorData.color} text-xs`}>{new Date(levelInfo.date).toLocaleDateString("en-GB")}</p>
                </div>
            </div>
        </div>
    )
}


export default inLogger(LevelCard);