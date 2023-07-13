import { context } from '../../logic/context'
import './SettingsMenu.css'
import { useContext } from 'react'
import Context from '../../Context'
import logoutUser from '../../logic/logoutUser'

export default function SettingsMenu({ onEmailRowClick, onPasswordRowClick, onAvatarRowClick }) {

    const { navigate } = useContext(Context)


    function handleEmailRow() {
        onEmailRowClick()
    }

    function handlePasswordRow() {
        onPasswordRowClick()
    }

    function handleAvatarRow() {
        onAvatarRowClick()
    }

    function handleLogOut() {
        logoutUser()
        navigate('/login')
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