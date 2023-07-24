import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg';
import isUserLoggedIn from '../logic/is-user-logged-in';
import logoutUser from '../logic/logout-user';
import useHandleErrors from '../hooks/useHandleErrors';
import retrieveLoggedUser from '../logic/retrieve-logged-user';
import avatars from '../assets/avatars';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const handleErrors = useHandleErrors();

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
        if (isUserLoggedIn()) getUserInfo()
    }, [location.pathname]);

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
        <>
            <div className="fixed w-full shadow z-40">
                <nav className="px-4 py-4 flex justify-between items-center bg-light500">
                    <Link className="text-3xl font-bold leading-none" to="/" onClick={handleCloseBoth}>
                        <img src={logo} className="h-10 w-10" alt="Logo" />
                    </Link>
                    <div className="flex items-center md:order-2">
                        {isUserLoggedIn() && <>
                            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-2 focus:ring-light100" onClick={handleUserMenuClick}>
                                <span className="sr-only">Open user menu</span>
                                <img className={`bg-${userInfo.color} w-8 h-8 rounded-full`} src={`${avatars[userInfo.avatar]}`} alt="avatar" />
                            </button>
                        </>

                        }
                        <div className="lg:hidden self-end">
                            <button
                                className="navbar-burger flex items-center text-dark100 px-3"
                                onClick={handleBurgerClick}
                            >
                                <i className="text-3xl font-bold bi bi-list"></i>
                            </button>
                        </div>
                    </div>
                    <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
                        {isUserLoggedIn() && <>
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
                                className="hidden lg:inline-block py-2 px-6 bg-primary500 hover:bg-primary400 text-sm text-light500 font-bold rounded-xl transition duration-200"
                                onClick={handleToRegister}
                            >
                                Sign up
                            </button>
                        </>

                    }
                </nav>
                <div className={`navbar-menu fixed z-50 ${(isMenuOpen ? '' : 'hidden')}`}>
                    <nav className="fixed top-0 left-0 bottom-0 flex bg-light500 flex-col w-full md:w-8/12 py-6 px-6 bg-light500 shadow overflow-y-auto">
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
                                            className="block px-4 w-full py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-light400 hover:bg-light300 text-dark400 rounded-xl"
                                            onClick={handleToLogin}
                                        >
                                            Login
                                        </button>
                                        <button
                                            className="block px-4 py-3 mb-2 leading-loose text-xs text-center font-semibold bg-primary500 hover:bg-primary400 text-light500 rounded-xl w-full"
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
            </div>
            <div className={`z-50 w-fit max-w-2/6 fixed right-16 mt-12 text-base list-none bg-light500 divide-y divide-light300 rounded-xl shadow ${(isUserMenuOpen ? '' : 'hidden')}`} >
                <a className={`px-4 py-5 flex flex-row gap-1 align-center text-sm text-${userInfo.color} cursor-pointer rounded-lg hover:bg-light400`}>
                    <i className="bi bi-person-fill"></i>
                    <span className="block text-sm">{userInfo.username}</span>
                </a>
                <ul className="pt-2 flex flex-col gap-5 justify-between" >
                    <li className="w-full text-sm text-dark300 rounded-lg hover:bg-light400 pl-2 px-3 hover:text-secondary500">
                        <Link to="/customize" onClick={handleCloseBoth} className="flex flex-row gap-2 align-center">
                            <i className="bi bi-palette"></i>
                            <span>Customize</span>
                        </Link>
                    </li>
                    <li className="w-full text-sm text-dark400 hover:text-secondary400 rounded-lg hover:bg-light400 pl-2 px-3">
                        <Link to="/" className="flex flex-row gap-2 align-center">
                            <i className="bi bi-gear-fill"></i>
                            <span>Account</span>
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
        </>
    );
};

export default Navbar;