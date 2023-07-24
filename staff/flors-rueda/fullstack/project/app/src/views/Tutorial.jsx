import { useState, useEffect } from 'react';
import inLogger from '../inLogger';
import { tutorialLevels } from '../components/game/tutorialLevels';
import TutorialInfo from '../components/game/TutorialInfo';
import TutorialGameContainer from '../components/game/TutorialGameContainer';
import useHandleErrors from '../hooks/useHandleErrors';
import isUserLoggedIn from '../logic/is-user-logged-in';
import retrieveLoggedUser from '../logic/retrieve-logged-user';

const Tutorial = () => {
    const [key, setKey] = useState(0);
    const [isTutorialInfoOn, setTutorialInfoOn] = useState(true);
    const [avatar, setAvatar] = useState('beach');
    const handleErrors = useHandleErrors();

    const handleFinishTutorialLevel = () => {
        setKey(prevKey => prevKey + 1);
    };

    const handleCloseTutorialScreen = () => {
        setTutorialInfoOn(false);
    };

    return (
        <section className="flex flex-col flex-wrap">
            {isTutorialInfoOn && (
                <>
                    <TutorialInfo onExitClick={handleCloseTutorialScreen} tutorialNumber={key} />
                    <div className="top-0 inset-0 bg-black z-20 opacity-50"></div>
                </>
            )}
            {key < 6 &&
                < TutorialGameContainer
                    key={key}
                    tutorialLevel={tutorialLevels[key]}
                    onFinishTutorialLevel={handleFinishTutorialLevel}
                    avatar={avatar}
                />
            }
        </section>
    );
};

export default inLogger(Tutorial);
