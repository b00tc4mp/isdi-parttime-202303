import { useState, useEffect } from 'react';
import CanvasContainer from './CanvasContainer';
import { Player } from '@lottiefiles/react-lottie-player';
import inLogger from '../../inLogger';
import animations from '../../assets/animations';

const GameContainer = ({ level, initialHp, onGameOver, avatar, setGameData }) => {
    const [key, setKey] = useState(1);
    const [floor, setFloor] = useState(level[0]);
    const [health, setHealth] = useState(initialHp);
    const [isGameOver, setIsGameOver] = useState(0); // 0 = playing, -1 = lost, 1 = won
    const [animation, setAnimation] = useState(null);
    const [isAnimationVisible, setAnimationVisible] = useState(false);

    const handleOnSolved = () => {
        setKey(key + 1);
        setFloor(level[key]);
        setGameData(prevGameData => ({
            ...prevGameData,
            holes: key,
        }));
    };

    const handleOnBomb = () => {
        setAnimation('bomb');
        setAnimationVisible(true);
        setHealth(prevHealth => {
            const newHealth = prevHealth - 1;
            if (newHealth === 0) {
                setIsGameOver(-1);
                onGameOver(-1);
            }
            return newHealth;
        });
        setGameData(prevGameData => ({
            ...prevGameData,
            bombs: prevGameData.bombs + 1,
        }));
    };

    const handleOnLife = () => {
        setAnimation('life');
        setAnimationVisible(true);
        setHealth(prevHealth => {
            const newHealth = prevHealth + 1;
            return newHealth > 7 ? 7 : newHealth;
        });
    };

    const handleOnGameWon = () => {
        setAnimation('won');
        setAnimationVisible(true);
        setGameData(prevGameData => ({
            ...prevGameData,
            life: health,
        }));
    };

    const renderHealthImages = () => {
        return Array.from({ length: health }, (_, index) => (
            <img key={index} src="/game/hp.png" className="w-8 h-8" />
        ));
    };

    const renderNonHealth = () => {
        return Array.from({ length: 7 - health }, (_, index) => (
            <p key={index} className="w-8 h-8">o</p>
        ));
    };

    useEffect(() => {
        if (health === 0) {
            setIsGameOver(-1);
            onGameOver(-1);
        }
    }, [health]);


    useEffect(() => {
        if (isAnimationVisible) {
            const timeout = setTimeout(() => {
                setAnimationVisible(false);
                if (animation === 'won') {
                    setIsGameOver(1);
                    onGameOver(1);
                }
            }, animations[animation].time);

            return () => clearTimeout(timeout);
        }
    }, [isAnimationVisible, animation, health]);

    return (
        <div className="flex flex-col flex-wrap">
            {isAnimationVisible && (
                <Player
                    autoplay
                    loop={false}
                    src={animations[animation].json}
                    background="transparent"
                    className={`w-full bottom-0 fixed inset-0 ${animation === 'won' ? 'opacity-100' : 'opacity-50 mt-24'}`}
                />
            )}
            <div className="flex flex-col items-center overflow-hidden">
                <CanvasContainer key={key} floor={floor} onSolved={handleOnSolved} onBomb={handleOnBomb} onLife={handleOnLife} onGameWon={handleOnGameWon} isGameOver={isGameOver} avatar={avatar} />
                <div className="flex flex-row overflow-hidden gap-2 pt-1 text-primary100">
                    {renderHealthImages()}
                    {renderNonHealth()}
                </div>
            </div>
        </div>
    );
};

export default inLogger(GameContainer);