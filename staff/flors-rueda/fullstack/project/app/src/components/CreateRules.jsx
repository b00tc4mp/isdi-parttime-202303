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
            <div className={`fixed w-full ${isListOpen ? '' : 'hidden'} mt-0.5 shadow h-full bg-light400 p-5 md:flex md:w-3/6 md:flex-col md:mt-0 lg:w-2/6`}>
                <span className="hidden md:block pt-5 text-2xl font-bold text-primary100">Rules</span>
                <h5 className="text-lg font-semibold text-primary300">How should a level look like...</h5>
                <ul className="pt-2">
                    <li className="flex flex-col gap-1 pb-1">
                        <div className="flex gap-2">
                            <img src={editIcons['start']} className="w-6 h-6 md:w-8 md:h-8" alt={'start'} />
                            <b className="text-md text-secondary400 self-center">Starting point:</b>
                        </div>
                        <b className="text-xs md:text-sm text-dark500">only one for floor.</b>
                    </li>
                    <li className="flex flex-col gap-1 pb-1">
                        <div className="flex gap-2">
                            <img src={editIcons['hole']} className="w-6 h-6 md:w-8 md:h-8" alt={'hole'} />
                            <b className="text-md text-secondary400 self-center">Hole:</b>
                        </div>
                        <b className="text-xs md:text-sm text-dark500">only one for floor, and never on the last one.</b>
                    </li>
                    <li className="flex flex-col gap-1 pb-1">
                        <div className="flex gap-2">
                            <img src={editIcons['stonks']} className="w-6 h-6 md:w-8 md:h-8" alt={'stonks'} />
                            <b className="text-md text-secondary400 self-center">Treasure:</b>
                        </div>
                        <b className="text-xs md:text-sm text-dark500">only on the last floor, marks the end of the level.</b>
                    </li>
                    <li className="flex flex-col gap-1 pb-1">
                        <div className="flex gap-2">
                            <img src={editIcons['life']} className="w-6 h-6 md:w-8 md:h-8" alt={'life'} />
                            <b className="text-md text-secondary400 self-center">Life:</b>
                        </div>
                        <b className="text-xs md:text-sm text-dark500">increases one hp heart.</b>
                    </li>
                    <li className="flex flex-col gap-1 pb-1">
                        <div className="flex gap-2">
                            <img src={editIcons['bomb']} className="w-6 h-6 md:w-8 md:h-8" alt={'bomb'} />
                            <b className="text-md text-secondary400 self-center">Bomb:</b>
                        </div>
                        <b className="text-xs md:text-sm text-dark500">takes away one hp heart.</b>
                    </li>
                    <li className="flex flex-col gap-1 pb-1">
                        <div className="flex gap-2">
                            <img src={editIcons['dirt']} className="w-6 h-6 md:w-8 md:h-8" alt={'dirt'} />
                            <b className="text-md text-secondary400 self-center">Dirt:</b>
                        </div>
                        <b className="text-xs md:text-sm text-dark500">makes passing through a little harder.</b>
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