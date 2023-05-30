import retrieveUser from "../logic/users/retrieveUser"
import { useEffect, useState } from "react"


export default function UserImage({ userId }) {
    const [user, setUser] = useState()

    useEffect(() => {
        try {
            retrieveUser(userId, (error, user) => {

                if (error) {
                    alert(error.message)

                    return
                }
                    setUser(user)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    function returnLetters() {
        const separateUserName = user.name.split(' ')

        if (!user.image && separateUserName.length === 1) {
            return separateUserName[0][0] + separateUserName[0][1]
        }
        if (!user.image && separateUserName.length > 1) {
            return separateUserName[0][0] + separateUserName[1][0]
        }
    }
    
    if(user) {
        return <>
            <div className="avatar">
                {!user.image && <div className="letter">{returnLetters()}</div>}
                {user.image && <img className="image-profile" src={user.image} alt="" />}
            </div>
            <div className="user-name">{user.name}</div>
        </>
        }
}