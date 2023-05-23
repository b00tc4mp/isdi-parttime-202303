import { svg } from '../../../assets/svg-paths';
import { useState } from 'react';
import './ThemeToggle.css';
import { context } from '../../context';
import inLogger from '../../logger';

const ThemeToggle = ({ onToggleChange }) => {
    const [isChecked, setIsChecked] = useState(context.theme === 'light');
  
    const handleToggleChange = () => {
      context.theme === 'light' ? setIsChecked(false) : setIsChecked(true);
      onToggleChange();
    };
  
    return (
      <section className="theme-toggle">
        <input type="checkbox" className="theme-toggle__checkbox" id="checkbox" checked={isChecked} onChange={handleToggleChange}/>
        <label htmlFor="checkbox" className="theme-toggle__label">
          <i>
            <svg className="theme-toggle__label--moon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 96 960 960">
              <path d={svg.sun} />
            </svg>
          </i>
          <i>
            <svg className="theme-toggle__label--sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d={svg.moon} />
            </svg>
          </i>
          <div className="theme-toggle__switch"></div>
        </label>
      </section>
    );
}

export default inLogger(ThemeToggle)