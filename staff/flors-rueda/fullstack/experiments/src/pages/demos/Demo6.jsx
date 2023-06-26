import { useState, useEffect } from 'react';
import CanvasContainer from '../../components/demo6/CanvasContainer';
import { level1 } from '../../components/demo6/levels';
import GameOverModal from '../../components/demo6/GameOverModal';
import { Player } from '@lottiefiles/react-lottie-player';

//TODO fix bug after loosing

const Demo6 = ({ level }) => {
  const [key, setKey] = useState(1);
  const [floor, setFloor] = useState(level ? level[0] : level1[0]);
  const [health, setHealth] = useState(5);
  const [isGameOver, setIsGameOver] = useState(0); // 0 = playing, -1 = lost, 1 = won
  const [animation, setAnimation] = useState(null);
  const [isAnimationVisible, setAnimationVisible] = useState(false);

  const handleOnSolved = () => {
    setKey(key + 1);
    setFloor(level ? level[key] : level1[key]);
  };

  const handleOnBomb = () => {
    setHealth((prevHealth) => {
      setAnimation('bomb');
      setAnimationVisible(true);
      const newHealth = prevHealth - 1;
      if (newHealth === 0) setIsGameOver(-1);
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
    }
  }, [health]);

  const renderHealthImages = () => {
    return Array.from({ length: health }, (_, index) => (
      <img key={index} src="assets/demo6/hp.png" className="w-8 h-8" />
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
        if (animation === 'won') setIsGameOver(1)
      }, animationDuration);

      return () => clearTimeout(timeout);
    }
  }, [isAnimationVisible, animation]);

  return (
    <div className="game">
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
      {isGameOver !== 0 && (
        <>
          <GameOverModal isGameWon={isGameOver > 0 ? true : false} />
          <div className="top-0 inset-0 bg-black opacity-50"></div>
        </>
      )}
      <div className="game-interface">
        <CanvasContainer key={key} floor={floor} onSolved={handleOnSolved} onBomb={handleOnBomb} onLife={handleOnLife} onGameWon={handleOnGameWon} isGameOver={isGameOver} />
        <div className="health-container">
          {renderHealthImages()}
          {renderNonHealth()}
        </div>
      </div>
    </div>
  );
};

export default Demo6;
