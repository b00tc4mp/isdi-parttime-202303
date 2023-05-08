import { getUserName, getUserImage } from "../helpers/dataManagers"


export default function returnUserImage(path, userId, showName, hideImage) {
    if(!userId) {
        throw new Error('Invalid userId')
    }
    const user = getUserName(userId)
    const userImage = getUserImage(userId)
    const separateUserName = user.split(' ')

    let letters
    if (!userImage && separateUserName.length === 1) {
        letters = separateUserName[0][0] + separateUserName[0][1]
    }
    if (!userImage && separateUserName.length > 1) {
        letters = separateUserName[0][0] + separateUserName[1][0]
    }

return <>
    <div className="avatar">
        <div className="letter">{letters}</div>
        <img className={userImage ? 'image-profile' : 'hidden image-profile'} src={userImage ? userImage : ''} alt="" />
    </div>
    <div className="user-name">{user.name}</div>
    </>

}