import { useEffect } from 'react';
import inLogger from '../../inLogger';

const AlertToast = ({ handleCloseAlert, message, log }) => {
    useEffect(() => {
        log(message);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center w-full h-full justify-center z-50">
            <div className="flex items-center px-1 justify-around w-full max-w-xs text-dark100 bg-light200 border border-danger300 rounded-lg shadow" role="alert">
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