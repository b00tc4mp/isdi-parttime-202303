import { useState, useEffect } from 'react';
import inLogger from '../inLogger';
import { tutorialLevels } from '../components/game/tutorialLevels';
import TutorialInfo from '../components/game/TutorialInfo';
import { configureLevelToRender } from '../helpers/configureLevelToRender';
import TutorialGame from '../components/game/TutorialGame';

const Tutorial = () => {
    const [key, setKey] = useState(0);
    const [isTutorialInfoOn, setTutorialInfoOn] = useState(true);

    const handleFinishTutorialLevel = () => {
        setKey(prevKey => prevKey + 1);
    };

    useEffect(() => {
        setTutorialInfoOn(true);
    }, [key]);

    const handleCloseTutorialScreen = () => {
        setTutorialInfoOn(false);
    };

    return (
        <div className="flex flex-col flex-wrap">
            {isTutorialInfoOn && (
                <>
                    <TutorialInfo onExitClick={handleCloseTutorialScreen} tutorialNumber={key} />
                    <div className="top-0 inset-0 bg-black z-20 opacity-50"></div>
                </>
            )}
            {key < 6 &&
                < TutorialGame
                    key={key}
                    tutorialLevel={tutorialLevels[key]}
                    onFinishTutorialLevel={handleFinishTutorialLevel}
                />
            }
        </div>
    );
};

export default inLogger(Tutorial);
