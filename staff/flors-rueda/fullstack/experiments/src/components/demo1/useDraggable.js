import { useState, useRef, useEffect } from 'react';

const useDraggable = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const draggableRef = useRef(null);

    useEffect(() => {
        const handleMouseDown = (event) => {
            event.preventDefault();
            const clientX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
            const clientY = event.type === 'touchstart' ? event.touches[0].clientY : event.clientY;
            const { left, top } = draggableRef.current.getBoundingClientRect();
            setDragOffset({ x: clientX - left, y: clientY - top });
            setIsDragging(true);
        };

        const handleMouseMove = (event) => {
            if (isDragging) {
                const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
                const clientY = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;
                setPosition({ x: clientX - dragOffset.x, y: clientY - dragOffset.y });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        draggableRef.current.addEventListener('mousedown', handleMouseDown);
        draggableRef.current.addEventListener('touchstart', handleMouseDown, { passive: false });
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleMouseMove, { passive: false });
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchend', handleMouseUp);

        return () => {
            draggableRef.current.removeEventListener('mousedown', handleMouseDown);
            draggableRef.current.removeEventListener('touchstart', handleMouseDown, { passive: false });
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleMouseMove, { passive: false });
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchend', handleMouseUp);
        };
    }, []);

    return { draggableRef, position, setIsDragging };
};

export default useDraggable;
