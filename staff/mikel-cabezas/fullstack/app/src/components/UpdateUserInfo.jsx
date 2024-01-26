import { context } from "../ui"
import updateUserName from "../logic/users/updateUserName"
import updateUserEmail from "../logic/users/updateUserEmail"
import uploadImage from "../logic/users/updateUserImage"
import { useEffect, useState } from "react"
import retrieveUser from "../logic/users/retrieveUser"
import { useContext } from "react"
import AppContext from "../AppContext"
import { IKImage, IKContext, IKUpload } from 'imagekitio-react'
const urlEndpoint = 'https://ik.imagekit.io/mklhds/demo-imagekit'
const publicKey = 'public_KXJOz0g5Xp6gAlhANXjoCNjKLPs=';
const authenticationEndpoint = `${import.meta.env.VITE_API_URL}/auth`

export default function UpdateUserInfo({ }) {
    const { freeze, unfreeze, alert } = useContext(AppContext)

    const [user, setUser] = useState()
    const [userImage, setUserImage] = useState()
    const userId = context.token


    const onError = (error) => {
        console.log("Error", error);
        const length = Number(error.name.split(".").length - 1)
        const fileExtension = error.name.split(".")[length]
        alert(`Your file with ${fileExtension} extension are not accepted`)
        event.target.value = ''
        document.querySelector('.create-post input[type="file"]').value = ''
    };

    const onSuccess = res => {
        console.log("Success", res);
        setUserImage(res.filePath)
    }
    const onValidateFile = res => {
        if (res.type === "image/png" && res.size < 5000000 || res.type === "image/jpeg" && res.size < 5000000 || res.type === "image/webp" && res.size < 5000000 || res.type === "image/gif" && res.size < 5000000 || res.type === "image/heic") {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        try {
            retrieveUser(userId)
                .then(user => {
                    if (!user) {
                        alert('user not found')

                        return
                    }
                    const _user = {
                        name: user.name,
                        email: user.email,
                        image: user.image
                    }
                    setUser(_user)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    useEffect(() => {
        setUserImage(user?.image)
    }, [user])


    let newImage
    let letters
    if (user) {
        const separateUserName = user['name'].split(' ')

        if (!user.image && separateUserName.length === 1) {
            letters = separateUserName[0][0] + separateUserName[0][1]
        } else if (!user.image && separateUserName.length > 1) {
            letters = separateUserName[0][0] + separateUserName[1][0]
        }

    }

    const [disabled, setDisabled] = useState(true)


    function handleUpdateProfile(event) {
        event.preventDefault()
        try {
            setDisabled(false)
        } catch (error) {
            console.log(error.message)
        }
    }
    function handleSavelUpdateProfile(event) {
        event.preventDefault()
        try {
            setDisabled(true)
            const name = event.target.parentElement.parentElement.elements['name']
            const email = event.target.parentElement.parentElement.elements['email']

            user.name !== name.value && updateUserName(userId, name.value).catch(error => alert(error.message))

            user.email !== email.value && updateUserEmail(userId, email.value).catch(error => alert(error.message))

            if (userImage)
                user.image !== userImage && uploadImage(userId, userImage).catch(error => alert(error.message))

            setDisabled(true)
            let newChanges = []
            user.name !== name.value && newChanges.push('Name ')
            user.email !== email.value && newChanges.push('Email ')
            user.image !== userImage && newChanges.push('Image ')
            if (newChanges.length > 2) {
                alert(`Name, Email and Image updated!`)
            } else if (newChanges.length > 1) {
                alert(`${newChanges.join(', ')} updated!`)
            } else {
                alert(`${newChanges} updated!`)
            }
        } catch (error) {
            console.log(error.stack)
        }
    }

    function handleCancelUpdateProfile(event) {
        event.preventDefault()
        try {
            setDisabled(true)
        } catch (error) {
            console.log(error.stack)
        }
    }

    return <>
        <div className="container user-account">
            <div className="update update-info" id="update-profile">
                <h2>Update profile</h2>
                <p>Press de pencil icon for edit your name or your email</p>
                <button className="button--update-info__profile" onClick={handleUpdateProfile} >Edit profile <i className="uil uil-pen"></i></button>
                <form className="data user-info">
                    <label htmlFor="">Your name</label>
                    <input type="text" defaultValue={user?.name} name="name" disabled={disabled} />
                    <label htmlFor="">Your email</label>
                    <input type="email" defaultValue={user?.email} name="email" disabled={disabled} />
                    <div className="avatar">
                        {!user?.image && <div className="letter">{letters}</div>}
                        {user?.image &&
                            <IKContext
                                publicKey={publicKey}
                                urlEndpoint={urlEndpoint}
                                authenticationEndpoint={authenticationEndpoint}
                            >
                                <IKImage
                                    path={userImage}
                                    className="image-profile w-8 rounded-full"
                                    name="post-image"
                                />
                            </IKContext>

                        }
                        {/* {<img className="image-profile" src={user?.image} alt="" />} */}
                    </div>
                    <label htmlFor="">Update image profile</label>
                    <IKContext
                        publicKey={publicKey}
                        urlEndpoint={urlEndpoint}
                        authenticationEndpoint={authenticationEndpoint}
                    >
                        <IKImage
                            path={newImage}
                            className="post-image w-full"
                            name="post-image"
                        />
                        <label htmlFor="file">Upload your image</label>
                        <IKUpload
                            fileName="post-image-id_"
                            // validateFile={file => file.type === "image/png"}
                            validateFile={onValidateFile}
                            onError={onError}
                            onSuccess={onSuccess}
                            accept=".jpg, .jpeg, .png, .webp, .heic"
                        />
                    </IKContext>                    <div className={`buttons ${!disabled ? '' : 'off'}`} >
                        <button className="button--update-info__cancel-info" type="cancel" onClick={handleCancelUpdateProfile}>Cancel</button>
                        <button className="button--update-info__save-info" onClick={handleSavelUpdateProfile}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}