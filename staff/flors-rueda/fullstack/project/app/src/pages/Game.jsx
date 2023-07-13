import { useState, useEffect } from 'react';
import CanvasContainer from '../components/game/CanvasContainer';
import GameOver from '../components/game/GameOver';
import { Player } from '@lottiefiles/react-lottie-player';
import { useParams, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import inLogger from '../inLogger';
import { configureLevelToRender } from '../helpers/configureLevelToRender';
import retrieveLevel from '../logic/retrieve-level';

const Game = ({ level }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const location = useLocation();
  const [levelToRender, setLevelToRender] = useState(null);
  const [key, setKey] = useState(1);
  const [floor, setFloor] = useState(null);
  const [health, setHealth] = useState(null);
  const [isGameOver, setIsGameOver] = useState(0); // 0 = playing, -1 = lost, 1 = won
  const [animation, setAnimation] = useState(null);
  const [isAnimationVisible, setAnimationVisible] = useState(false);

  useEffect(() => {
    const getLevel = async () => {
      if (id !== 'try') {
        try {
          const level = await retrieveLevel(id);
          const configuredLevel = configureLevelToRender(level.layout);
          setLevelToRender(configuredLevel);
          setFloor(configuredLevel[0]);
          setHealth(level.hp ? level.hp : 5);
          setIsLoading(false);
        } catch (error) {
          console.log(`retrieve level error: ${error.message}`);
          setIsLoading(false);
        }
      } else {
        const { level, hp } = location.state;
        setLevelToRender(level);
        setFloor(level[0]);
        setHealth(hp ? hp : 5);
        setIsLoading(false);
      }
    };

    getLevel();
  }, [id]);



  const handleOnSolved = () => {
    setKey(key + 1);
    setFloor(levelToRender[key]);
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
      <img key={index} src="/game/hp.png" className="w-8 h-8" />
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

  if (isLoading) {
    return <Loader />;
  }

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
      {isGameOver !== 0 && (
        <>
          <GameOver isGameWon={isGameOver > 0 ? true : false} />
          <div className="top-0 inset-0 bg-black opacity-50"></div>
        </>
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

export default inLogger(Game);
