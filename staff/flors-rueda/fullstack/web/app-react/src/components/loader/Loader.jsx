import inLogger from '../../inLogger';
import './Loader.css';

//TODO put loader in context

const Loader = () => {
    return <div className="loader-container">
                <div className="loader"><div></div><div></div><div></div><div></div></div>
           </div>
}

export default inLogger(Loader)