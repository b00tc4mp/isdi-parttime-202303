import { createPost } from '../logic/posts/createPost.js'
import { context } from '../ui.js'
import retrieveUserLocation from "../logic/posts/retrieveUserLocation.js"
import { useState, useEffect, useContext } from 'react'
import Context from '../AppContext.js'
import { IKImage, IKContext, IKUpload } from 'imagekitio-react'
const urlEndpoint = 'https://ik.imagekit.io/mklhds/demo-imagekit'
const publicKey = 'public_KXJOz0g5Xp6gAlhANXjoCNjKLPs=';
const authenticationEndpoint = `${import.meta.env.VITE_API_URL}/auth`

export default function AddPostModal({ onCancel, onCreateNewPost }) {
    const { alert } = useContext(Context)
    const [userLocation, setUserLocation] = useState(null)
    const [newImage, setNewImage] = useState()

    const onError = (error) => {
        debugger
        console.log("Error", error);
        const fileExtension = error.type
        alert(`Your file with ${fileExtension} extension are not accepted`)
        document.querySelector('.create-post input[type="file"]').value = '' // a manu no le va a gustar esta linea
    };

    const onSuccess = res => {
        console.log("Success", res);
        setNewImage(res.filePath)
    }
    const onValidateFile = res => {
        console.log(res)
        debugger
        if (res.type === "image/png" && res.size < 5000000 || res.type === "image/jpeg" && res.size < 5000000 || res.type === "image/webp" && res.size < 5000000 || res.type === "image/gif" && res.size < 5000000 || res.type === "image/heic") {
            return true
        } else {
            // TODO create const with typed error and put as param in onError
            onError(res)
            return false
        }
    }

    function getUserLocation() {
        retrieveUserLocation((error, location) => {
            if (error) {
                error.message

                return
            }
            setUserLocation(location)
        })
    }
    useEffect(() => {
        try {
            // getUserLocation()
        } catch (error) {
            alert(error.message)
        }
    }, [])
    useEffect(() => {
        try {
            if (userLocation !== null) {
                alert('userLocation changed')
                // getUserLocation()
            }
        } catch (error) {
            alert(error.message)
        }
    }, [userLocation])
    // useEffect(() => {
    //     try {
    //         if (userLocation !== null) {
    //             alert('userLocation changed')
    //             // getUserLocation()
    //         }
    //     } catch (error) {
    //         alert(error.message)
    //     }
    // }, [newImage])

    const handleAddNewPost = event => {
        event.preventDefault()
        const userId = context.token
        const title = document.querySelector('.create-post input.title').value
        const text = document.querySelector('.create-post textarea').value
        try {
            debugger
            createPost(userId, newImage, title, text, userLocation)
                .then(() => onCreateNewPost())
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCancelAddPost = event => {
        event.preventDefault()
        onCancel()
    }

    return <div className="overlay create-post max-h-[95vh]">
        <form className="create-post" >
            <label htmlFor="text">Title of your post</label>
            <input type="text" className="title" />
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
                    // validateFile={res => res.type === "image/png" && res.size < 5000000 || res.type === "image/jpeg" && res.size < 5000000 || res.type === "image/webp" && res.size < 5000000 || res.type === "image/gif" && res.size < 5000000 || res.type === "image/heic"}
                    onError={onError}
                    onSuccess={onSuccess}
                // accept=".jpg, .jpeg, .png, .webp, .heic"
                />
            </IKContext>

            {/* <input type="file" name="file" id="" accept=".jpg, .jpeg, .png, .webp" onClick={handleConvertImageToBase64} /> */}
            <label htmlFor="textarea">Write your process</label>
            <textarea name="" id="" cols="30" rows="5" className='mb-3'></textarea>
            <div className="buttons">
                <button className="button--create-post_cancel" type="cancel" onClick={handleCancelAddPost}>Cancel</button>
                <button className="button--create-post_save" type="submit" onClick={handleAddNewPost} disabled={!newImage && true} >Create post</button>
            </div>
        </form>
    </div>
}