import React from 'react';

function Drawer({ openDrawer, isDrawerOpen }) {
    return (
        <>
            <div className={`fixed bottom-0 w-full bg-white z-50 rounded-t-xl duration-300 transition-all ease-in-out ${isDrawerOpen ? "h-1/2" : " h-0"} `}>
                <div className="p-4 grid grid-cols-2 ">
                    <h2 className=" font-bold mb-4 text-xs text-gray-300 ">Bottom Drawer Content</h2>
                    <button className=" text-gray-400 text-xs self-start place-self-end" onClick={openDrawer}>Close</button>
                    <div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Drawer;
