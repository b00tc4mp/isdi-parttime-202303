import { useState, useEffect } from 'react';
import inLogger from '../inLogger';
import { tutorialLevels } from '../components/game/tutorialLevels';
import TutorialInfo from '../components/game/TutorialInfo';
import TutorialGameContainer from '../components/game/TutorialGameContainer';
import useLockScroll from '../hooks/useLockScroll';

const Tutorial = () => {
    const [key, setKey] = useState(0);
    const [isTutorialInfoOn, setTutorialInfoOn] = useState(true);
    const { lockScroll, unlockScroll } = useLockScroll();
    lockScroll();

    const handleFinishTutorialLevel = () => {
        setKey(prevKey => prevKey + 1);
        unlockScroll();
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setTutorialInfoOn(true);
    }, [key]);

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
                />
            }
        </section>
    );
};

export default inLogger(Tutorial);