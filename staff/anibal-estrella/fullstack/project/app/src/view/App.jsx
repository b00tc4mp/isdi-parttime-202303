import React, { useState, useEffect } from 'react'
import { SearchArtist, SearchPlace } from './components'
import { Home } from './pages'
import { PencilIcon, BookmarkIcon, HeartIcon } from '@heroicons/react/24/solid'
import retrieveUserGeolocation from '../logic/retrieveUserGeolocation'

function App() {
    const [selectedNavItem, setSelectedNavItem] = useState('artist');

    const handleNavItemClick = (navItem) => {
        setSelectedNavItem(navItem);
    };

    const [city, setCity] = useState('');

    useEffect(() => {
        async function fetchGeolocation() {
            const userCity = await retrieveUserGeolocation();
            setCity(userCity);
        }
        fetchGeolocation();
    }, []);

    return (
        <div>
            <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-gray-100 py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4 rounded-full"  >
                <div className="flex w-full flex-wrap items-center justify-between px-3">
                    {/* <!-- Hamburger button for mobile view --> */}
                    <button
                        className="block border-0 bg-transparent px-2 text-gray-400 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-gray-200 lg:hidden">

                        {/* <!-- Hamburger icon --> */}
                        <span className="[&>svg]:w-7">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-7 w-7">
                                <path
                                    fillRule="evenodd"
                                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                    clipRule="evenodd" />
                            </svg>
                        </span>
                    </button>

                    {/* <!-- Collapsible navigation container --> */}
                    <div
                        className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
                        id="navbarSupportedContent1"
                        data-te-collapse-item>
                        {/* <!-- Logo --> */}
                        <a
                            className="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-gray-200 dark:hover:text-gray-400/40 dark:focus:text-gray-400/40 lg:mb-0 lg:mt-0"
                            href="#">
                            <img src="" alt="" />
                        </a>
                        {/* <!-- Left navigation links --> */}
                        <h1 className="flex items-center text-gray-500 mr-4 font-extrabold">LiveDive</h1>
                        <ul className="list-style-none mr-auto flex flex-col pl-0 lg:flex-row">
                            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                                <a className="text-gray-400 transition duration-200 hover:text-red hover:ease-in-out focus:text-red disabled:text-gray-500/30 motion-reduce:transition-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400 lg:px-2 [&.active]:text-gray-500/90 dark:[&.active]:text-zinc-400" href="#" onClick={() => handleNavItemClick('artist')}>
                                    search artist
                                </a>
                            </li>
                            <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                                <a href="#" onClick={() => handleNavItemClick('place')} className=" text-gray-400 transition duration-200 hover:text-gray-400/40 hover:ease-in-out focus:text-red disabled:text-gray-400/30 motion-reduce:transition-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400 lg:px-2 [&.active]:text-gray-500/90 dark:[&.active]:text-gray-400/40 text-">
                                    search place
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* <!-- Right elements --> */}
                    <div className="flex items-center flex-row">
                        <a className="mr-4 text-gray-400 transition duration-200 hover:text-red hover:ease-in-out focus:text-red disabled:text-gray-500/30 motion-reduce:transition-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400 [&.active]:text-gray-500/90 dark:[&.active]:text-gray-400/40"
                            href="#">
                            <span className="[&>svg]:w-5">
                                <HeartIcon />
                            </span>
                        </a>
                        <a className="hidden-arrow mr-4 flex items-center text-gray-400 transition duration-200 hover:text-red hover:ease-in-out focus:text-red disabled:text-gray-500/30 motion-reduce:transition-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400 [&.active]:text-gray-500/90 dark:[&.active]:text-gray-400/40" href="#" role="button">
                            <span className="w-5"><HeartIcon /></span>
                        </a>
                        <div div='user-avatar' className="relative">
                            <a className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none" href="#" role="button">
                                {/* <!-- User avatar --> */}
                                <img className="h-10 w-10 rounded-full" src="https://picsum.photos/1500?random=1" alt="" />
                            </a>
                        </ div>
                    </div>
                </div>
            </nav>
            <div>
                <h2>Your City: {city}</h2>
            </div>
            <h1>Search {selectedNavItem === 'artist' ? 'artist' : 'place'}</h1>
            {selectedNavItem === 'artist' ? <SearchArtist /> : <SearchPlace />}
            <Home />
        </div >
    );
}

export default App;
