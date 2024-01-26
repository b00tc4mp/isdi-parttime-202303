import { Player } from '@lottiefiles/react-lottie-player';
import inLogger from '../../inLogger';
import tool from '../../assets/animations/tool.json';

const NoConnectionToast = () => {
    return (
        <div className="fixed inset-0 flex w-full h-full pt-10 items-center justify-center z-30">
            <div className="flex flex-col items-center w-full max-w-xs p-4 space-x-4 text-dark400 bg-light300 rounded-lg shadow " role="alert">
                <Player
                    src={tool}
                    background="transparent"
                    loop
                    controls
                    autoplay
                />
                <h3 className="text-4xl font-normal text-center text-secondary300">We're working on something...</h3>
                <h4 className="text-lg font-normal text-center">Connection failed, try again later.</h4>
                <h5 className="text-5xl font-normal text-center text-primary100">Sorry!</h5>
            </div>
        </div>

    )
}

export default inLogger(NoConnectionToast);