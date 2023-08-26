import inLogger from '../inLogger';

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 bg-dark400 w-full h-10 md:h-12 lg:h-14  shadow z-40">
            <div className="w-full h-full flex justify-between align-center items-center px-4">
                <ul className="flex flex-wrap items-center text-lg font-medium text-light100">
                    <li>
                        <a href="https://github.com/rucev" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-github pe-3 hover:text-light300"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/flors-rueda" target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-linkedin pe-1 hover:text-light300"></i>
                        </a>
                    </li>
                </ul>
                <b className="text-gray text-xs flex flex-row items-center gap-0.5" >
                    made with <i className="bi bi-balloon-heart text-xl self-bottom text-primary400"></i> by <span className="text-light100 text-sm self-start pt-0.5">Flors Rueda</span>
                </b>
            </div>
        </footer>
    );
};

export default inLogger(Footer);