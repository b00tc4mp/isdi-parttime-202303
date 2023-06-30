const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 bg-dark400 w-full h-14 shadow z-40">
            <div className="w-full h-full flex justify-between align-center items-center px-4">
                <ul className="flex flex-wrap items-center text-lg font-medium text-light100">
                    <li>
                        <a href="#">
                            <i className="bi bi-github pe-3"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="bi bi-linkedin pe-1"></i>
                        </a>
                    </li>
                </ul>
                <a href="#" className="text-light100 text-sm font-medium">
                    © 2023 <span className="hover:underline">Flors Rueda</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
