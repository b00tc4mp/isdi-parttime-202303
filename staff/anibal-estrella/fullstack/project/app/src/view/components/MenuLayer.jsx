import { XCircleIcon } from '@heroicons/react/24/solid'

export default function Menu({ handleNavItemClick, onClose }) {
    console.debug('/// MENULayer  -> Render')

    return (
        <nav className="flex bg-gray-400/80 z-40 fixed top-0 left-0 w-full h-full backdrop-blur-lg uppercase">
            <ul className="px-4 self-center   [&>*]:font-normal [&>*]:text-3xl">
                <li id="menu-close" className="absolute top-0 right-0 w-8 h-8">
                    <a href="#" className="text-[0]" onClick={(e) => {
                        e.preventDefault();
                        onClose();
                    }} >Close Menu<XCircleIcon /></a>
                </li>
                <li ><a href="#" onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    handleNavItemClick('artist')
                }}>search artist</a></li>
                <li ><a href="#" onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    handleNavItemClick('place')
                }}>search place</a></li>
                <li> <a href="#" onClick={() => handleNavItemClick('')}>add review</a></li>
                <li><a href="#" onClick={() => handleNavItemClick('')}>link</a></li>
                <li  ><a href="#" onClick={() => handleNavItemClick('')}>link</a></li>
                <li className="pb-4" ><a href="#" oonClick={() => handleNavItemClick('')}>Logout</a></li>
                <li className='text-lg text-gray-200 flex items-center pt-1 pr-1'>
                    <span class="ml-3 text-sm font-medium ">dark</span>
                    <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" class="sr-only peer" onClick={() => handleNavItemClick('')} />
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                    <span class="ml-3 text-sm font-medium ">light</span>
                </li>
            </ul>
        </nav >)

}
