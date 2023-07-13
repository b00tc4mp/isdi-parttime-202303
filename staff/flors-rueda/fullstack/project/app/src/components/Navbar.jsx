import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const handleBurgerClick = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleCloseClick = () => {
        setMenuOpen(false);
    };

    return (
        <div className="fixed w-full shadow z-50">
            <nav className="px-4 py-4 flex justify-between items-center bg-light500">
                <Link className="text-3xl font-bold leading-none" to="/">
                    <img src={logo} className="h-10 w-10" alt="Logo" />
                </Link>
                <div className="lg:hidden">
                    <button
                        className="navbar-burger flex items-center text-dark100 px-3"
                        onClick={handleBurgerClick}
                    >
                        <i className="text-3xl font-bold bi bi-list"></i>
                    </button>
                </div>
                <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
                    <li>
                        <a className="text-sm text-light100" href="#">
                            <i className="bi bi-info-square-fill pe-1"></i>
                            About
                        </a>
                    </li>
                    <li>
                        <Link
                            className={
                                "text-sm " +
                                (location.pathname === "/levels"
                                    ? "text-secondary400"
                                    : "dark400 hover:text-secondary400")
                            }
                            to="/levels"
                        >
                            <i className="bi bi-collection-play-fill pe-1"></i>
                            Levels
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={
                                "text-sm " +
                                (location.pathname === "/create"
                                    ? "text-secondary400"
                                    : "dark400 hover:text-secondary400")
                            }
                            to="/create"
                        >
                            <i className="bi bi-grid-3x3-gap-fill pe-1"></i>
                            Create Level
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={
                                "text-sm " +
                                (location.pathname === "/tutorial"
                                    ? "text-secondary400"
                                    : "dark400 hover:text-secondary400")
                            }
                            to="/tutorial"
                        >
                            <i className="bi bi-mortarboard-fill pe-1"></i>
                            Tutorial
                        </Link>
                    </li>
                </ul>
                <a
                    className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-light400 hover:bg-light300 text-sm text-dark400 font-bold  rounded-xl transition duration-200"
                    href="#"
                >
                    Log in
                </a>
                <a
                    className="hidden lg:inline-block py-2 px-6 bg-primary500 hover:bg-primary400 text-sm text-light500 font-bold rounded-xl transition duration-200"
                    href="#"
                >
                    Sign up
                </a>
            </nav>
            <div className={`navbar-menu fixed z-50 ${(isMenuOpen ? '' : 'hidden')}`}>
                <nav className="fixed top-0 left-0 bottom-0 flex bg-light500 flex-col w-full md:w-8/12 py-6 px-6 bg-light500 border-r overflow-y-auto">
                    <div className="flex justify-between mb-8 opacity-75">
                        <Link className="text-3xl font-bold leading-none" to="/">
                            <img src={logo} className="h-10 w-10" alt="Logo" />
                        </Link>
                        <button className="navbar-close text-dark100 text-2xl" onClick={handleCloseClick}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <div>
                        <ul>
                            <li className="mb-1">
                                <a className="block p-4 text-sm font-semibold text-light100 rounded" href="#">
                                    <i className="bi bi-info-square-fill pe-1"></i>
                                    About
                                </a>
                            </li>
                            <li className="mb-1">
                                <Link
                                    className={
                                        "block p-4 text-sm font-semibold " +
                                        (location.pathname === "/levels"
                                            ? "text-secondary400"
                                            : "dark400 hover:text-secondary400 hover:bg-light400") +
                                        " rounded"
                                    }
                                    to="/levels"
                                >
                                    <i className="bi bi-collection-play-fill pe-1"></i>
                                    Levels
                                </Link>
                            </li>
                            <li className="mb-1">
                                <Link
                                    className={
                                        "block p-4 text-sm font-semibold " +
                                        (location.pathname === "/create"
                                            ? "text-secondary400"
                                            : "dark400 hover:text-secondary400 hover:bg-light400") +
                                        " rounded"
                                    }
                                    to="/create"
                                >
                                    <i className="bi bi-grid-3x3-gap-fill pe-1"></i>
                                    Create Level
                                </Link>
                            </li>
                            <li className="mb-1">
                                <Link
                                    className={
                                        "block p-4 text-sm font-semibold " +
                                        (location.pathname === "/tutorial"
                                            ? "text-secondary400"
                                            : "dark400 hover:text-secondary400 hover:bg-light400") +
                                        " rounded"
                                    }
                                    to="/tutorial"
                                >
                                    <i className="bi bi-mortarboard-fill pe-1"></i>
                                    Tutorial
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-auto">
                        <div className="pt-6">
                            <a
                                className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none  bg-light400 hover:bg-light300 text-dark400 rounded-xl"
                                href=""
                            >
                                Log in
                            </a>
                            <a
                                className="block px-4 py-3 mb-2 leading-loose text-xs text-center font-semibold bg-primary500 hover:bg-primary400 text-light500 rounded-xl"
                                href=""
                            >
                                Sign up
                            </a>
                        </div>
                        <a href="https://github.com/rucev" target="_blank" rel="noopener noreferrer" className="my-4 text-xs flex align-center justify-center text-center text-light100 hover:underline cursor-pointer">
                            <span>
                                <i className="bi bi-github pe-1"></i>
                                @rucev
                            </span>
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;