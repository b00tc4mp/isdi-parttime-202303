import { useState, useRef, useEffect } from 'react';
import './Piece.css';

const Piece = ({ color, startingPosition, containerRef }) => {
  //TODO fix bug that when selecting item after scrolling and having container almost out of view when dropping the piece goes all the way to the top.

  //TODO refactor with drag events ?

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(startingPosition);
  const [dragOff, setDragOff] = useState({ x: 0, y: 0 });

  const draggableRef = useRef(null);

  useEffect(() => {
    const draggableElement = draggableRef.current;

    const handleStart = (event) => {
      event.preventDefault();
      const clientX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
      const clientY = event.type === 'touchstart' ? event.touches[0].clientY : event.clientY;
      setIsDragging(true);
      const offX = clientX - position.x;
      const offY = clientY - position.y;
      setDragOff({ x: offX, y: offY });
    };

    const handleMove = (event) => {
      if (isDragging) {
        let newX, newY;

        if (event.type === 'touchmove') {
          newX = event.touches[0].clientX - dragOff.x;
          newY = event.touches[0].clientY - dragOff.y;
        } else {
          newX = event.clientX - dragOff.x;
          newY = event.clientY - dragOff.y;
        }

        const containerRect = containerRef.current.getBoundingClientRect();
        const pieceRect = draggableRef.current.getBoundingClientRect();

        const minX = containerRect.left;
        const minY = containerRect.top;
        const maxX = containerRect.right - pieceRect.width;
        const maxY = containerRect.bottom - pieceRect.height;

        const heldX = Math.max(minX, Math.min(newX, maxX));
        const heldY = Math.max(minY, Math.min(newY, maxY));

        setPosition({ x: heldX, y: heldY });
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    draggableElement.addEventListener('mousedown', handleStart);
    draggableElement.addEventListener('touchstart', handleStart, { passive: false });
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);

    return () => {
      draggableElement.removeEventListener('mousedown', handleStart);
      draggableElement.removeEventListener('touchstart', handleStart, { passive: false });
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove, { passive: false });
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, position, dragOff]);

  return (
    <div
      ref={draggableRef}
      className={`piece ${color} ${isDragging ? 'dragging' : ''}`}
      style={{
        top: position.y,
        left: position.x,
      }}
    ></div>
  );
};

export default Piece;