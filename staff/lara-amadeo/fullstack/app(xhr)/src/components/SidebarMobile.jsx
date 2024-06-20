import './SidebarMobile.css'
import { useState } from 'react'

export default function SidebarMobile({ onHomeMobileSidebarRow, onCloseSidebarButton }){

    const [open, setOpen] = useState(true)

    const handleHomeButton = () => {
        onHomeMobileSidebarRow()
    }
    const handleCloseSidebar = () => {
        setTimeout(() => {
            onCloseSidebarButton()
        }, 400);
        
        setOpen(false)
    }

    return <div className="h-screen flex flex-col px-[16px] pt-[24px] box-border z-[1000] fixed top-0 w-[50%]">
    <div className={`absolute w-full top-0 left-[-200px] bg-[--white] border border-[#dadada] animate-slide px-[16px] pt-[16px] h-full ${!open && 'animate-slideBack'}`}>

        <div className='flex justify-end'>
            <button onClick={handleCloseSidebar} className="secondary-button icon-button-S p-[4] w-auto" ><div className="icon-s-container"><span className="material-symbols-rounded icon-s text-[--intense-blue] pointer">close</span></div></button>
        </div>

        <div className="h-fit w-auto flex flex-col gap-[8px] mt-[32px]">

        <div onClick={handleHomeButton} className="h-fit w-auto flex flex-row gap-[8px] p-[12px] rounded-xl cursor-pointer hover:bg-[--violet-100]" >
            <div className="icon-m-container"><span className="material-symbols-rounded icon-s">home</span></div><div className="body-text-bold">Home</div>
        </div>

        <div className="h-fit w-auto flex flex-row gap-[8px] p-[12px] rounded-xl cursor-pointer hover:bg-[--violet-100]">
            <div className="icon-s-container"><span className="material-symbols-rounded icon-s">search</span></div><div className="body-text-bold">Search</div>
        </div>

        <div className="h-fit w-auto flex flex-row gap-[8px] p-[12px] rounded-xl cursor-pointer hover:bg-[--violet-100]">
            <div className="icon-s-container"><span className="material-symbols-rounded icon-s">notifications</span></div><div className="body-text-bold">Notifications</div>
        </div>

        <div className="h-fit w-auto flex flex-row gap-[8px] p-[12px] rounded-xl cursor-pointer hover:bg-[--violet-100]">
            <div className="icon-s-container"><span className="material-symbols-rounded icon-s">mail</span></div><div className="body-text-bold">Messages</div>
        </div>

        {/* <div className="sidebar-actions-row sidebar-settings" >
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">settings</span></div><div className="body-text-bold">Settings</div>
        </div> */}
        </div>

    </div>
</div>
}