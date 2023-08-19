import inLogger from '../../inLogger';

const SuccessToast = ({ handleCloseToast, message }) => {
    return (
        <div className="fixed top-16 h-fit pt-2 pb-1 flex flex-row justify-around items-center w-full text-dark200 bg-success300 shadow z-30">
            <div className="flex flex-row w-full justify-center">
                <i className="text-xl bi bi-check2-circle text-success200"></i>
                <div className="ml-3 text-sm text-success100 font-semibold self-center">{message}</div>
            </div>
            <button type="button" onClick={handleCloseToast} aria-label="Close" className="mr-5">
                <span className="sr-only">Close</span>
                <i className="text-success200 hover:text-dark400 bi bi-x-circle text-lg"></i>
            </button>
        </div>

    )
}

export default inLogger(SuccessToast);