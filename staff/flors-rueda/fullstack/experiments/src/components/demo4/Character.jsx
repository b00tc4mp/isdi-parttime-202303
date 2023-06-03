import { useState, useRef, useEffect } from 'react';
import './Character.css';

const Character = ({ color, startingPosition, containerRef, grid, setGrid, isDraggingEnabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(startingPosition);
  const draggableRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const draggableElement = draggableRef.current;

    const handleStart = (event) => {
      event.preventDefault();

      if (!isDraggingEnabled) {
        return;
      }

      setIsDragging(true);
      const clientX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
      const clientY = event.type === 'touchstart' ? event.touches[0].clientY : event.clientY;
      const { left, top } = containerRef.current.getBoundingClientRect();
      dragOffset.current = { x: clientX - left - position.x, y: clientY - top - position.y };
    };

    const handleMove = (event) => {
      if (isDragging) {
        const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
        const clientY = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;
        const { left, top } = containerRef.current.getBoundingClientRect();
        const x = clientX - left - dragOffset.current.x;
        const y = clientY - top - dragOffset.current.y;

        const containerRect = containerRef.current.getBoundingClientRect();
        const minX = 0;
        const minY = 0;
        const maxX = containerRect.width - draggableElement.offsetWidth;
        const maxY = containerRect.height - draggableElement.offsetHeight;

        const heldX = Math.max(minX, Math.min(x, maxX));
        const heldY = Math.max(minY, Math.min(y, maxY));

        setPosition({ x: heldX, y: heldY });

        const cellIndex = Math.floor(heldY / 100) * 3 + Math.floor(heldX / 100);
        if (cellIndex >= 0 && cellIndex < grid.length) {
          const updatedGrid = [...grid];
          updatedGrid[cellIndex].color = color;
          setGrid(updatedGrid);

          const allCellsSameColor = updatedGrid.every((cell) => cell.color === color);
          if (allCellsSameColor) {
            setIsDragging(false);
          }
        }
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    draggableElement.addEventListener('mousedown', handleStart);
    draggableElement.addEventListener('touchstart', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);

    return () => {
      draggableElement.removeEventListener('mousedown', handleStart);
      draggableElement.removeEventListener('touchstart', handleStart);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, position, containerRef, grid, color, setGrid, isDraggingEnabled]);

  return (
    <div
      ref={draggableRef}
      className={`character ${color} ${isDragging ? 'dragging' : ''}`}
      style={{
        top: position.y,
        left: position.x,
        pointerEvents: isDraggingEnabled ? 'auto' : 'none',
      }}
    ></div>
  );
};

export default Character;
