import { createPost } from '../logic/posts/createPost.js'
import { context } from '../ui.js'
import retrieveUserLocation from "../logic/posts/retrieveUserLocation"
import { useState, useEffect, useContext } from 'react'
import Context from '../AppContext.js'
import { IKImage, IKContext, IKUpload } from 'imagekitio-react';
const urlEndpoint = 'https://ik.imagekit.io/mklhds/demo-imagekit'
const publicKey = 'public_KXJOz0g5Xp6gAlhANXjoCNjKLPs=';
const authenticationEndpoint = 'http://localhost:6541/auth';

let postImage

export default function AddPostModal({ onCancel, onCreateNewPost }) {
    const { freeze, unfreeze, alert } = useContext(Context)
    const [userLocation, setUserLocation] = useState(null)

    const onError = err => {
        console.log("Error", err);
    };

    const onSuccess = res => {
        // console.log("Success", res);
        // postImage = res.url
        postImage = res.filePath
    };

    let newImage
    function handleCancelAddPost(event) {
        event.preventDefault()
        onCancel()
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
            getUserLocation()
        } catch (error) {
            alert(error.message)
        }
    }, [])
    useEffect(() => {
        try {
            if (userLocation !== null) {
                alert('userLocation changed')
                getUserLocation()
            }
        } catch (error) {
            alert(error.message)
        }
    }, [userLocation])
    function handleAddNewPost(event) {
        event.preventDefault()
        const userId = context.userId
        const title = document.querySelector('.create-post input.title').value
        const text = document.querySelector('.create-post textarea').value

        try {
            createPost(userId, postImage, title, text, userLocation, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onCreateNewPost()
            })

        } catch (error) {
            alert(error.message)
        }

    }


    return <div className="overlay create-post">
        <form className="create-post" >
            <label htmlFor="text">Title of your post</label>
            <input type="text" className="title" />
            <img className="post-image" src="" alt="" />
            <label htmlFor="file">Upload your image</label>
            <IKContext
                publicKey={publicKey}
                urlEndpoint={urlEndpoint}
                authenticationEndpoint={authenticationEndpoint}
            >
                <IKUpload
                    fileName="post-image-id_"
                    onError={onError}
                    onSuccess={onSuccess}
                />
            </IKContext>

            {/* <input type="file" name="file" id="" accept=".jpg, .jpeg, .png, .webp" onClick={handleConvertImageToBase64} /> */}
            <label htmlFor="textarea">Write your process</label>
            <textarea name="" id="" cols="30" rows="5"></textarea>
            <div className="buttons">
                <button className="button--create-post_cancel" type="cancel" onClick={handleCancelAddPost}>Cancel</button>
                <button className="button--create-post_save" type="submit" onClick={handleAddNewPost}>Create post</button>
            </div>
        </form>
    </div>
}