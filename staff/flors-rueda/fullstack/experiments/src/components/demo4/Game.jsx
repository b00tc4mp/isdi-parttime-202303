import { useState, useRef, useEffect } from 'react';
import Character from './Character';
import './Game.css';

const Game = () => {

  //TODO change "direction" of the position
  const containerRef = useRef(null);
  const [grid, setGrid] = useState([
    { isClean: true, position: { x: 0, y: 0 }, density: 0 },
    { isClean: false, position: { x: 100, y: 0 }, density: 4 },
    { isClean: false, position: { x: 200, y: 0 }, density: 6 },
    { isClean: false, position: { x: 0, y: 100 }, density: 5 },
    { isClean: false, position: { x: 100, y: 100 }, density: 9 },
    { isClean: false, position: { x: 200, y: 100 }, density: 8 },
    { isClean: false, position: { x: 0, y: 200 }, density: 1 },
    { isClean: false, position: { x: 100, y: 200 }, density: 7 },
    { isClean: false, position: { x: 200, y: 200 }, density: 2 },
  ]);
  const [isCounterRunning, setIsCounterRunning] = useState(true);
  const [counter, setCounter] = useState(10000);
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isCounterRunning) {
      interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1);
    }

    if (!isCounterRunning || counter === 0) {
      clearInterval(interval);
      setIsDraggingEnabled(false);
    }

    return () => clearInterval(interval);
  }, [isCounterRunning, counter]);

  useEffect(() => {
    const allCellsSameColor = grid.every((cell) => cell.isClean);
    if (allCellsSameColor) {
      setIsCounterRunning(false);
    }
  }, [grid]);

  return (
    <div>
      <div className="counter">Your time: {counter} ms</div>
      <div ref={containerRef} className="grid-container">
        {grid.map((cell) => (
          <div
            key={`${cell.position.x}-${cell.position.y}`}
            className={`grid-cell density-${cell.density} ${cell.isClean === 'character' && 'clean'}`}
            style={{
              top: cell.position.y,
              left: cell.position.x,
            }}
          ></div>
        ))}
        <Character
          containerRef={containerRef}
          grid={grid}
          setGrid={setGrid}
          isDraggingEnabled={isDraggingEnabled}
        />
      </div>
    </div>
  );
};

export default Game;