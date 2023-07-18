import inLogger from '../inLogger';
import editIcons from '../assets/editIcons/index';
import { useState } from 'react';

const CreateRules = () => {
    const [isListOpen, setListOpen] = useState(false);

    const handleListClick = () => {
        setListOpen(!isListOpen);
    };


    return (
        <div className="fixed z-30">
            <button type="button" onClick={handleListClick} className="flex text-xl text-primary100 bg-light400 p-2 rounded-md shadow md:hidden">
                {isListOpen ?
                    <i className="text-2xl bi bi-clipboard2-x"></i>
                    : <i className="text-2xl bi bi-clipboard2-check"></i>

                }
                <span className="self-end">Rules</span>
            </button>
            <div className={`fixed w-full ${isListOpen ? '' : 'hidden'} mt-0.5 shadow h-full bg-light400 p-5 md:flex md:w-3/6 md:flex-col md:mt-0 lg:w-2/6 flex flex-col`}>
                <span className="hidden md:block pt-5 text-2xl font-bold text-primary100">Rules</span>
                <h5 className="text-lg font-semibold text-primary300">How should a level look like...</h5>
                <ul className="pt-2 md:w-11/12">
                    <li className="flex flex-row gap-1 pb-2 align-center">
                        <img src={editIcons['start']} className="w-8 h-8 md:w-10 md:h-10 self-center" alt={'start'} />
                        <div className="self-center">
                            <b className="text-md text-secondary400 self-center ">Starting point:</b>
                            <b className="text-xs md:text-sm text-dark500 pl-1 self-center">only one for floor.</b>
                        </div>
                    </li>
                    <li className="flex flex-row gap-1 pb-2 align-center">
                        <img src={editIcons['hole']} className="w-8 h-8 md:w-10 md:h-10 self-center" alt={'hole'} />
                        <div className="self-center">
                            <b className="text-md text-secondary400 self-center">Hole:</b>
                            <b className="text-xs md:text-sm text-dark500 pl-1 self-center">only one for floor, and never on the last one.</b>
                        </div>
                    </li>
                    <li className="flex flex-row gap-1 pb-2 align-center">
                        <img src={editIcons['stonks']} className="w-8 h-8 md:w-10 md:h-10  self-center" alt={'treasure'} />
                        <div className="self-center">
                            <b className="text-md text-secondary400 self-center">Treasure:</b>
                            <b className="text-xs md:text-sm text-dark500 pl-1 self-center">only on the last floor, marks the end of the level.</b>
                        </div>
                    </li>
                    <li className="flex flex-row gap-1 pb-2 align-center">
                        <img src={editIcons['life']} className="w-8 h-8 md:w-10 md:h-10  self-center" alt={'life'} />
                        <div className="self-center">
                            <b className="text-md text-secondary400 self-center">Life:</b>
                            <b className="text-xs md:text-sm text-dark500 pl-1 self-center">increases one hp heart.</b>
                        </div>
                    </li>
                    <li className="flex flex-row gap-1 pb-2 align-center">
                        <img src={editIcons['bomb']} className="w-8 h-8 md:w-10 md:h-10 self-center" alt={'bomb'} />
                        <div className="self-center">
                            <b className="text-md text-secondary400 self-center">Bomb:</b>
                            <b className="text-xs md:text-sm text-dark500 pl-1 self-center">takes away one hp heart.</b>
                        </div>
                    </li>
                    <li className="flex flex-row gap-1 pb-2 align-center">
                        <img src={editIcons['dirt']} className="w-8 h-8 md:w-10 md:h-10" alt={'dirt'} />
                        <div className="self-center">
                            <b className="text-md text-secondary400 self-center">Dirt:</b>
                            <b className="text-xs md:text-sm text-dark500 pl-1 self-center">makes passing through a little harder.</b>
                        </div>
                    </li>
                    <li className="flex align-center pt-1 pb-1">
                        <b className="text-xs md:text-lg text-primary100 text-center">Remember to give the level a name and configure the start hp!</b>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default inLogger(CreateRules);