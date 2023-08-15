import { useEffect } from 'react';
import inLogger from '../../inLogger';

const AlertToast = ({ handleCloseAlert, message, log }) => {
    useEffect(() => {
        log(message);
    }, []);

    return (
        <div className="fixed flex items-center w-screen h-screen justify-center z-40">
            <div className="flex gap-2 items-center px-1 justify-around w-fit max-w-2/6 h-fit text-dark100 bg-light200 border border-danger300 rounded-lg shadow" role="alert">
                <div className="inline-flex items-center justify-center w-8 h-8 text-dark200">
                    <i className="text-xl bi bi-exclamation-triangle"></i>
                </div>
                <div className="text-sm font-bold pl-1 py-4">{message}</div>
                <button type="button" onClick={handleCloseAlert} aria-label="Close" className="self-center">
                    <span className="sr-only">Close</span>
                    <i className="text-dark300 hover:text-danger100 bi bi-x-circle text-lg"></i>
                </button>
            </div>
        </div>
    )
}

export default inLogger(AlertToast)