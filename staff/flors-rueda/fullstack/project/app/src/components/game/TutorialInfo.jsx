import inLogger from '../../inLogger';
import { Link, useNavigate } from 'react-router-dom';
import isUserLoggedIn from '../../logic/is-user-logged-in';
import useHandleErrors from '../../hooks/useHandleErrors';
import updateTutorialAchievements from '../../logic/update-tutorial-achievements';

const TutorialInfo = ({ onExitClick, tutorialNumber }) => {
    const navigate = useNavigate();
    const handleErrors = useHandleErrors();

    const tutorialTexts = [
        `Let's see how you roll, little beach ball... Move a bit around and get that treasure!`,
        `Some times those caves are longer and you need to go down a hole...`,
        `Bombs deal damage, go ahead and try.`,
        `Why would you do that? If you loose all your life... you're out!
        That's why health is a good thing to get.`,
        `By the way, have you seen those dirt blocks? Thanks to our round figures it's easy to push and pass through them!`,
        `You seem quite ready, let's try it all together!`,
        `You are indeed a rider, go and explore more mazes!`
    ]

    if (tutorialNumber === 6) {
        if (isUserLoggedIn()) {
            handleErrors(async () => {
                await updateTutorialAchievements();
            })
        }
    }

    const handleToRegister = () => {
        navigate('/signin', { state: { startingForm: 'register' } });
    }

    return (
        <div className="fixed inset-0 flex w-full h-full pt-12 items-center justify-center z-30">
            <div className="w-full h-full p-4 text-dark300 text-center bg-light400 rounded-lg shadow">
                <div className="flex items-center flex-col justify-center gap-10 py-4 md:py-20 px-10">
                    <h1 className="text-5xl text-primary100 font-normal">Learning the basics</h1>
                    <div className="text-sm font-normal">
                        <p className="mb-1 text-lg font-bold text-secondary200">{tutorialTexts[tutorialNumber]}</p>
                    </div>
                    {tutorialNumber > 5 ? isUserLoggedIn() ?
                        <Link type="button" to="/levels" className="text-4xl text-secondary300 hover:text-secondary500">EXPL<i className="bi bi-play-circle"></i>RE MORE LEVELS</Link>
                        :
                        <button type="button" onClick={handleToRegister} className="text-4xl text-secondary300 hover:text-secondary500">BEC<i className="bi bi-play-circle"></i>ME A RIDER</button>
                        :
                        <button type="button" onClick={onExitClick} className="text-4xl text-secondary300 hover:text-secondary500">G<i className="bi bi-play-circle"></i></button>
                    }
                    <div className="flex text-success200 text-3xl items-center flex-row justify-center gap-5 width-full">

                        <i className={`bi bi-1-circle${tutorialNumber > 0 ? '-fill' : ''}`}></i>
                        <i className={`bi bi-2-circle${tutorialNumber > 1 ? '-fill' : ''}`}></i>
                        <i className={`bi bi-3-circle${tutorialNumber > 2 ? '-fill' : ''}`}></i>
                        <i className={`bi bi-4-circle${tutorialNumber > 3 ? '-fill' : ''}`}></i>
                        <i className={`bi bi-5-circle${tutorialNumber > 4 ? '-fill' : ''}`}></i>
                        <i className={`bi bi-6-circle${tutorialNumber > 5 ? '-fill' : ''}`}></i>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default inLogger(TutorialInfo);