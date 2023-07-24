import { useState, useEffect, useRef } from 'react';

import { updatePost, retrievePost, deletePost } from "../../logic"

import { useAppContext } from "../hooks"

import { Panel, TopLine, ButtonAction } from '../library'

import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/solid'
import PanelBackgroundClose from '../library/PanelBackgroundClose';
import { EyeIcon } from '@heroicons/react/24/solid'

export default function EditPostModal({ onPanelClick, onCancel, onPostEdited, postId, onDeletedPost }) {
    console.debug('// EditPostModal  -> Render')

    const { alert, freeze, unfreeze, navigate } = useAppContext()
    const [post, setPost] = useState(null)
    //const [previewImage, setPreviewImage] = useState(null)


    useEffect(() => {
        freeze()

        try {
            retrievePost(postId)
                .then(setPost)
                .catch(error => alert(error.message))
                .finally(unfreeze)

            // setPost(post)
            // setPreviewImage(post.image);

        } catch (error) {
            alert(error.message)
            unfreeze()
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

            updatePost(postId, image, text)
                .then(onPostEdited)
            unfreeze()
                .catch(error => alert(error.message, 'error'))

        } catch (error) {
            alert(error.message, 'warn')
        }
        unfreeze()
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
    const handlePanelClick = (event) => {
        onPanelClick(event)
    }
    // const imageInputRef = useRef();

    // const handleImagePreview = (event) => {
    //     event.preventDefault()

    //     setPreviewImage(imageInputRef.current.value);
    // }


    return <PanelBackgroundClose onCancel={handleCancel}>
        {post && <section id="edit-post-modal" className='center-xy '>

            <h2 className="mb-2 text-center ">Edit your post!</h2>

            <Panel id="panel" tag="form" className=" self-center p-4 drop-shadow-lg z-50" onSubmit={handleEditPost} onClick={handlePanelClick}>
                <TopLine></TopLine>
                <label htmlFor="edit-post-image " className=''>Image:</label>
                <img src={post.image} className="grayscale m-2 w-40 bg-gray-400 rounded-xl aspect-square self-center" alt="Preview" />
                <div className='flex justify-center items-center mt-1'>
                    <input className='w-full' type="url" name="image" placeholder="Paste image URL in here." defaultValue={post.image} />

                    {/* TODO IMAGE PREVIEW */}
                    {/* <input className='input-preview' type="url" name="image" placeholder="Paste image URL in here."
                        defaultValue={previewImage} ref={imageInputRef} /> */}
                    {/* <button className="preview-image-button icon post-button" onClick={handleImagePreview}>Preview<EyeIcon className="eye icon" /></button> */}
                </div>
                <TopLine></TopLine>
                <label htmlFor="edit-post-text ">Text:</label>
                <textarea type="text" name="text" rows="5" placeholder="Write whatever you want in here." defaultValue={post.text}></textarea>

                <div className="flex justify-evenly mt-2 h-10">
                    <ButtonAction className="text-[0px] text-white hover:text-red" onClick={handleDeletePost}>Delete <TrashIcon id="delete-icon" className='h-6' /></ButtonAction>
                    <ButtonAction onClick={handleCancel}>Cancel<ArrowSmallLeftIcon id="cancel-icon" className='h-6' /></ButtonAction>
                    <ButtonAction className="text-[0px] text-white hover:text-red" type="submit">Save <CheckIcon id="save-icon" className='h-6' /> </ButtonAction>
                </div>

            </Panel>

            <div className="overlay-panel-close" onClick={handleCancel}></div>

        </section>}
    </PanelBackgroundClose >

}

