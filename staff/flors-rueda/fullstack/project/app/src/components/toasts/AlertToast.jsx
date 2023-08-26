import { useEffect } from 'react';
import inLogger from '../../inLogger';

const AlertToast = ({ handleCloseAlert, message }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            handleCloseAlert();
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed top-16 h-fit pt-2.5 pb-1 flex flex-row justify-around items-center w-full text-danger200 bg-danger300 shadow z-40 px-3">
            <div className="flex flex-row w-full justify-center">
                <i className="text-xl bi bi-exclamation-diamond text-danger200"></i>
                <p className="ml-3 text-sm font-bold self-center">{message}</p>
            </div>
            <button type="button" onClick={handleCloseAlert} aria-label="Close" className="mr-5">
                <span className="sr-only">Close</span>
                <i className="text-danger200 hover:text-dark400 bi bi-x-circle text-lg"></i>
            </button>
        </div>
    )
}

export default inLogger(AlertToast)