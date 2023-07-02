import inLogger from '../../inLogger';

const GameOverModal = ({ isGameWon, onExitClick }) => {
    return (
        <div className="fixed inset-0 flex pt-5 items-center justify-center z-30">
            <div className="h-4/6 w-full p-4 text-dark300 bg-light300 rounded-lg shadow md:w-8/12 lg:w-6/12" role="alert">
                <div className="flex items-center flex-col justify-center gap-10 py-20 px-10">
                    {
                        /*TODO add image depending of winning or loosing
                        <img className="w-8 h-8 rounded-full shadow-lg" src="" alt="" />*/
                    }
                    <div className="ml-3 text-sm font-normal">
                        <span className="mb-1 text-lg font-bold text-primary100">{isGameWon ? `Yeei!!` : `Oh, no!!`}</span>
                        <div className="mb-2 text-sm font-normal text-secondary100">{isGameWon ? `Your beach ball found the treasure!` : `Your beach ball died!`}</div>
                    </div>
                    <button type="button" className="w-10/12 md:w-8/12 lg:w-6/12 text-white bg-danger100 hover:bg-danger200 focus:ring-4 focus:outline-none focus:ring-danger300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0" onClick={onExitClick}>exit</button>
                </div>
            </div>

        </div>

    )
}

export default inLogger(GameOverModal);