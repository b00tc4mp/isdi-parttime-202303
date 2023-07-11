import { useState } from 'react';

const Piece = ({ id, color }) => {
  const [position, setPosition] = useState({ x: 25, y: 25 });
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (event) => {
    event.dataTransfer.setData('application/json', JSON.stringify({ id, color }));
    event.dataTransfer.setDragImage(event.target, 0, 0);
  };

  const handleDrag = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    setPosition({ x, y });
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setPosition({ x: 25, y: 25 });
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      className={`piece ${color} ${isDragging ? 'dragging' : ''}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    ></div>
  );

};

export default Piece;