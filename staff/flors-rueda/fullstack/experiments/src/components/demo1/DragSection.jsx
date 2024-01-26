import { useRef } from 'react';
import Piece from './Piece';
import './DragSection.css';

const DragSection = () => {
  const windowWidth = useRef(window.innerWidth);
  const windowHeight = useRef(window.innerHeight);
  const containerRef = useRef(null);

  return (
    <section className="drag-section" ref={containerRef}>
      <Piece color={'red'} startingPosition={{ x: windowWidth.current / 5, y: windowHeight.current / 3 }} containerRef={containerRef} />
      <Piece color={'blue'} startingPosition={{ x: windowWidth.current / 5, y: 80 + windowHeight.current / 3 }} containerRef={containerRef} />
      <Piece color={'green'} startingPosition={{ x: windowWidth.current / 5, y: 160 + windowHeight.current / 3 }} containerRef={containerRef} />
    </section>
  );
}

export default DragSection;