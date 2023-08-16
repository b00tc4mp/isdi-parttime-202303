import { Link, useNavigate } from 'react-router-dom';
import inLogger from '../../inLogger';
import createLevel from '../../logic/create-level';
import useHandleErrors from '../../hooks/useHandleErrors';
import isUserLoggedIn from '../../logic/is-user-logged-in';
import { useEffect, useState } from 'react';
import toggleLike from '../../logic/toggle-like';
import updateCC from '../../logic/update-cc';
import updateGameAchievements from '../../logic/update-game-achievements'
import updateCreateAchievements from '../../logic/update-create-achievements';
import { getGameCC } from '../../helpers/game/getGameCC';
import editIcons from '../../assets/editIcons/index';
import useLockScroll from '../../hooks/useLockScroll';
import retrieveCC from '../../logic/retrieve-cc';

const GameOver = ({ isGameWon, onRetry, isCreatedLevel, layout, hp, name, likesInfo, id, gameData, createData }) => {
    const navigate = useNavigate();
    const handleErrors = useHandleErrors();
    const [isLiked, setIsLiked] = useState(isCreatedLevel ? null : likesInfo.isLevelLiked);
    const [likes, setLikes] = useState(isCreatedLevel ? null : likesInfo.likes.length);
    const [remainingCC, setRemainingCC] = useState(null);
    const earnedCC = isCreatedLevel ? null : getGameCC(gameData);
    const { unlockScroll } = useLockScroll();

    unlockScroll();

    const handlePostLevel = () => {
        handleErrors(async () => {
            await updateCC(-createData.cost)
            await createLevel(name, layout, hp);
            await updateCreateAchievements(createData);
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
        gameData.cc = earnedCC;
        handleErrors(async () => {
            await updateCC(gameData.cc)
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
        <div className="fixed inset-0 flex w-full h-full pt-1 items-center justify-center z-30">
            <div className="w-full h-full p-4 text-dark300 text-center bg-light400 rounded-lg shadow">
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
                            <div className="min-w-fit w-4/6 md:w-2/6 lg:w-1/4 flex flex-col justify-center align-center gap-5">
                                {
                                    isUserLoggedIn() &&
                                    <div className="text-secondary100 mb-2 flex flex-col gap-1 justify-center items-center">
                                        <h5 className="text-priamry500 mb-2">Creation Bill:</h5>
                                        <div className="w-full px-2 flex flex-row flex-wrap gap-5 align-center justify-center">
                                            <p className="flex flex-row text-secondary300 align-center">
                                                <img src={editIcons.bomb} className="w-8 h-8" alt="bomb" />
                                                <b className="self-center">
                                                    <i className="text-primary100 bi bi-arrow-right-short self-center text-xs"></i>
                                                    {createData.bombs * 10}cc
                                                </b>
                                            </p>
                                            <p className="flex flex-row text-secondary300">
                                                <img src={editIcons.life} className="w-8 h-8" alt="life" />
                                                <b className="self-center">
                                                    <i className="text-primary100 bi bi-arrow-right-short self-center text-xs"></i>
                                                    {createData.life * 15}cc
                                                </b>
                                            </p>
                                            <p className="flex flex-row text-secondary300">
                                                <img src={editIcons.hole} className="w-8 h-8" alt="hole" />
                                                <b className="self-center">
                                                    <i className="text-primary100 bi bi-arrow-right-short self-center text-xs"></i>
                                                    {(createData.floors - 1) * 2}cc
                                                </b>
                                            </p>
                                            <p className="flex flex-row text-secondary300">
                                                <img src={editIcons.dirt} className="w-8 h-8" alt="dirt" />
                                                <b className="self-center">
                                                    <i className="text-primary100 bi bi-arrow-right-short self-center text-xs"></i>
                                                    {createData.dirt * 5}cc
                                                </b>
                                            </p>
                                        </div>
                                        <p className="flex flex-row text-secondary300 self-center">
                                            <span className="text-secondary300">Mining Fee</span>
                                            <b>
                                                <i className="text-primary100 bi bi-arrow-right-short self-center text-xs"></i>
                                                50cc
                                            </b>
                                        </p>
                                        <p className="border-t-2 border-t-light100 text-xl text-primary200 flex flex-col gap-1">
                                            <span>Total: <b className="text-danger300">{createData.cc}cc</b></span>
                                            <span><i className="text-xl text-primary400 bi bi-piggy-bank"></i><b className="text-success200">               {remainingCC}cc</b></span>
                                        </p>
                                    </div>
                                }
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
                                <div className="text-secondary200 mb-2">
                                    You won <span className="text-primary200 font-bold">{'  ' + earnedCC}</span> cc
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