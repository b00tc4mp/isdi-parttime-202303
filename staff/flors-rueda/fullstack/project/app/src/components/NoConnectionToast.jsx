import { Player } from '@lottiefiles/react-lottie-player';

import inLogger from '../inLogger';

const NoConnectionToast = () => {
    return (
        <div className="fixed inset-0 flex pt-5 items-center justify-center z-30">
            <div className="flex flex-col items-center w-full max-w-xs p-4 space-x-4 text-dark400 bg-light300 rounded-lg shadow " role="alert">
                <Player
                    src="https://assets9.lottiefiles.com/packages/lf20_q7cT0p.json"
                    background="transparent"
                    speed="1"
                    style={{ width: '300px', height: '300px' }}
                    loop
                    controls
                    autoplay
                />
                <div className="text-4xl font-normal text-center text-secondary300">We're working on something...</div>
                <div className="text-lg font-normal text-center">Connection failed, try again later.</div>
                <div className="text-5xl font-normal text-center text-primary100">Sorry!</div>
            </div>
        </div>

    )
}

export default inLogger(NoConnectionToast);