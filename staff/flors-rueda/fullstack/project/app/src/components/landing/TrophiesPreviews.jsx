import inLogger from '../../inLogger';
import ranks from '../../assets/trophies/ranks';
import codes from '../../assets/trophies/codes';

const TrophiesPreview = () => {

    return (
        <div className="flex flex-col w-full justify-center align-center bg-dark400 mt-10 py-10">
            <h2 className="text-primary300 italic text-center font-bold text-4xl pb-5">EARN TROPHIES</h2>
            <div className="flex flex-col gap-1 md:gap-5 w-full md:flex-row justify-center items-center">
                <div className="flex h-68 flex-row gap-1">
                    <div className="relative">
                        <img src={ranks['silver']} alt="rank" className="absolute inset-0 w-full h-full opacity-100" />
                        <img src={codes['T01']} alt="trophie" className="relative z-10 rounded-full h-52 p-2" />
                    </div>
                </div>
                <div className="flex h-68 flex-row gap-1">
                    <div className="relative">
                        <img src={ranks['gold']} alt="rank" className="absolute inset-0 w-full h-full opacity-100" />
                        <img src={codes['G05']} alt="trophie" className="relative z-10 rounded-full h-52 p-2" />
                    </div>
                </div>
                <div className="flex h-68 flex-row gap-1 opacity-100">
                    <div className="relative">
                        <img src={ranks['bronze']} alt="rank" className="absolute inset-0 w-full h-full opacity-100" />
                        <img src={codes['G01']} alt="trophie" className="relative z-10 rounded-full h-52 p-2" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default inLogger(TrophiesPreview);


