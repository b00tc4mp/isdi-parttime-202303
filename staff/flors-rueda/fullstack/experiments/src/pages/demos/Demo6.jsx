import { useState, useEffect } from 'react';
import CanvasContainer from '../../components/demo6/CanvasContainer';
import { level1 } from '../../components/demo6/levels';
import GameOverModal from '../../components/demo6/GameOverModal';

//TODO fix bug after loosing

const Demo6 = () => {
  const [key, setKey] = useState(1);
  const [floor, setFloor] = useState(level1[0]);
  const [health, setHealth] = useState(5);
  const [isGameOver, setIsGameOver] = useState(0); // 0 = playing, -1 = lost, 1 = won

  const handleOnSolved = () => {
    setKey(key + 1);
    setFloor(level1[key]);
  };

  const handleOnBomb = () => {
    setHealth((prevHealth) => {
      const newHealth = prevHealth - 1;
      if (newHealth === 0) setIsGameOver(-1);
      return newHealth;
    });
  };

  const handleOnLife = () => {
    setHealth((prevHealth) => {
      const newHealth = prevHealth + 1;
      return newHealth > 7 ? 7 : newHealth;
    });
  };

  const handleOnGameWon = () => {
    setIsGameOver(1);
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

  return (
    <>
      {isGameOver !== 0 && (
        <>
          <GameOverModal isGameWon={isGameOver > 0 ? true : false} />
          <div className="fixed top-0 inset-0 bg-black opacity-50"></div>
        </>
      )}
      <div className="game-interface">
        <CanvasContainer key={key} floor={floor} onSolved={handleOnSolved} onBomb={handleOnBomb} onLife={handleOnLife} onGameWon={handleOnGameWon} isGameOver={isGameOver} />
        <div className="health-container">
          {renderHealthImages()}
          {renderNonHealth()}
        </div>
      </div>
    </>
  );
};

export default Demo6;
