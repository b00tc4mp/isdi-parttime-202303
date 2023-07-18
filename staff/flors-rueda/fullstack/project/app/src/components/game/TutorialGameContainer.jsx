import { useState, useEffect } from 'react';
import CanvasContainer from './CanvasContainer';
import { Player } from '@lottiefiles/react-lottie-player';
import inLogger from '../../inLogger';
import { configureLevelToRender } from '../../helpers/configureLevelToRender';

const TutorialGameContainer = ({ tutorialLevel, onFinishTutorialLevel }) => {
    const [level, setLevel] = useState(configureLevelToRender(tutorialLevel))
    const [key, setKey] = useState(1);
    const [floor, setFloor] = useState(level[0]);
    const [health, setHealth] = useState(5);
    const [isGameOver, setIsGameOver] = useState(0); // 0 = playing, -1 = lost, 1 = won
    const [animation, setAnimation] = useState(null);
    const [isAnimationVisible, setAnimationVisible] = useState(false);


    const handleOnSolved = () => {
        setKey(key + 1);
        setFloor(level[key]);
    };

    const handleOnBomb = () => {
        setHealth((prevHealth) => {
            setAnimation('bomb');
            setAnimationVisible(true);
            const newHealth = prevHealth - 1;
            if (newHealth === 0) {
                setIsGameOver(-1);
            };
            return newHealth;
        });
    };

    const handleOnLife = () => {
        setHealth((prevHealth) => {
            const newHealth = prevHealth + 1;
            setAnimation('life');
            setAnimationVisible(true);
            return newHealth > 7 ? 7 : newHealth;
        });
    };

    const handleOnGameWon = () => {
        setAnimation('won');
        setAnimationVisible(true);
    };

    useEffect(() => {
        if (health === 0) {
            setIsGameOver(-1);
            onFinishTutorialLevel();
        }
    }, [health]);

    const renderHealthImages = () => {
        return Array.from({ length: health }, (_, index) => (
            <img key={index} src="game/hp.png" className="w-8 h-8" />
        ));
    };

    const renderNonHealth = () => {
        return Array.from({ length: 7 - health }, (_, index) => (
            <p key={index} className="w-8 h-8">o</p>
        ));
    };

    useEffect(() => {
        if (isAnimationVisible) {
            const animationDuration = animation === 'life' ? 1500 : 1000;
            const timeout = setTimeout(() => {
                setAnimationVisible(false);
                if (animation === 'won') {
                    setIsGameOver(1);
                    onFinishTutorialLevel();
                }
            }, animationDuration);

            return () => clearTimeout(timeout);
        }
    }, [isAnimationVisible, animation]);

    return (
        <div className="flex flex-col flex-wrap">
            {isAnimationVisible && (
                <Player
                    autoplay
                    loop={false}
                    src={
                        animation === 'bomb' ? 'https://assets5.lottiefiles.com/packages/lf20_eTfeoS.json' :
                            animation === 'life' ? 'https://assets7.lottiefiles.com/packages/lf20_cnqc27rl.json' :
                                'https://assets10.lottiefiles.com/packages/lf20_lPOuBVlqdu.json'
                    }
                    className="bottom-0 fixed inset-0"
                    style={animation === 'won' ? {
                        width: '100%',
                        opacity: 1,
                    } : {
                        margin: '30rem 0 0',
                        width: '100%',
                        opacity: 0.75,
                    }}

                />
            )}
            <div className="flex flex-col items-center overflow-hidden">
                <CanvasContainer key={key} floor={floor} onSolved={handleOnSolved} onBomb={handleOnBomb} onLife={handleOnLife} onGameWon={handleOnGameWon} isGameOver={isGameOver} />
                <div className="flex flex-row overflow-hidden gap-2 pt-1 text-primary100">
                    {renderHealthImages()}
                    {renderNonHealth()}
                </div>
            </div>
        </div>
    );
};

export default inLogger(TutorialGameContainer);
