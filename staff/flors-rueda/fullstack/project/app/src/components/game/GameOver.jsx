import { Link, useNavigate } from 'react-router-dom';
import inLogger from '../../inLogger';
import createLevel from '../../logic/create-level';
import useHandleErrors from '../hooks/useHandleErrors';

const GameOver = ({ isGameWon, onRetry, isCreatedLevel, layout, hp, name }) => {
    const navigate = useNavigate();
    const handleErrors = useHandleErrors();

    const handlePostLevel = () => {
        handleErrors(async () => {
            await createLevel(name, layout, hp);
            navigate('/levels');
        })
    }

    const handleEditLevel = () => {
        navigate('/create', { state: { initialLevel: layout, hpSelected: hp, nameSelected: name } })
    }

    return (
        <div className="fixed inset-0 flex w-full h-full pt-10 items-center justify-center z-30">
            <div className="w-full h-full p-4 text-dark300 text-center bg-light400 rounded-lg shadow">
                <div className="flex items-center flex-col justify-center gap-10 py-20 px-10">
                    <div className="ml-3 text-sm font-normal">
                        <div className="mb-1 text-xl font-bold text-secondary300">{`${name}`}</div>
                        <div className="mb-1 text-lg font-bold text-primary100">{isGameWon ? `Yeei!!` : `Oh, no!!`}</div>
                        <div className="mb-2 text-sm font-normal text-secondary100">{isGameWon ? `Your beach ball found the treasure!` : `Your beach ball died!`}</div>
                    </div>
                    {
                        isCreatedLevel ?
                            <div className="min-w-fit w-4/6 md:w-2/6 lg:w-1/4 flex flex-col justify-center align-center gap-5">
                                <div className="mb-1 text-lg font-bold text-secondary300">What now?</div>
                                <button type="button" className="w-full text-secondary100 bg-light300 hover:bg-light200 focus:ring-4 focus:outline-none focus:ring-light300 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={handleEditLevel}>Edit level</button>
                                <button type="button" className="w-full text-success100 bg-success300 hover:bg-success200 hover:text-light500  focus:ring-4 focus:outline-none focus:ring-success300 font-medium rounded-lg text-sm px-4 py-2 text-center" onClick={handlePostLevel}>Post level</button>
                                <Link type="button" className="w-full  text-danger100 bg-danger300 hover:bg-danger200 hover:text-light500 focus:ring-4 focus:outline-none focus:ring-danger300 font-medium rounded-lg text-sm px-4 py-2 text-center " to="/levels">Delete level</Link>

                            </div>
                            :
                            <div className="min-w-fit w-4/6 md:w-2/6 lg:w-1/4 flex flex-col justify-center align-center gap-5">
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