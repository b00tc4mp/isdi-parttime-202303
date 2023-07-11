import { configureLevelToRender } from '../helpers/configureLevelToRender';
import retrieveLevel from '../logic/retrieve-level';
import inLogger from '../inLogger';

const LevelCard = ({ levelInfo, onLevelClick }) => {
    const handleOnLevelClick = () => {
        try {
            retrieveLevel(levelInfo.id, (error, level) => {
                if (error) {
                    console.log(`retrieve level: ${error.message}`)
                    return;
                }
                onLevelClick(configureLevelToRender(level.layout));
            });

        } catch (error) {
            console.log(`retrieve level: ${error.message}`, 'danger');
        }
    }

    return (
        <div className="max-w-sm p-6 bg-light500 border border-light300 rounded-lg shadow">
            <h3 className="mb-2 text-2xl font-semibold tracking-tight text-primary200">{levelInfo.name}</h3>
            <a href="#" className="inline-flex items-center text-secondary300 hover:underline" onClick={handleOnLevelClick}>
                Play now
                <i className="bi bi-play-circle text-xl ps-1"></i>
            </a>
        </div>
    )
}


export default inLogger(LevelCard);