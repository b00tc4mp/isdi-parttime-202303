import inLogger from '../inLogger';
import share from '../assets/share.svg'

const About = () => {

    return (
        <div className="flex flex-col w-full justify-center items-center pt-20 pb-20 gap-1 px-5 md:px-10">
            <div className="flex flex-col md:flex-row justify-center items-center pb-2 md:pb-5 gap-1">
                <h1 className="text-primary100 text-5xl md:text-5xl font-bold text-center">Ballopolis</h1>
                <h1 className="text-secondary300 text-4xl md:text-4xl font-bold text-center md:self-end md:pl-2">Maze Riders</h1>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-7" >
                <p className="text-secondary200 text-sm md:text-lg text-center">
                    Ballopolis is meant to be a <b className="font-bold">social game</b>, where you <b className="font-bold">create levels</b> that are fun and challenging to beat for other players. In doing so, you <b className="font-bold">earn achivements</b> to add to your profile and show off to your friends.
                </p>
                <img src={share} className="w-48 h-48 md:w-60 md:h-60" alt="share" />
            </div>
            <div>
                <h2 className="text-xl md:text-3xl text-primary200 font-bold text-center pt-5 md:pt-0">Creating Ballopolis</h2>
                <div className="flex flex-col md:flex-row-reverse justify-center items-center gap-3 pt-1">
                    <div className="flex flex-col gap-2 md:gap-5">
                        <p className="text-secondary200 text-sm md:text-lg text-center">
                            This is a web app build as the final project for the ISDI Coders' online <b className="font-semibold">web development fullstack bootcamp</b>.
                        </p>
                        <p className="text-secondary200 text-sm md:text-lg text-center">
                            At first the idea was to make a pretty simple game with CSS with the time limit being the main feature. But it evolved into using <b className="font-semibold">ThreeJS</b>, not having time limit but with multiple floors instead.
                        </p>
                        <p className="text-secondary200 text-sm md:text-lg text-center">
                            You can check the code of the project clicking <a href="https://github.com/rucev/isdi-parttime-202303/tree/feature/fullstack/staff/flors-rueda/fullstack/project" target="_blank" rel="noopener noreferrer" className="hover:text-primary600 text-primary200 font-bold">
                                here
                            </a>!
                        </p>
                    </div>
                    <img src="/concept.webp" className="w-64 h-64 md:w-80 md:h-80" alt="share" />
                </div>
            </div>
            <div>
                <h2 className="text-xl md:text-3xl text-primary200 font-bold text-center pt-5 md:pt-0">About the developer</h2>
                <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-3 pt-1">
                    <div className="flex flex-col gap-2 md:gap-5">
                        <p className="text-secondary200 text-sm md:text-lg text-center">
                            Hi! My name is Flors, and I live surrounded of psychologists and developers. I already studied one of those things and I'm learning to be the other. I love tea, surreal humour and videogames. I tried to put a little bit of those two last things in this project.
                        </p>
                        <p className="text-secondary200 text-sm md:text-lg text-center font-semibold">
                            The dog's name is Percy, and he's the goodest boy <i className="bi bi-hearts"></i>
                        </p>
                        <p className="text-secondary300 text-md md:text-lg text-center font-bold">
                            Dou you like Ballopolis?
                        </p>
                        <button className="bg-primary200 self-center md:w-fit max-w-xs w-3/4 px-5 py-2 hover:bg-primary600 text-sm lg:text-md text-light500 hover:text-light400 font-bold rounded-lg transition duration-200 hover:decoration-primary100"> <a href="https://www.paypal.com/donate/?hosted_button_id=T6RDWW8UWW5L4" target="_blank" rel="noopener noreferrer" >
                            Buy me a <span className="line-through decoration-2 font-thin">coffee</span> tea<i className="bi bi-cup-hot-fill pl-2"></i>
                        </a></button>
                    </div>
                    <img src="/me.webp" className="w-64 h-64 md:w-80 md:h-80" alt="share" />
                </div>
            </div>
            <div>
                <h2 className="text-xl md:text-3xl text-secondary600 font-bold text-center pt-5 md:pt-0 pb-5">Some of my other projects...</h2>
                <div className="flex flex-col lg:flex-row justify-center items-center gap-3 pt-1">
                    <div className="w-full lg:w-2/6 p-2 pt-5 h-md bg-light500 border border-light300 rounded-lg shadow flex flex-col text-center">
                        <h3 className="mb-2 text-sm md:text-lg font-bold tracking-tight text-primary200">Aquelarre Character Generator</h3>
                        <p className="text-secondary300 text-xs md:text-sm">
                            A completely randomize character generator for the role game Aquelarre.
                        </p>
                        <div className="flex flex-row justify-center align-center pt-2 gap-5">
                            <a href="https://aquelarrepersonaje.surge.sh/" target="_blank" rel="noopener noreferrer" className="hover:text-primary600 text-primary200 text-lg md:text-xl self-start">
                                <i className="bi bi-box-arrow-up-right"></i>
                            </a>
                            <a href="https://github.com/rucev/AquelarreCharacterGenerator" target="_blank" rel="noopener noreferrer" className="hover:text-primary600 text-primary200 text-lg md:text-xl self-end">
                                <i className="bi bi-github"></i>
                            </a>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/6 p-2 pt-5 h-md bg-light500 border border-light300 rounded-lg shadow flex flex-col text-center">
                        <h3 className="mb-2 text-sm md:text-lg font-bold tracking-tight text-primary200">Pokémon Types Game</h3>
                        <p className="text-secondary300 text-xs md:text-sm">
                            A "rock, paper, scissors" with pokémon that has evolved from Python to React somehow.
                        </p>
                        <div className="flex flex-row justify-center align-center pt-2 gap-5">
                            <a href="https://pokemon-types-game.netlify.app/" target="_blank" rel="noopener noreferrer" className="hover:text-primary600 text-primary200 text-lg md:text-xl self-start">
                                <i className="bi bi-box-arrow-up-right"></i>
                            </a>
                            <a href="https://github.com/rucev/PokemonTypesGame" target="_blank" rel="noopener noreferrer" className="hover:text-primary600 text-primary200 text-lg md:text-xl self-end">
                                <i className="bi bi-github"></i>
                            </a>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/6 p-2 pt-5 bg-light500 border border-light300 rounded-lg shadow flex flex-col text-center">
                        <h3 className="mb-2 text-sm md:text-lg font-bold tracking-tight text-primary200">Percy the Dog</h3>
                        <p className="text-secondary300 text-xs md:text-sm">
                            My first ever project with HTML/CSS, a page to introduce Percy to the world.
                        </p>
                        <div className="flex flex-row justify-center align-center pt-2 gap-5">
                            <a href="https://rucev.github.io/Percy-the-Dog/" target="_blank" rel="noopener noreferrer" className="hover:text-primary600 text-primary200 text-lg md:text-xl self-start">
                                <i className="bi bi-box-arrow-up-right"></i>
                            </a>
                            <a href="https://github.com/rucev/Percy-the-Dog" target="_blank" rel="noopener noreferrer" className="hover:text-primary600 text-primary200 text-lg md:text-xl self-end">
                                <i className="bi bi-github"></i>
                            </a>
                        </div>
                    </div>




                </div>
            </div>

        </div >);
};

export default inLogger(About);