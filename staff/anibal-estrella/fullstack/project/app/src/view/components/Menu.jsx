import React, { useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/solid'

function Menu({ handleNavItemClick, onBurguerMenuClick }) {

    return (
        <nav className="flex-no-wrap sticky top-0 z-10 relative flex w-full items-center justify-between pt-2"  >
            <div className=" flex w-full flex-wrap items-center justify-between px-3  dark:bg-neutral-600 dark:shadow-black/10 sm:flex-wrap sm:justify-start  rounded-full  bg-gray-100 py-2 shadow-md shadow-black/5">
                <a href="#">
                    <h1 className="text-gray-400 flex items-center mx-4 font-extrabold bg-[url('../../../assets/LiveDive-Logo-B.svg')] bg-no-repeat bg-left bg-contain  w-10 h-10  text-center text-[0]  " >LiveDive</h1>
                </a>

                <div className=" hidden flex-grow  items-center sm:!flex sm:basis-auto"
                    id="navbarSupportedContent1">

                    {/* <!-- Left navigation links --> */}

                    <ul className="list-style-none mr-auto flex flex-col pl-0 sm:flex-row">
                        <li className="mb-4 sm:mb-0 sm:pr-2" data-te-nav-item-ref>
                            <a className="text-gray-400 transition duration-200 hover:text-red hover:ease-in-out focus:text-red disabled:text-gray-500/30 motion-reduce:transition-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400 sm:px-2 [&.active]:text-gray-500/90 dark:[&.active]:text-zinc-400" href="#" onClick={() => handleNavItemClick('artist')}>
                                search artist
                            </a>
                        </li>
                        <li className="mb-4 sm:mb-0 sm:pr-2" data-te-nav-item-ref>
                            <a href="#" onClick={() => handleNavItemClick('place')} className=" text-gray-400 transition duration-200 hover:text-gray-400/40 hover:ease-in-out focus:text-red disabled:text-gray-400/30 motion-reduce:transition-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400 sm:px-2 [&.active]:text-gray-500/90 dark:[&.active]:text-gray-400/40 text-">
                                search place
                            </a>
                        </li>
                        {/* <li>
                            <a className="mr-4 text-gray-400 transition duration-200 hover:text-red hover:ease-in-out focus:text-red disabled:text-gray-500/30 motion-reduce:transition-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400 [&.active]:text-gray-500/90 dark:[&.active]:text-gray-400/40"
                                href="#">
                                <span className="[&>svg]:w-5">
                                    <HeartIcon />
                                </span>
                            </a>

                        </li>
                        <li>

                            <a className="hidden-arrow mr-4 flex items-center text-gray-400 transition duration-200 hover:text-red hover:ease-in-out focus:text-red disabled:text-gray-500/30 motion-reduce:transition-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400 [&.active]:text-gray-500/90 dark:[&.active]:text-gray-400/40" href="#" role="button">
                                <span className="w-5"><HeartIcon /></span>
                            </a>
                        </li> */}
                    </ul>
                </div>

                {/* <!-- Right elements --> */}
                <div className="flex items-center flex-row">


                    <div div='user-avatar' className="relative">
                        <a className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none" href="#" role="button">
                            {/* <!-- User avatar --> */}
                            <img className="h-10 w-10 rounded-full" src="https://picsum.photos/1500?random=1" alt="" />
                        </a>
                    </ div>

                    {/* <!-- Hamburger button for mobile view --> */}
                    <button className="block border-0 bg-transparent px-2 text-gray-400 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-gray-200 sm:hidden " onClick={onBurguerMenuClick} >

                        {/* <!-- Hamburger icon --> */}
                        <span className="[&>svg]:w-7">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-7 w-7">
                                <path d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                />
                            </svg>
                        </span>
                    </button>

                </div>
            </div>
        </nav >
    );
}

export default Menu;
