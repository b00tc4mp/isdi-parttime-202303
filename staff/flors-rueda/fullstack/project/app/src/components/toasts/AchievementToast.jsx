import { useEffect } from 'react';
import inLogger from '../../inLogger';

const AchievementToast = ({ handleCloseToast, message }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            handleCloseToast();
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed top-16 h-fit pt-2 pb-1 flex flex-row justify-around items-center w-full text-dark200 bg-success300 shadow z-40 px-3">
            <div className="flex flex-row w-full justify-center">
                <i className="text-xl bi bi-trophy text-success200"></i>
                <p className="ml-3 text-sm text-success100 font-semibold self-center">{message}</p>
            </div>
            <button type="button" onClick={handleCloseToast} aria-label="Close" className="mr-5">
                <span className="sr-only">Close</span>
                <i className="text-success200 hover:text-dark400 bi bi-x-circle text-lg"></i>
            </button>
        </div>

    )
}

export default inLogger(AchievementToast);