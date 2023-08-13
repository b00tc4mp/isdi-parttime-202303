import inLogger from '../../inLogger';

const AchievementToast = ({ handleCloseToast, message }) => {
    return (
        <div className="fixed top-16 flex flex-row justify-around items-center w-full text-dark200 bg-light400 z-50">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-dark500 rounded-lg">
                <i className="text-xl bi bi-trophy"></i>
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <button type="button" onClick={handleCloseToast} aria-label="Close">
                <span className="sr-only">Close</span>
                <i className="text-dark300 hover:text-dark400 bi bi-x-circle text-lg"></i>
            </button>
        </div>

    )
}

export default inLogger(AchievementToast);