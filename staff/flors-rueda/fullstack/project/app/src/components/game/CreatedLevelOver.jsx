import inLogger from '../../inLogger';
import isUserLoggedIn from '../../logic/is-user-logged-in';
import { Link, useNavigate } from 'react-router-dom';
import createLevel from '../../logic/create-level';
import useHandleErrors from '../../hooks/useHandleErrors';
import updateCC from '../../logic/update-cc';
import updateCreateAchievements from '../../logic/update-create-achievements';
import editIcons from '../../assets/editIcons/index';
import updateCCAchievements from '../../logic/update-cc-achievements';
import editLevel from '../../logic/edit-level'

const CreatedLevelOver = ({ layout, hp, name, createData, levelId, remainingCC }) => {
    const navigate = useNavigate();
    const handleErrors = useHandleErrors();

    const handlePostLevel = () => {
        handleErrors(async () => {
            await updateCC(createData.cc, '-');
            await updateCCAchievements(createData.cc, '-');
            delete createData.cc;
            if (!levelId) {
                await createLevel(name, layout, hp);
                await updateCreateAchievements(createData);
            } else {
                await editLevel(levelId, name, layout, hp);
            }
            navigate('/home');
        })
    }

    const handleEditLevel = () => {
        navigate('/create', { state: { initialLevel: layout, hpSelected: hp, nameSelected: name, levelId: levelId } })
    }

    const handleGoBack = () => {
        isUserLoggedIn() ? navigate('/levels') : navigate('/signin', { state: { startingForm: 'register' } })
    }

    return (
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
                    {
                        levelId ?
                            <p className="flex flex-row text-secondary300 self-center">
                                <span className="text-secondary300">Postexcavation Works Fee</span>
                                <b>
                                    <i className="text-primary100 bi bi-arrow-right-short self-center text-xs"></i>
                                    100cc
                                </b>
                            </p>
                            :
                            <p className="flex flex-row text-secondary300 self-center">
                                <span className="text-secondary300">Mining Fee</span>
                                <b>
                                    <i className="text-primary100 bi bi-arrow-right-short self-center text-xs"></i>
                                    50cc
                                </b>
                            </p>
                    }
                    <p className="border-t-2 border-t-light100 text-xl text-primary200 flex flex-col gap-1">
                        <span>Total: <b className="text-danger200">{createData.cc}cc</b></span>
                        <span className="text-light100">After your savings will be
                            <span>
                                <i className="text-xl text-primary400 bi bi-piggy-bank pl-2 pr-0.5"></i>
                                <b className="text-success200">{remainingCC}cc</b>
                            </span>
                        </span>
                    </p>
                </div>
            }
            <div className="mb-1 text-lg font-bold text-secondary300">What now?</div>
            <button type="button" className="w-full text-secondary100 bg-light300 hover:bg-light200 focus:ring-4 focus:outline-none focus:ring-light300 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={handleEditLevel}>Edit level</button>
            {
                isUserLoggedIn() ?
                    <>
                        <button type="button" className="w-full text-success100 bg-success300 hover:bg-success200 hover:text-light500  focus:ring-4 focus:outline-none focus:ring-success300 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={handlePostLevel}>{levelId ? 'Save changes' : 'Post level'}</button>
                        {levelId ?
                            <Link to="/profile/you" type="button" className="w-full text-danger100 bg-danger300 hover:bg-danger200 hover:text-light500 focus:ring-4 focus:outline-none focus:ring-danger300 font-medium rounded-lg text-sm px-4 py-2 text-center">Cancel changes</Link>
                            :
                            <button type="button" className="w-full text-danger100 bg-danger300 hover:bg-danger200 hover:text-light500 focus:ring-4 focus:outline-none focus:ring-danger300 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={handleGoBack}>Delete level</button>
                        }
                    </>
                    :
                    <button type="button" className="w-full text-success100 bg-success300 hover:bg-success200 hover:text-light500  focus:ring-4 focus:outline-none focus:ring-success300 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={handleGoBack}>Join now!</button>
            }
        </div>
    )
}

export default inLogger(CreatedLevelOver)