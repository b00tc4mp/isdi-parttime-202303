import { useState} from 'react';
import './DropSection.css';

const DropSection = () => {
  const [droppedItems, setDroppedItems] = useState([]);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const draggedItem = JSON.parse(event.dataTransfer.getData('application/json'));
    const dropSectionRect = event.target.getBoundingClientRect();
    const newItem = {
      id: draggedItem.id + new Date(),
      color: draggedItem.color,
      x: event.clientX - dropSectionRect.left, 
      y: event.clientY - dropSectionRect.top, 
    };
    setDroppedItems([...droppedItems, newItem]);
  };

  return (
    <div
      className="drop-section"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {droppedItems.map((item) => (
        <div
          key={item.id}
          className={`piece ${item.color}`}
          style={{
            position: 'absolute',
            left: item.x,
            top: item.y,
          }}
        ></div>
      ))}
    </div>
  );
};


export default DropSection;