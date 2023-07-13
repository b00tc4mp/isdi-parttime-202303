import { useState, useEffect, useRef } from 'react';

import { context } from "../ui.js"
import { updatePost, retrievePost, deletePost } from "../logic"

import { useAppContext } from "../hooks"

import Panel from '../library/Panel'

import "./EditPostModal.css"
import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/solid'
import { EyeIcon } from '@heroicons/react/24/solid'

export default function EditPostModal({ onCancel, onPostEdited, postId, onDeletedPost }) {
    console.debug('// EditPostModal  -> Render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [post, setPost] = useState(null)
    //const [previewImage, setPreviewImage] = useState(null)


    useEffect(() => {
        try {
            retrievePost(context.token, postId)
                .then(setPost)
                .catch(error => alert(error.message))

            // setPost(post)
            // setPreviewImage(post.image);

        } catch (error) {
            alert(error.message)
        }
    }, [postId])

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleEditPost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            freeze()

            updatePost(context.token, postId, image, text).then(() => {
                unfreeze()

                onPostEdited()
            })
                .catch((error) => {
                    unfreeze()

                    alert(error.message, 'error')
                })
        } catch (error) {
            unfreeze()

            alert(error.message, 'warn')
        }
    }

    const handleDeletePost = (event) => {
        event.preventDefault()

        try {
            freeze()
            const answer = confirm('Do you really want to delete this post?')

            if (answer) {
                deletePost(context.token, postId).then(() => {
                    unfreeze()

                    onDeletedPost()
                })
                    .catch((error) => {
                        unfreeze()

                        alert(error.message, 'error')
                    })
            }
        } catch (error) {
            unfreeze()

            alert(error.message, 'warn')
        }

    };

    // const imageInputRef = useRef();

    // const handleImagePreview = (event) => {
    //     event.preventDefault()

    //     setPreviewImage(imageInputRef.current.value);
    // }

    return <>
        {post && <section className="edit-post-modal">

            <h3 className="modal-post-headline">Edit your post!</h3>

            <Panel tag="form" className="edit-post-modal-form" onSubmit={handleEditPost}>
                <label htmlFor="edit-post-image " className='border-top-gradient'>Image:</label>
                <img src={post.image} className="edit-post-th grayscale-img" alt="Preview" />
                <div className='modal-actions-container'>
                    <input className='input-preview' type="url" name="image" placeholder="Paste image URL in here."
                        defaultValue={post.image} />

                    {/* TODO IMAGE PREVIEW */}
                    {/* <input className='input-preview' type="url" name="image" placeholder="Paste image URL in here."
                        defaultValue={previewImage} ref={imageInputRef} /> */}
                    {/* <button className="preview-image-button icon post-button" onClick={handleImagePreview}>Preview<EyeIcon className="eye icon" /></button> */}

                </div>

                <label htmlFor="edit-post-text ">Text:</label>
                <textarea type="text" name="text" cols="25" rows="15" placeholder="Write whatever you want in here." defaultValue={post.text}></textarea>

                <div className="modal-actions-container border-top-gradient">
                    <button className="delete post-button icon" onClick={handleDeletePost}>Delete <TrashIcon className="delete icon" /></button>
                    <button className="cancel post-button icon" onClick={handleCancel}>Cancel<ArrowSmallLeftIcon className="cancel icon" /></button>
                    <button className="save post-button icon" type="submit">Save <CheckIcon className="save icon" /> </button>

                </div>

            </Panel>

            <div className="overlay-panel-close" onClick={handleCancel}></div>

        </section>}
    </>

}