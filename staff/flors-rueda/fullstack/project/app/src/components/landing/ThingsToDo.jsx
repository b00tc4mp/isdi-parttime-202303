import { Link } from 'react-router-dom';
import inLogger from '../../inLogger';

const ThingsToDo = ({ handleToRegister }) => {
    return (
        <div className="bg-darkShadow w-full px-10 py-24">
            <h2 className="text-light500 text-4xl font-semibold mb-8 tracking-wide text-center">Interested in finding the <span className="text-primary600">treasures</span> of <span className="text-primary500">Ballopolis?</span></h2>
            <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-4 lg:grid-cols-4 lg:grid-rows-1 md:px-6 lg:px-8 sm:px-2">
                <button className="bg-light500 hover:bg-light500 shadow text-dark300 font-semibold py-2 px-4 hover:text-secondary300 text-center border border-light500 rounded-xl" onClick={handleToRegister}>
                    <i className="bi bi-box-arrow-in-right pe-1" />Join now!
                </button>
                <Link className="bg-light500 hover:bg-light500 shadow text-dark300 font-semibold py-2 px-4 hover:text-secondary300 text-center border border-light500 rounded-xl" to="/tutorial">
                    <i className="bi bi-mortarboard-fill pe-1" />Try the tutorial
                </Link>
                <Link className="bg-light500 hover:bg-light500 shadow text-dark300 font-semibold py-2 px-4 hover:text-secondary300 text-center border border-light500 rounded-xl" to="/create">
                    <i className="bi bi-grid-3x3-gap-fill pe-1" />Try creating a level
                </Link>
                <Link className="bg-light500 hover:bg-light500 shadow text-dark300 font-semibold py-2 px-4 hover:text-secondary300 text-center border border-light500 rounded-xl" to="/about">
                    <i className="bi bi-info-square-fill pe-1" />Learn more
                </Link>

            </div>
        </div>
    )
}

export default inLogger(ThingsToDo);