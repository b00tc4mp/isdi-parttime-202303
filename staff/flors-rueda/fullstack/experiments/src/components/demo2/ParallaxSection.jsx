import { useEffect, useRef } from 'react';
import './ParallaxSection.css';

const ParallaxSection = ({ color, speed, isLastSection, children }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const parallaxScroll = () => {
      const scrolled = window.pageYOffset;
      const section = sectionRef.current;
      const translateValue = -scrolled * speed;

      section.style.transform = `translate(0, ${translateValue}px)`;
    };

    window.addEventListener('scroll', parallaxScroll);
    parallaxScroll();

    return () => {
      window.removeEventListener('scroll', parallaxScroll);
    };
  }, []);

  const backgroundStyle = {
    backgroundColor: `${color}`,
  };

  return (
    <div className="parallax-section" ref={sectionRef} >
      <div className="parallax-background" style={backgroundStyle} />
      <div className="parallax-content">
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
