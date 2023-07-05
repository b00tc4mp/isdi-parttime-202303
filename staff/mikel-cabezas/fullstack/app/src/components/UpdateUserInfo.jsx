import { context } from "../ui"
import updateUserName from "../logic/users/updateUserName"
import updateUserEmail from "../logic/users/updateUserEmail"
import uploadImage from "../logic/users/updateUserImage"
import { useEffect, useState } from "react"
import retrieveUser from "../logic/users/retrieveUser"
import { useContext } from "react"
import AppContext from "../AppContext"

export default function UpdateUserInfo({ }) {
    const { freeze, unfreeze, alert } = useContext(AppContext)

    const [user, setUser] = useState()
    const userId = context.token

    useEffect(() => {
        try {
            retrieveUser(userId)
                .then(() => {
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

    function handleConvertImageToBase64(event) {
        const file = event.target
        const imagePostPreview = document.querySelector('.data.user-info .avatar img')
        const imageTarget = document.querySelector('input[type="file"]')
        const printImage = file.onchange = function (event) {
            const file = event.target.files[0]
            const image = new FileReader()
            image.onload = () => {
                const base64 = image.result
                newImage = base64
                imagePostPreview.src = base64
                imageTarget.src = base64
            }
            image.readAsDataURL(file)
            return file
        }
    }

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
            const image = event.target.parentElement.parentElement.elements['file']
            user.name !== name.value && updateUserName(userId, name.value, error => {
                if (error) {
                    alert(error.message)
                }
            })
            user.email !== email.value && updateUserEmail(userId, email.value)
                .then(() => { })
                .catch(error => alert(error.message))

            if (image.src)
                user.image !== image && uploadImage(userId, image, error => { error ? alert(error.message) : '' })

            setDisabled(true)
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
                        {user?.image && <img className="image-profile w-8 rounded-full" src={user?.image} alt="" />}
                        {/* {<img className="image-profile" src={user?.image} alt="" />} */}
                    </div>
                    <label htmlFor="">Update image profile</label>
                    <input type="file" name="file" id="" accept=".jpg, .jpeg, .png, .webp" onClick={handleConvertImageToBase64} />
                    <div className={`buttons ${!disabled ? '' : 'off'}`} >
                        <button className="button--update-info__cancel-info" type="cancel" onClick={handleCancelUpdateProfile}>Cancel</button>
                        <button className="button--update-info__save-info" onClick={handleSavelUpdateProfile}>Save</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}