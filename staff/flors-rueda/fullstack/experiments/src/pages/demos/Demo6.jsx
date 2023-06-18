import { useState } from 'react';
import CanvasContainer from '../../components/demo6/CanvasContainer';
import { level1 } from '../../components/demo6/levels';

const Demo6 = () => {
  const [key, setKey] = useState(1);
  const [floor, setFloor] = useState(level1[0]);

  const handleOnSolved = () => {
    setKey(key + 1)
    setFloor(level1[key]);
    console.log(`level`, key);
  };

  return (
    <CanvasContainer key={key} floor={floor} onSolved={handleOnSolved} />
  );
};

export default Demo6;