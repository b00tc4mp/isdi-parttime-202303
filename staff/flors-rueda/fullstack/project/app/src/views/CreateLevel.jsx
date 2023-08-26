import { useEffect, useState } from 'react';
import { validateLevel } from '../helpers/levelValidators';
import { useLocation, useNavigate } from 'react-router-dom';
import inLogger from '../inLogger';
import CreateLevelToast from '../components/toasts/CreateLevelToast';
import LayoutForm from '../components/forms/LayoutForm';
import CreateRules from '../components/CreateRules';
import isUserLoggedIn from '../logic/is-user-logged-in';
import retrieveCC from '../logic/retrieve-cc';
import useHandleErrors from '../hooks/useHandleErrors';

const CreateLevel = () => {
    const location = useLocation();
    const { initialLevel, hpSelected, nameSelected, levelId } = location.state ? location.state : {}
    const [toast, setToast] = useState(null);
    const [isToastOn, setToastOn] = useState(false);
    const [level, setLevel] = useState(initialLevel ? initialLevel : [['life', 'stonks', 'hole', 'empty', 'bomb', 'empty', 'dirt', 'empty', 'start']]);
    const [initialHP, setInitialHP] = useState(hpSelected ? hpSelected : 3);
    const navigate = useNavigate();
    const [cost, setCost] = useState(82);
    const [budget, setBudget] = useState(0);
    const handleErrors = useHandleErrors();
    const prices = { bomb: 10, life: 15, hole: 2, dirt: 5 };

    const handleCloseToast = () => {
        setToastOn(false)
    };

    useEffect(() => {
        let newCost = levelId ? 100 : 50;
        for (const floor of level) {
            for (const cell of floor) {
                if (prices[cell]) newCost += prices[cell];
            }
        }
        setCost(newCost)

        if (isUserLoggedIn()) {
            handleErrors(async () => {
                const cc = await retrieveCC();
                setBudget(cc);
            })
        }
    }, []);

    const handleOnTryLevel = () => {
        const selectedName = document.getElementById('level-name').value;
        const hp = initialHP;
        if (isUserLoggedIn() && cost > budget) {
            setToast(`you can't afford to create this level!`);
            setToastOn(true);
            return;
        }
        if (validateLevel(level, selectedName, setToast, setToastOn)) {
            let bombCount = 0;
            let lifeCount = 0;
            let dirtCount = 0;
            for (const floor of level) {
                for (const cell of floor) {
                    if (cell === 'bomb') bombCount++;
                    else if (cell === 'life') lifeCount++;
                    else if (cell === 'dirt') dirtCount++;
                }
            }
            const data = { bombs: bombCount, life: lifeCount, cc: cost, floors: level.length, dirt: dirtCount };
            navigate('/game/try', { state: { createdLayout: level, hp: hp, levelName: selectedName, data: data, levelId: levelId } })
        }
    };

    return (
        <section>
            {isToastOn &&
                <CreateLevelToast handleCloseToast={handleCloseToast} message={toast} />
            }
            <div className="pt-12 md:pt-10">
                <CreateRules />
                {isUserLoggedIn() &&
                    <div className="fixed z-20 right-5 bottom-20 text-primary100 text-xs bg-light400 p-2 rounded-md shadow font-semibold pt-2">
                        <h4>Level cost <span className={`text-${cost > budget ? 'danger200' : 'success200'}`}>{cost}cc</span></h4>
                    </div>
                }
                <div className="p-4 w-full lg:w-5/6 lg:ml-6 md:flex md:justify-end md:pr-8 z-0">
                    <div className="flex items-center flex-col gap-2 pt-16 md:pt-4 pb-5">
                        <div className="flex items-center py-2">
                            <div className="w-1/3">
                                <h2 className="block text-secondary300 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                    Level name
                                </h2>
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
                        <LayoutForm level={level} setLevel={setLevel} setToast={setToast} setToastOn={setToastOn} cost={cost} setCost={setCost} prices={prices} />
                        <div className="pt-5 pb-20">
                            <button className="bg-transparent hover:bg-primary200 text-primary100 font-semibold hover:text-light400 py-2 px-4 border border-primary200 hover:border-transparent rounded" onClick={handleOnTryLevel}>Test level</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default inLogger(CreateLevel);
