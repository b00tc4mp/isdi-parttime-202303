import { useState } from 'react';
import CanvasContainer from '../../components/demo6/CanvasContainer';
import { level1 } from '../../components/demo6/levels';
import GameOverModal from '../../components/demo6/GameOverModal';

const Demo6 = () => {
  const [key, setKey] = useState(1);
  const [floor, setFloor] = useState(level1[0]);
  const [health, setHealth] = useState(5)
  const [isGameOver, setIsGameOver] = useState(0) // 0 = no, -1 = lost, 1 = won

  const handleOnSolved = () => {
    setKey(key + 1)
    setFloor(level1[key]);
    console.log(`level`, key);
  };

  const handleOnBomb = () => {
    setHealth(health - 1);
    if (health === 0) setIsGameOver(-1);
  };

  const handleOnGameWon = () => {
    setIsGameOver(1)
  }

  return (
    <>
      {isGameOver !== 0 && <>
        <GameOverModal isGameWon={true} />
        <div className="fixed top-0 inset-0 bg-black opacity-50"></div>
      </>}
      <CanvasContainer key={key} floor={floor} onSolved={handleOnSolved} onBomb={handleOnBomb} onGameWon={handleOnGameWon} />
    </>

  );
};

export default Demo6;