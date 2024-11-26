import UpdateUserInfo from "./UpdateUserInfo"
import UpdateUserPassword from "./UpdateUserPassword"
import Sidebar from "./sidebarProfilePanel"

export default function Profile() {


    return <> 
    <Sidebar />
        <div className="section user-account">
            <UpdateUserInfo />
            <UpdateUserPassword />

            <div className="delete-account" id="delete-account">
                <button className="error">Delete account</button>
            </div>
        </div>
</>
}