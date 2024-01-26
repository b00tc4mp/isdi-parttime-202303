import { Link } from 'react-router-dom';
import inLogger from '../../inLogger';
import useHandleErrors from '../../hooks/useHandleErrors';
import isUserLoggedIn from '../../logic/is-user-logged-in';
import { useEffect, useState } from 'react';
import toggleLike from '../../logic/toggle-like';
import updateCC from '../../logic/update-cc';
import updateGameAchievements from '../../logic/update-game-achievements'
import { getGameCC } from '../../helpers/game/getGameCC';
import retrieveCC from '../../logic/retrieve-cc';
import updateCCAchievements from '../../logic/update-cc-achievements';
import updateSocialAchievements from '../../logic/update-social-achievements';
import CreatedLevelOver from './CreatedLevelOver';

const GameOver = ({ isGameWon, onRetry, isCreatedLevel, layout, hp, name, id, likesInfo, gameData, createData, levelId }) => {
    const handleErrors = useHandleErrors();
    const [isLiked, setIsLiked] = useState(isCreatedLevel ? null : likesInfo.isLevelLiked);
    const [likes, setLikes] = useState(isCreatedLevel ? null : likesInfo.likes.length);
    const [remainingCC, setRemainingCC] = useState(null);
    const [wonCC, setWonCC] = useState(null);

    const handleLikeClick = () => {
        handleErrors(async () => {
            await toggleLike(id);
            await updateSocialAchievements();
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
            setIsLiked(!isLiked);
        })
    }

    const updateAchievements = () => {
        handleErrors(async () => {
            const earnedCC = getGameCC(gameData);
            setWonCC(earnedCC);
            await updateCC(earnedCC, '+');
            await updateCCAchievements(earnedCC, '+');
            await updateGameAchievements(gameData);
        })
    };

    useEffect(() => {
        handleErrors(async () => {
            if (!isCreatedLevel && isUserLoggedIn()) {
                await updateAchievements();
            };
            if (isCreatedLevel && isUserLoggedIn()) {
                const cc = await retrieveCC();
                if (cc) setRemainingCC(cc - createData.cc);
            }
        })

    }, []);


    return (
        <div className="fixed inset-0 flex items-center justify-center z-30">
            <div className="w-full h-full p-4 text-dark300 text-center bg-light400 rounded-lg shadow overflow-y-auto">
                <div className="flex items-center flex-col justify-center gap-3 py-20 px-10">
                    <div className="text-sm font-normal">
                        <div className="mb-1 text-xl font-bold text-secondary300">{`${name}`}</div>
                        {
                            !isCreatedLevel || !isUserLoggedIn() && <>
                                <div className="mb-1 text-lg font-bold text-primary100">{isGameWon ? `Yeei!!` : `Oh, no!!`}</div>
                                <div className="mb-2 text-sm font-normal text-secondary100">{isGameWon ? `You found the treasure!` : `You died!`}</div></>
                        }

                    </div>
                    {
                        isCreatedLevel ?
                            <CreatedLevelOver layout={layout} hp={hp} name={name} createData={createData} levelId={levelId} remainingCC={remainingCC} />
                            :
                            <div className="min-w-fit w-4/6 md:w-2/6 lg:w-1/4 flex flex-col justify-center align-center gap-5">
                                <div className="flex flex-row gap-2 justify-center">
                                    <button onClick={handleLikeClick}><i className={`hover:text-light100 bi ${isLiked ? 'bi-suit-heart-fill' : 'bi-suit-heart'}`}></i></button>
                                    {likes}
                                </div>
                                <div className="text-secondary200 mb-2">
                                    You won <span className="text-primary200 font-bold">{'  ' + wonCC}</span> cc
                                </div>
                                <button type="button" className="w-full text-success100 bg-success300 hover:bg-success200 hover:text-light500  focus:ring-4 focus:outline-none focus:ring-success300 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={onRetry}>Play again</button>
                                <Link type="button" className="w-full text-secondary100 bg-light300 hover:bg-light200  focus:ring-4 focus:outline-none focus:ring-light300 font-medium rounded-lg text-sm px-4 py-2 text-center " to="/levels">Check other levels</Link>
                            </div>
                    }
                </div>
            </div>

        </div>

    )
}

export default inLogger(GameOver);