import retrieveUser from "../logic/users/retrieveUser"


export default function UserImage({ userId }) {
    if(!userId) {
        throw new Error('Invalid userId')
    }

    const user = retrieveUser(userId)
    const separateUserName = user.name.split(' ')
    
    let letters
    if (!user.image && separateUserName.length === 1) {
        letters = separateUserName[0][0] + separateUserName[0][1]
    }
    if (!user.image && separateUserName.length > 1) {
        letters = separateUserName[0][0] + separateUserName[1][0]
    }
    
    return <>
        <div className="avatar">
            <div className="letter">{letters}</div>
            <img className={user.image ? 'image-profile' : 'hidden image-profile'} src={user.image ? user.image : ''} alt="" />
        </div>
        <div className="user-name">{user.name}</div>
    </>
}