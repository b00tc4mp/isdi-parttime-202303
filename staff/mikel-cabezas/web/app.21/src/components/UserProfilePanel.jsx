import UpdateUserInfo from "./UpdateUserInfo"
import UpdateUserPassword from "./UpdateUserPassword"
import Sidebar from "./sidebarProfilePanel"
import Header from "./Header"
import './UserProfilePanel.css'

export default function Profile( {goBack, goBackClick, onSavelUpdateProfile, onUserProfile, savelUpdateProfile, setSavelUpdateProfile} ) {
    return <> 
    <Sidebar goBackClick={goBackClick} goBack={goBack}/>
    <div className={`section user-account`
        }>
        <UpdateUserInfo onSavelUpdateProfile={onSavelUpdateProfile} savelUpdateProfile={savelUpdateProfile} setSavelUpdateProfile={setSavelUpdateProfile} />
        <UpdateUserPassword />

        <div className="delete-account" id="delete-account">
            <button className="error">Delete account</button>
        </div>
    </div>
</>
}