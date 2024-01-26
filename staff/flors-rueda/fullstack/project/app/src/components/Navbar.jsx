import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg';
import isUserLoggedIn from '../logic/is-user-logged-in';
import logoutUser from '../logic/logout-user';
import useHandleErrors from '../hooks/useHandleErrors';
import retrieveLoggedUser from '../logic/retrieve-logged-user';
import avatars from '../assets/avatars';

const Navbar = ({ updateUserInfo }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const handleErrors = useHandleErrors();
    const navbarRef = useRef(null);

    const handleBurgerClick = () => {
        setMenuOpen(!isMenuOpen);
        handleCloseUserMenuClick();
    };

    const handleCloseBurgerMenuClick = () => {
        setMenuOpen(false);
    };

    const handleUserMenuClick = () => {
        handleCloseBurgerMenuClick();
        setUserMenuOpen(!isUserMenuOpen);
    };

    const handleCloseUserMenuClick = () => {
        setUserMenuOpen(false);
    };

    const handleCloseBoth = () => {
        handleCloseBurgerMenuClick();
        handleCloseUserMenuClick();
    }

    const getUserInfo = () => {
        handleErrors(async () => {
            const user = await retrieveLoggedUser();
            setUserInfo(user);
        })
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                handleCloseBoth();
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isUserLoggedIn()) getUserInfo()
    }, [location.pathname, updateUserInfo]);

    const handleToLogin = () => {
        navigate('/signin', { state: { startingForm: 'login' } });
        handleCloseBurgerMenuClick();
    }

    const handleToRegister = () => {
        navigate('/signin', { state: { startingForm: 'register' } });
        handleCloseBurgerMenuClick();
    }

    const handleLogout = () => {
        logoutUser();
        navigate('/signin', { state: { startingForm: 'login' } });
        handleCloseUserMenuClick();
    }

    return (
        <div ref={navbarRef} className="z-50">
            <div className="fixed w-full shadow z-50">
                <nav className="px-1 py-4 flex justify-between items-center bg-light500">
                    <div className="flex row align-center pl-3">
                        <Link className="text-3xl font-bold leading-none hidden lg:block" to="/" onClick={handleCloseBoth}>
                            <img src={logo} className="h-10 w-10" alt="Logo" />
                        </Link>
                        <div className="lg:hidden">
                            <button
                                className="navbar-burger flex items-center text-dark100"
                                onClick={handleBurgerClick}
                            >
                                <i className="text-3xl font-bold bi bi-list"></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        {isUserLoggedIn() && <>
                            <div type="button" className="flex pr-4 text-sm bg-gray-800 rounded-full min-w-fit md:mr-0 focus:ring-2 focus:ring-light100" onClick={handleUserMenuClick}>
                                <span className="sr-only">Open user menu</span>
                                <div className="flex flex-row cursor-pointer">
                                    <i className={`bi bi-chevron-compact-${(isUserMenuOpen ? 'up' : 'down')} self-end`}></i>
                                    <img className={`bg-${userInfo.color} w-8 h-8 rounded-full`} src={`${avatars[userInfo.avatar]}`} alt="avatar" />
                                </div>
                                <div className={`z-50 w-fit max-w-2/6 fixed right-10 mt-8 text-base list-none bg-light500 divide-y divide-light300 rounded-xl shadow ${(isUserMenuOpen ? '' : 'hidden')}`} >
                                    <div className="px-4 py-5 flex flex-row gap-1 align-center text-sm text-dark300 rounded-lg justify-center">
                                        <i className="text-xl text-primary400 bi bi-piggy-bank"></i>
                                        <span className="block text-sm self-center">{userInfo.cc}cc</span>
                                    </div>
                                    <ul className="pt-2 flex flex-col gap-5 justify-between" >
                                        <li className="w-full text-sm text-dark300 rounded-lg hover:bg-light400 pl-2 px-3 hover:text-secondary500">
                                            <Link to="/profile/you" onClick={handleCloseBoth} className="flex flex-row gap-2 align-center">
                                                <i className="bi bi-person-fill"></i>
                                                <span>{userInfo.username}</span>
                                            </Link>
                                        </li>
                                        <li className="w-full text-sm text-dark300 rounded-lg hover:bg-light400 pl-2 px-3 hover:text-secondary500">
                                            <Link to="/customize" onClick={handleCloseBoth} className="flex flex-row gap-2 align-center">
                                                <i className="bi bi-palette"></i>
                                                <span>Customize</span>
                                            </Link>
                                        </li>
                                        <li className="w-full text-sm text-dark400 hover:text-secondary400 rounded-lg hover:bg-light400 pl-2 px-3">
                                            <Link to="/settings" className="flex flex-row gap-2 align-center">
                                                <i className="bi bi-gear-fill"></i>
                                                <span>Settings</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                className="w-full py-2 px-6 bg-dark100 hover:bg-dark500 text-sm text-light400 font-bold rounded-xl transition duration-200"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                        }

                    </div>
                    <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
                        {isUserLoggedIn() && <>
                            <li>
                                <Link
                                    className={
                                        "text-sm " +
                                        (location.pathname === "/home"
                                            ? "text-secondary400"
                                            : "dark400 hover:text-secondary400")
                                    }
                                    to="/home"
                                    onClick={handleCloseBoth}
                                >
                                    <i className="bi bi-house-fill pe-1"></i>
                                    Home
                                </Link>
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
                                    onClick={handleCloseBoth}
                                >
                                    <i className="bi bi-collection-play-fill pe-1"></i>
                                    Levels
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={
                                        "text-sm " +
                                        (location.pathname === "/search"
                                            ? "text-secondary400"
                                            : "dark400 hover:text-secondary400")
                                    }
                                    to="/search"
                                    onClick={handleCloseBoth}
                                >
                                    <i className="bi bi-search pe-1"></i>
                                    Search
                                </Link>
                            </li>
                        </>}
                        <li>
                            <Link
                                className={
                                    "text-sm " +
                                    (location.pathname === "/create"
                                        ? "text-secondary400"
                                        : "dark400 hover:text-secondary400")
                                }
                                to="/create"
                                onClick={handleCloseBoth}
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
                                onClick={handleCloseBoth}
                            >
                                <i className="bi bi-mortarboard-fill pe-1"></i>
                                Tutorial
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={
                                    "text-sm " +
                                    (location.pathname === "/about"
                                        ? "text-secondary400"
                                        : "dark400 hover:text-secondary400")
                                }
                                to="/about"
                                onClick={handleCloseBoth}
                            >
                                <i className="bi bi-info-square-fill pe-1"></i>
                                About
                            </Link>
                        </li>
                    </ul>
                    {!isUserLoggedIn() &&
                        <>
                            <button
                                className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-light400 hover:bg-light300 text-sm text-dark400 font-bold  rounded-xl transition duration-200"
                                onClick={handleToLogin}
                            >
                                Login
                            </button>
                            <button
                                className="hidden lg:inline-block py-2 px-6 bg-primary200 hover:bg-primary400 text-sm text-light500 font-bold rounded-xl transition duration-200"
                                onClick={handleToRegister}
                            >
                                Sign up
                            </button>
                        </>

                    }
                </nav>
                <div className={`navbar-menu fixed z-50 ${(isMenuOpen ? '' : 'hidden')}`}>
                    <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-full md:w-8/12 py-6 px-6 bg-light500 shadow overflow-y-auto">
                        <div className="flex justify-between mb-8 opacity-75">
                            <Link className="text-3xl font-bold leading-none" to="/" onClick={handleCloseBoth}>
                                <img src={logo} className="h-10 w-10" alt="Logo" />
                            </Link>
                            <button className="navbar-close text-dark100 text-2xl" onClick={handleCloseBurgerMenuClick}>
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        <div>
                            <ul>
                                {isUserLoggedIn() && <>
                                    <li className="mb-1">
                                        <Link
                                            className={
                                                "block p-4 text-sm font-semibold " +
                                                (location.pathname === "/home"
                                                    ? "text-secondary400"
                                                    : "dark400 hover:text-secondary400 hover:bg-light400") +
                                                " rounded"
                                            }
                                            to="/home"
                                            onClick={handleCloseBoth}
                                        >
                                            <i className="bi bi-house-fill pe-1"></i>
                                            Home
                                        </Link>
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
                                            onClick={handleCloseBoth}
                                        >
                                            <i className="bi bi-collection-play-fill pe-1"></i>
                                            Levels
                                        </Link>
                                    </li>
                                    <li className="mb-1">
                                        <Link
                                            className={
                                                "block p-4 text-sm font-semibold " +
                                                (location.pathname === "/search"
                                                    ? "text-secondary400"
                                                    : "dark400 hover:text-secondary400 hover:bg-light400") +
                                                " rounded"
                                            }
                                            to="/search"
                                            onClick={handleCloseBoth}
                                        >
                                            <i className="bi bi-search pe-1"></i>
                                            Search
                                        </Link>
                                    </li>
                                </>}
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
                                        onClick={handleCloseBoth}
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
                                        onClick={handleCloseBoth}
                                    >
                                        <i className="bi bi-mortarboard-fill pe-1"></i>
                                        Tutorial
                                    </Link>
                                </li>
                                <li className="mb-1">
                                    <Link
                                        className={
                                            "block p-4 text-sm font-semibold " +
                                            (location.pathname === "/about"
                                                ? "text-secondary400"
                                                : "dark400 hover:text-secondary400 hover:bg-light400") +
                                            " rounded"
                                        }
                                        to="/about"
                                        onClick={handleCloseBoth}
                                    >
                                        <i className="bi bi-info-square-fill pe-1"></i>
                                        About
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-auto">
                            <div className="pt-6">
                                {!isUserLoggedIn() &&
                                    <>
                                        <button
                                            className="block px-4 w-full py-3 mb-3 leading-loose text-xs text-center font-semibold bg-light400 hover:bg-light300 text-dark400 rounded-xl"
                                            onClick={handleToLogin}
                                        >
                                            Login
                                        </button>
                                        <button
                                            className="block px-4 py-3 mb-2 leading-loose text-xs text-center font-semibold bg-primary200 hover:bg-primary400 text-light500 rounded-xl w-full"
                                            onClick={handleToRegister}
                                        >
                                            Sign up
                                        </button>
                                    </>}

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
            </div >
        </div >
    );
};

export default Navbar;