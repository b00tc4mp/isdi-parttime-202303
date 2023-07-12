import { Link } from 'react-router-dom';
import inLogger from '../inLogger';

const LevelCard = ({ levelInfo }) => {
    return (
        <div className="max-w-sm p-6 bg-light500 border border-light300 rounded-lg shadow">
            <h3 className="mb-2 text-2xl font-semibold tracking-tight text-primary200">{levelInfo.name}</h3>
            <Link to={`/game/${levelInfo.id}`} className="inline-flex items-center text-secondary300 hover:underline">
                Play now
                <i className="bi bi-play-circle text-xl ps-1"></i>
            </Link>
        </div>
    )
}


export default inLogger(LevelCard);