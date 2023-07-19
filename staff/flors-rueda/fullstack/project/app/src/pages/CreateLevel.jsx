import { useState } from 'react';
import { validateLevel } from '../helpers/levelValidators';
import { useLocation, useNavigate } from 'react-router-dom';
import inLogger from '../inLogger';
import CreateLevelToast from '../components/toasts/CreateLevelToast';
import LayoutForm from '../components/LayoutForm';
import CreateRules from '../components/CreateRules';

const CreateLevel = () => {
    const location = useLocation();
    const { initialLevel, hpSelected, nameSelected } = location.state ? location.state : {}
    const [toast, setToast] = useState(null);
    const [isToastOn, setToastOn] = useState(false);
    const [level, setLevel] = useState(initialLevel ? initialLevel : [['life', 'stonks', 'hole', 'empty', 'bomb', 'empty', 'dirt', 'empty', 'start']]);
    const [initialHP, setInitialHP] = useState(hpSelected ? hpSelected : 3);
    const navigate = useNavigate();

    const handleCloseToast = () => setToastOn(false);

    const handleOnTryLevel = () => {
        const selectedName = document.getElementById('level-name').value;
        const hp = initialHP;
        if (validateLevel(level, selectedName, setToast, setToastOn)) {
            navigate('/game/try', { state: { createdLayout: level, hp: hp, levelName: selectedName } })
        }
    };

    return (
        <section>
            {isToastOn &&
                <CreateLevelToast handleCloseToast={handleCloseToast} message={toast} />
            }
            <div className="pt-16 md:pt-10">
                <CreateRules />
                <div className="p-4 w-full lg:w-5/6 lg:ml-6 md:flex md:justify-end md:pr-8 z-0">
                    <div className="flex items-center flex-col gap-2 pt-16 md:pt-4 pb-5">
                        <div className="flex items-center py-2">
                            <div className="w-1/3">
                                <span className="block text-secondary300 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Level name
                                </span>
                            </div>
                            <div className="md:w-2/3">
                                <input className="bg-light300 appearance-none border-2 border-light100 rounded w-full py-2 px-4 text-secondary400 leading-tight focus:outline-none focus:bg-light400 focus:border-secondary400" id="level-name" type="text" defaultValue={nameSelected ? nameSelected : undefined} />
                            </div>
                        </div>
                        <div className="flex items-center py-1 gap-5">
                            <span className="text-secondary500 font-bold md:text-right mb-1 md:mb-0">HP</span>
                            {[...Array(7)].map((hp, index) => {
                                index += 1;
                                return (
                                    <div key={`hp_${index}`}>
                                        <button
                                            type="button"
                                            className="text-primary400 text-xl"
                                            onClick={() => setInitialHP(index < 1 ? 1 : index)}
                                        >
                                            <i className={`bi ${index <= initialHP ? 'bi-heart-fill hover:text-primary600' : 'bi-heart hover:text-secondary500'}`}></i>
                                        </button>
                                    </div>


                                );
                            })}
                        </div>
                        <LayoutForm level={level} setLevel={setLevel} setToast={setToast} setToastOn={setToastOn} />
                        <div className="pt-5 pb-20">
                            <button className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded" onClick={handleOnTryLevel}>test level</button>
                        </div>
                    </div>
                </div>
            </div>


        </section>
    );
};

export default inLogger(CreateLevel);
