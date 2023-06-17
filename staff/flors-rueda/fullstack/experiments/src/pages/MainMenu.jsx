import MenuButton from '../components/MenuButton';
import ExperimentsSvg from '/assets/experiments.svg';

const MainMenu = ({ onDemo1, onDemo2, onDemo3, onDemo4, onDemo5, onDemo6 }) => {

    return (
        <main className="flex flex-col h-full w-full gap-6 mt-10">
            <div className="flex flex-wrap justify-center items-center mt-auto gap-1">
                <img src={ExperimentsSvg} className="h-8 w-8 self-center" />
                <h1 className="text-4xl self-center">EXPERIMENTS</h1>
            </div>

            <div className="container flex flex-wrap sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 justify-center items-center self-center justify-center items-center mb-auto gap-3">
                <MenuButton buttonText={'drag and drop V1 demo'} onButtonClick={onDemo1} />
                <MenuButton buttonText={'whole page parallax demo'} onButtonClick={onDemo2} />
                <MenuButton buttonText={'drag and drop V2 demo'} onButtonClick={onDemo3} />
                <MenuButton buttonText={'grid game V1 demo'} onButtonClick={onDemo4} />
                <MenuButton buttonText={'threeJS cube demo 1'} onButtonClick={onDemo5} />
                <MenuButton buttonText={'threeJS ball demo 1'} onButtonClick={onDemo6} />
            </div>
        </main>
    )
}

export default MainMenu