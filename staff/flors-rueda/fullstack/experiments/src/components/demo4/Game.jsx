import { useState, useRef, useEffect } from 'react';
import Character from './Character';
import './Game.css';

//TODO stop dragging even if its active when counter reaches 0

const Game = () => {
  const containerRef = useRef(null);
  const [grid, setGrid] = useState([
    { color: '', position: { x: 0, y: 0 } },
    { color: '', position: { x: 100, y: 0 } },
    { color: '', position: { x: 200, y: 0 } },
    { color: '', position: { x: 0, y: 100 } },
    { color: '', position: { x: 100, y: 100 } },
    { color: '', position: { x: 200, y: 100 } },
    { color: '', position: { x: 0, y: 200 } },
    { color: '', position: { x: 100, y: 200 } },
    { color: '', position: { x: 200, y: 200 } },
  ]);
  const [isCounterRunning, setIsCounterRunning] = useState(true);
  const [counter, setCounter] = useState(3);
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isCounterRunning) {
      interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    }

    if (!isCounterRunning || counter === 0) {
      clearInterval(interval);
      setIsDraggingEnabled(false);
      
    }

    return () => clearInterval(interval);
  }, [isCounterRunning, counter]);

  useEffect(() => {
    const allCellsSameColor = grid.every((cell) => cell.color === 'red');
    if (allCellsSameColor) {
      setIsCounterRunning(false);
    }
  }, [grid]);

  return (
    <div>
      <div className="counter">Your time: {counter} seconds</div>
      <div ref={containerRef} className="grid-container">
        {grid.map((cell, index) => (
          <div
            key={index}
            className={`grid-cell ${cell.color === 'red' && 'clean'}`}
            style={{
              top: cell.position.y,
              left: cell.position.x,
            }}
          ></div>
        ))}
        <Character
          color="red"
          startingPosition={{ x: 0, y: 0 }}
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