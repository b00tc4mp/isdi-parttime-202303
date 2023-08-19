import { useEffect } from 'react';
import inLogger from '../../inLogger';

const AlertToast = ({ handleCloseAlert, message }) => {
    useEffect(() => {
        console.log(message);
    }, []);

    return (
        <div className="fixed top-16 h-fit pt-2.5 pb-1 flex flex-row justify-around items-center w-full text-danger200 bg-light400 shadow z-40">
            <div className="flex flex-row w-full justify-center">
                <i className="text-xl bi bi-exclamation-diamond text-danger200"></i>
                <div className="ml-3 text-sm font-bold self-center">{message}</div>
            </div>
            <button type="button" onClick={handleCloseAlert} aria-label="Close" className="mr-5">
                <span className="sr-only">Close</span>
                <i className="text-danger200 hover:text-dark400 bi bi-x-circle text-lg"></i>
            </button>
        </div>
    )
}

export default inLogger(AlertToast)