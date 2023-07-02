import { Player } from '@lottiefiles/react-lottie-player';

import inLogger from '../inLogger';

const NoConnectionToast = () => {
    return (
        <div className="fixed inset-0 flex pt-5 items-center justify-center z-30">
            <div className="flex flex-col items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
                <Player
                    src="https://assets9.lottiefiles.com/packages/lf20_q7cT0p.json"
                    background="transparent"
                    speed="1"
                    style={{ width: '300px', height: '300px' }}
                    loop
                    controls
                    autoplay
                />
                <div className="text-4xl font-normal">We're working on something!</div>
                <div className="text-xl font-normal">Connection failed, try again later. Sorry!</div>
            </div>
        </div>

    )
}

export default inLogger(NoConnectionToast);