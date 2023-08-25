import { assets } from 'com';
import avatarStory from '../../assets/avatars/avatarStory'
import avatars from '../../assets/avatars';
import inLogger from '../../inLogger';

const RandomRider = () => {
    const riders = assets.avatars
    const rider = riders[Math.floor(Math.random() * riders.length)];

    return (
        <div className="flex flex-col w-full justify-center align-center bg-light400 py-7">
            <h2 className="text-dark100 text-center font-bold text-4xl pb-2">12 different riders available!</h2>
            <h3 className="text-dark500 text-center text-2xl pb-2">meet<span className="text-primary100 font-bold text-3xl pl-2">{avatarStory[rider][0]}</span></h3>
            <div className="flex flex-col-reverse gap-1 md:gap-5 w-full md:flex-row justify-center items-center px-5">
                <h4 className="text-dark100 pl-2 text-center text-sm md:text-xl font-bold pb-5">{avatarStory[rider][1]}</h4>
                <img src={avatars[rider]} alt="rider" className="w-70 h-52 self-center md:pb-5" />

            </div>
        </div>
    )
}

export default inLogger(RandomRider);


