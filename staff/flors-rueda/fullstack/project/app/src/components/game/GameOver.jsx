import { Link, useNavigate } from 'react-router-dom';
import inLogger from '../../inLogger';
import createLevel from '../../logic/create-level';
import useHandleErrors from '../../hooks/useHandleErrors';
import isUserLoggedIn from '../../logic/is-user-logged-in';
import { useEffect, useState } from 'react';
import toggleLike from '../../logic/toggle-like';
import getPlayerId from '../../logic/get-player-id';
import updateGameAchievements from '../../logic/update-game-achievements'
import updateCreateAchievements from '../../logic/update-create-achievements';

const GameOver = ({ isGameWon, onRetry, isCreatedLevel, layout, hp, name, likesInfo, id, gameData, createData }) => {
    const navigate = useNavigate();
    const handleErrors = useHandleErrors();
    const [isLiked, setIsLiked] = useState(isCreatedLevel ? null : likesInfo.isLevelLiked);
    const [likes, setLikes] = useState(isCreatedLevel ? null : likesInfo.likes.length);

    const handlePostLevel = () => {
        handleErrors(async () => {
            await createLevel(name, layout, hp);
            await updateCreateAchievements(createData)
            navigate('/levels');
        })
    }

    const handleLikeClick = () => {
        handleErrors(async () => {
            await toggleLike(id);
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
            setIsLiked(!isLiked);
        })
    }

    const handleEditLevel = () => {
        navigate('/create', { state: { initialLevel: layout, hpSelected: hp, nameSelected: name } })
    }

    const handleGoBack = () => {
        isUserLoggedIn() ? navigate('/levels') : navigate('/signin', { state: { startingForm: 'register' } })
    }

    const updateAchievements = () => {
        gameData.cc = 0;
        handleErrors(async () => {
            await updateGameAchievements(gameData);
        })
    };

    useEffect(() => {
        const getAchievements = async () => {
            if (isUserLoggedIn() && !isCreatedLevel) {
                await updateAchievements();
            }
        };
        getAchievements();
    }, []);


    return (
        <div className="fixed inset-0 flex w-full h-full pt-10 items-center justify-center z-30">
            <div className="w-full h-full p-4 text-dark300 text-center bg-light400 rounded-lg shadow">
                <div className="flex items-center flex-col justify-center gap-10 py-20 px-10">
                    <div className="ml-3 text-sm font-normal">
                        <div className="mb-1 text-xl font-bold text-secondary300">{`${name}`}</div>
                        <div className="mb-1 text-lg font-bold text-primary100">{isGameWon ? `Yeei!!` : `Oh, no!!`}</div>
                        <div className="mb-2 text-sm font-normal text-secondary100">{isGameWon ? `You found the treasure!` : `You died!`}</div>
                    </div>
                    {
                        isCreatedLevel ?
                            <div className="min-w-fit w-4/6 md:w-2/6 lg:w-1/4 flex flex-col justify-center align-center gap-5">
                                <div className="mb-1 text-lg font-bold text-secondary300">{name}</div>
                                <div className="text-secondary100 mb-2">
                                    Bombs: {createData.bombs}, Life: {createData.life}, CC: {createData.cc}, Floors: {createData.floors}
                                </div>
                                <div className="mb-1 text-lg font-bold text-secondary300">What now?</div>
                                <button type="button" className="w-full text-secondary100 bg-light300 hover:bg-light200 focus:ring-4 focus:outline-none focus:ring-light300 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={handleEditLevel}>Edit level</button>
                                {
                                    isUserLoggedIn() ?
                                        <>
                                            <button type="button" className="w-full text-success100 bg-success300 hover:bg-success200 hover:text-light500  focus:ring-4 focus:outline-none focus:ring-success300 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={handlePostLevel}>Post level</button>
                                            <button type="button" className="w-full  text-danger100 bg-danger300 hover:bg-danger200 hover:text-light500 focus:ring-4 focus:outline-none focus:ring-danger300 font-medium rounded-lg text-sm px-4 py-2 text-center " onClick={handleGoBack}>Delete level</button>
                                        </>
                                        :
                                        <button type="button" className="w-full text-success100 bg-success300 hover:bg-success200 hover:text-light500  focus:ring-4 focus:outline-none focus:ring-success300 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={handleGoBack}>Join now!</button>
                                }
                            </div>
                            :
                            <div className="min-w-fit w-4/6 md:w-2/6 lg:w-1/4 flex flex-col justify-center align-center gap-5">
                                <div className="flex flex-row gap-2 justify-center">
                                    <button onClick={handleLikeClick}><i className={`hover:text-light100 bi ${isLiked ? 'bi-suit-heart-fill' : 'bi-suit-heart'}`}></i></button>
                                    {likes}
                                </div>
                                {/* Render game data */}
                                <div className="text-secondary100 mb-2">
                                    Holes: {gameData.holes}, Bombs: {gameData.bombs}, Life: {gameData.life}, CC: {gameData.cc}
                                </div>
                                {/* Render achievements */}

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