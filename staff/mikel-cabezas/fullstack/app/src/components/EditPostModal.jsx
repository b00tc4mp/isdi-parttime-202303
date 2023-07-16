import { context } from "../ui"
import { editPost } from '../logic/posts/editPost'
import { useEffect, useState } from "react"
import retrievePostByPostId from "../logic/posts/retrievePostByPostId"
import { IKImage, IKContext, IKUpload } from 'imagekitio-react'
const urlEndpoint = 'https://ik.imagekit.io/mklhds/demo-imagekit'
const publicKey = 'public_KXJOz0g5Xp6gAlhANXjoCNjKLPs=';
const authenticationEndpoint = `${import.meta.env.VITE_API_URL}/auth`
let postImage


export function EditPostModal({ postId, onCancel, onPostUpdated }) {
    // const userId = context.token

    const [post, setPost] = useState({})
    const [newImage, setNewImage] = useState()

    const onError = (error) => {
        console.log("Error", error);
        const length = Number(error.name.split(".").length - 1)
        const fileExtension = error.name.split(".")[length]
        alert(`Your file with ${fileExtension} extension are not accepted`)
        document.querySelector('.edit-post input[type="file"]').value = ''
    };

    const onSuccess = res => {
        console.log("Success", res);
        setNewImage(res.filePath)
    }
    const onValidateFile = res => {
        if (res.type === "image/png" && res.size < 5000000 || res.type === "image/jpeg" && res.size < 5000000 || res.type === "image/webp" && res.size < 5000000 || res.type === "image/gif" && res.size < 5000000 || res.type === "image/heic") {
            return true
        } else {
            return false
        }
    }
    // let newImage
    // useEffect(() => {
    //     setNewImage(post.image)
    // }, [])
    useEffect(() => {
        try {
            retrievePostByPostId(context.token, postId)
                .then(post => {
                    setPost(post)
                    setNewImage(post.image)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [post])


    function handleCancelEditPost(event) {
        event.preventDefault()
        onCancel()
    }
    function handleVisibility(event) {
    }
    function handleUpdateEditPost(event) {
        event.preventDefault()
        const title = event.target.parentElement.parentElement.elements['title'].value
        const text = event.target.parentElement.parentElement.elements['text'].value
        const image = newImage
        let visibility
        if (event.target.parentElement.parentElement.elements.visibility.checked) {
            visibility = "public"
        } else {
            visibility = "private"
        }
        try {
            editPost(context.token, postId, title, text, image, visibility)
                .then(() => onPostUpdated())
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }

    }

    return <div className="overlay edit-post">
        <form className="edit-post">
            <input type="hidden" />

            <label htmlFor="checkbox" className="visibility">Visibility {post.visibility === 'public' && <input type="checkbox" className="visibility" name="visibility" defaultChecked id="" />}
                {post.visibility === 'private' && <input type="checkbox" className="visibility" name="visibility" id="" />} </label>

            <label htmlFor="text">Edit title</label>
            <input type="text" className="title" name="title" defaultValue={post.title} />
            <IKContext
                publicKey={publicKey}
                urlEndpoint={urlEndpoint}
                authenticationEndpoint={authenticationEndpoint}
            >
                <IKImage
                    path={newImage}
                    className="post-image"
                    name="post-image"
                />
            </IKContext>
            <label htmlFor="file">Edit your image</label>
            <IKContext
                publicKey={publicKey}
                urlEndpoint={urlEndpoint}
                authenticationEndpoint={authenticationEndpoint}
            >
                <IKUpload
                    fileName="post-image-id_"
                    // validateFile={file => file.type === "image/png"}
                    validateFile={onValidateFile}
                    onError={onError}
                    onSuccess={onSuccess}
                    accept=".jpg, .jpeg, .png, .webp, .heic"
                />
            </IKContext>
            <label htmlFor="textarea">Edit your process</label>
            <textarea id="" cols="30" rows="5" name="text" defaultValue={post.text}></textarea>
            <div className="buttons">
                <button className="button--edit-post_cancel" type="cancel" onClick={handleCancelEditPost}>Cancel</button>
                <button className="button--edit-post_save" type="submit" onClick={handleUpdateEditPost}>Update post</button>
            </div>
        </form>
    </div>
}