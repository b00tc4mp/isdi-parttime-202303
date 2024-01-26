import inLogger from '../../inLogger';

const CreateLevelToast = ({ handleCloseToast, message }) => {

    return (
        <div className="fixed inset-0 flex items-center w-full h-full justify-center z-40">
            <div id="toast-warning" className="flex items-center justify-around w-full max-w-xs p-4 text-dark200 gap-2 bg-light400 mx-2 rounded-lg shadow">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-dark500 bg-warning200 rounded-lg">
                    <i className="text-xl bi bi-exclamation-triangle"></i>
                </div>
                <p className="text-sm font-normal">{message}</p>
                <button type="button" onClick={handleCloseToast} aria-label="Close">
                    <span className="sr-only">Close</span>
                    <i className="text-dark300 hover:text-dark400 bi bi-x-circle text-lg"></i>
                </button>
            </div>
        </div>
    )
}

export default inLogger(CreateLevelToast);