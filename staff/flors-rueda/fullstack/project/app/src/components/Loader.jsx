import loader from '../assets/animations/loader.json';
import inLogger from '../inLogger';
import { Player } from '@lottiefiles/react-lottie-player';

const Loader = () => {
    return <Player
        autoplay
        loop={true}
        src={loader}
        background="transparent"
        className={`w-full bottom-0 fixed inset-0 z-40`}
    />
}

export default inLogger(Loader)