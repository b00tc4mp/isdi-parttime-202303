import UpdateUserInfo from "./UpdateUserInfo"
import UpdateUserPassword from "./UpdateUserPassword"
import Sidebar from "./sidebarProfilePanel"
import './UserProfilePanel.css'

export default function Profile( {goBackClick} ) {
    return <> 
    <Sidebar goBackClick={goBackClick}/>
    <div className="section user-account start-animation">
        <UpdateUserInfo />
        <UpdateUserPassword />

        <div className="delete-account" id="delete-account">
            <button className="error">Delete account</button>
        </div>
    </div>
</>
}