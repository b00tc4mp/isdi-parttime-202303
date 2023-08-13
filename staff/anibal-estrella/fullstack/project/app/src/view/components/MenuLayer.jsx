import React, { useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/solid'

function Menu({ handleNavItemClick }) {

    return (
        <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-gray-100 py-2 shadow-md shadow-black/5 dark:bg-neutral-600 "  >

            <h1 className="flex items-center text-gray-500 mr-4 font-extrabold">LiveDive</h1>
            <ul className="list-style-none mr-auto flex flex-col pl-0 sm:flex-row">
                <li className="mb-4 sm:mb-0 sm:pr-2" data-te-nav-item-ref>
                    <a className="" href="#" onClick={() => handleNavItemClick('artist')}>
                        search artist
                    </a>
                </li>
                <li className="mb-4 sm:mb-0 sm:pr-2" data-te-nav-item-ref>
                    <a href="#" onClick={() => handleNavItemClick('place')} className="">
                        search place
                    </a>
                </li>
            </ul>
            <div div='user-avatar' className="relative">
                <a className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none" href="#" role="button">
                    {/* <!-- User avatar --> */}
                    <img className="h-10 w-10 rounded-full" src="https://picsum.photos/1500?random=1" alt="" />
                </a>
            </ div>
        </nav>
    );
}

export default Menu;
