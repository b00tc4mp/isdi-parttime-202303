import play from '/views/play.webp';
import create from '/views/create.webp';
import explore from '/views/explore.webp';
import { useEffect, useState } from 'react';
import inLogger from '../../inLogger';

const Previews = () => {
    const [index, setIndex] = useState(0);
    const previews = [
        { src: play, name: 'PLAY' },
        { src: create, name: 'CREATE' },
        { src: explore, name: 'EXPLORE' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = index < previews.length - 1 ? (index + 1) : 0;
            setIndex(nextIndex);
        }, 2500);
        return () => {
            clearInterval(interval);
        };
    }, [index, previews.length]);

    return (
        <div className="flex flex-row h-4/5 mt-3">
            <div className="flex flex-col items-center justify-center">
                <div className="md:hidden absolute z-30 w-full text-center text-light500 text-3xl font-bold bg-darkShadow py-2">
                    {previews[index].name}
                </div>
                <div className="relative mx-auto border-dark200 bg-dark200 border-[14px] rounded-xl h-[600px] w-[300px] shadow-xl mt-8">
                    <div className="w-[148px] h-[18px] bg-dark200 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                    <div className="h-[32px] w-[3px] bg-dark200 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                    <div className="h-[46px] w-[3px] bg-dark200 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                    <div className="h-[46px] w-[3px] bg-dark200 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                    <div className="h-[64px] w-[3px] bg-dark200 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                    <div className="overflow-hidden w-[272px] h-[572px] bg-light300">
                        <img src={previews[index].src} className="w-[272px] h-[572px]" alt="" />
                    </div>
                </div>
            </div>
            <div className="hidden md:flex flex-col self-center text-secondary200 pl-10 text-5xl gap-5 font-bold">
                <p className={index === 0 ? 'underline text-primary100' : ''}>PLAY</p>
                <p className={index === 1 ? 'underline text-primary100' : ''}>CREATE</p>
                <p className={index === 2 ? 'underline text-primary100' : ''}>EXPLORE</p>
            </div>

        </div>

    )
}

export default inLogger(Previews);