import React from 'react';
import useDraggable from './useDraggable';
import './Character.css';

const Character = ({ startingPosition, containerRef, grid, setGrid, isDraggingEnabled }) => {
  const { draggableRef, position } = useDraggable(containerRef, grid, setGrid, isDraggingEnabled);

  return (
    <div
      ref={draggableRef}
      className="character"
      style={{
        top: position.y,
        left: position.x,
        pointerEvents: isDraggingEnabled ? 'auto' : 'none',
      }}
    ></div>
  );
};

export default Character;