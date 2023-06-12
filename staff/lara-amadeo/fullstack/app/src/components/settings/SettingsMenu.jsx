import { context } from '../../ui'
import './SettingsMenu.css'

export default function SettingsMenu({ onEmailRowClick, onPasswordRowClick, onAvatarRowClick, onLogOutButton }){

    function handleEmailRow(){
        onEmailRowClick()
    }

    function handlePasswordRow(){
        onPasswordRowClick()
    }

    function handleAvatarRow(){
        onAvatarRowClick()
    }

    function handleLogOut(){
        delete context.userId

        onLogOutButton()
    }

    return <div className="max-w-[350px] min-w-[343px] flex flex-col gap-[8px] mt-[16px]">
        <div className="text-[--solid-blue] body-text bg-[--violet-200] rounded-xl flex items-center justify-between p-[16px] h-fit pointer" onClick={handleEmailRow}>
            <a>Update email</a>
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">chevron_right</span></div>                       
        </div>

        <div className="text-[--solid-blue] body-text bg-[--violet-200] rounded-xl flex items-center justify-between p-[16px] h-fit pointer" onClick={handlePasswordRow}>
            <a>Update password</a>
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">chevron_right</span></div>
        </div>

        <div className="text-[--solid-blue] body-text bg-[--violet-200] rounded-xl flex items-center justify-between p-[16px] h-fit pointer mb-[8px]" onClick={handleAvatarRow}>
            <a>Update avatar</a>
            <div className="icon-m-container"><span className="material-symbols-rounded icon-m">chevron_right</span></div>                      
        </div>
        <a className="link" id="logout" onClick={handleLogOut}>Log out</a>
    </div>
}