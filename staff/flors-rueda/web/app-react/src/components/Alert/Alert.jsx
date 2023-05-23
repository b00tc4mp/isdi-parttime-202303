import { svg } from '../../../assets/svg-paths';
import './Alert.css';
import inLogger from '../../inLogger';
import { useEffect } from 'react';

const Alert = ({ message, level, onClose, log }) => {
    const handleClose = (event) => {
        event.preventDefault();
        onClose();
    };

    useEffect(() => {
        log(message, level);
    }, []);

    return <section className={`alert ${level}`} >
        <div className="alert__left">
            <svg className="alert__left--reaction" xmlns="http://www.w3.org/2000/svg" viewBox={level === 'goodbye' ? "0 -960 960 960" : "0 96 960 960"}><path d={level === 'danger' ? svg.ko : level === 'goodbye' ? svg.sad : svg.happy} /></svg>
        </div>
        <div className="alert__right">
            <h2 className="alert__right--title">{level === 'danger' ? 'Oh, no!' : level === 'goodbye' ? 'It was nice while it lasted' : 'Hey there!'}</h2>
            <p className="alert__right--message">{message}</p>
            <span className="alert__right--close" onClick={handleClose}>ok, I get it</span>
        </div>
    </section>
}

export default inLogger(Alert)