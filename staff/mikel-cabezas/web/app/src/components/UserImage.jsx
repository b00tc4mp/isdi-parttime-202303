import retrieveUser from "../logic/users/retrieveUser"
import { findUserById } from "../data"
import { useEffect, useState } from "react"
import { context } from "../ui"


export default function UserImage({ userId }) {
    
    const [user, setUser] = useState()


    // const user = retrieveUser(userId, user => {
    //     callback(user.id)
    // })

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
                <div className="letter">{ returnLetters ? returnLetters() : '' }</div>
                <img className={user.image ? 'image-profile' : 'hidden image-profile'} src={user.image ? user.image : ''} alt="" />
            </div>
            <div className="user-name">{user.name}</div>
    
        </>
        }
}