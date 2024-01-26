import { useState, useEffect } from 'react';
import useHandleErrors from '../hooks/useHandleErrors';
import inLogger from '../inLogger';
import BasicLevelCard from './BasicLevelCard';
import LevelCard from './LevelCard';
import Loader from './Loader';
import retrieveLevelsByAuthor from '../logic/retrieve-levels-by-author';
import { useParams } from 'react-router-dom';
import retrieveLevelsSaved from '../logic/retrieve-levels-saved';

const ProfileLevels = ({ userId, userSaves, setToast, isDeleted, setDeleted, user, isProfileCurrentUser }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [levels, setLevels] = useState(null);
    const [saves, setSaves] = useState(userSaves);
    const [type, setType] = useState('created')
    const handleErrors = useHandleErrors();
    const { id } = useParams();

    const handleRefreshLevels = () => {
        handleErrors(async () => {
            if (type === 'created') {
                const levels = await retrieveLevelsByAuthor(userId);
                setLevels(levels);
            } else {
                const levels = await retrieveLevelsSaved(userId);
                setLevels(levels);
            }
            setIsLoading(false);
        })
    }

    useEffect(() => {
        handleRefreshLevels();
        setDeleted(false);
    }, [id, userId, saves, isDeleted, type]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <section className="flex flex-col md:col-span-2 md:justify-center items-center mt-10">
            <div className="flex flex-row md:justify-center items-center justify-around gap-3">
                <button onClick={() => setType('created')} className={`text-xl pt-0.5 ${type === 'created' ? `text-${user.color} cursor-default` : `text-dark500 hover:underline`}`}>
                    <i className="bi bi-hammer pe-2"></i>Levels Created
                </button>
                <span className="text-xl text-light300 font-semibold self-center">||</span>
                <button onClick={() => setType('saved')} className={`text-xl pt-0.5 ${type === 'saved' ? `text-${user.color} cursor-default` : `text-dark500 hover:underline`}`}>
                    <i className="bi bi-bookmarks-fill pe-2"></i>Favorite Levels
                </button>
            </div>
            <div className="flex flex-row w-full justify-center items-center pt-5 pb-20 gap-2 flex-wrap px-5">
                {!isLoading && levels.length > 0 && levels.map((level, index) => (
                    type === 'created' ?
                        <BasicLevelCard levelInfo={level} isLevelSaved={saves.includes(level.id)} setToast={setToast} key={index} setSaves={setSaves} />
                        :
                        <LevelCard levelInfo={level} isLevelSaved={isProfileCurrentUser ? true : saves.includes(level.id)} key={index} setSaves={setSaves} />
                ))
                }
                {!isLoading && !levels || levels.length === 0 && <i className="w-full flex align-center items-center justify-center text-light100 text-xl">No levels to be seen here!</i>}
            </div>
        </section>
    );
};

export default inLogger(ProfileLevels);