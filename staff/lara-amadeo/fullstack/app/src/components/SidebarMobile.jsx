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

    return <div className="sidebar-mobile">
    <div className={`sidebar-content ${!open && 'close'}`}>

        <div className='sidebar-mobile-upper-part'>
            <button onClick={handleCloseSidebar} className="secondary-button icon-button-S mobile-sidebar" ><div className="icon-s-container"><span className="material-symbols-rounded icon-s sidebar-close pointer">close</span></div></button>
        </div>

        <div className="sidebar-actions">

        <div onClick={handleHomeButton} className="sidebar-actions-row sidebar-home" >
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">home</span></div><div className="body-text-bold">Home</div>
        </div>

        <div className="sidebar-actions-row">
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">search</span></div><div className="body-text-bold">Search</div>
        </div>

        <div className="sidebar-actions-row">
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">notifications</span></div><div className="body-text-bold">Notifications</div>
        </div>

        <div className="sidebar-actions-row">
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">mail</span></div><div className="body-text-bold">Messages</div>
        </div>

        {/* <div className="sidebar-actions-row sidebar-settings" >
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">settings</span></div><div className="body-text-bold">Settings</div>
        </div> */}
        </div>

    </div>
</div>
}