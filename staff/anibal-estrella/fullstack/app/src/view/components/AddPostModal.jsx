import { useState, useRef } from 'react';
import { createPost } from "../../logic"
import { useAppContext } from "../hooks"

import { PanelBackgroundClose, Panel, TopLine, Button, ButtonAction } from '../library/'


import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/solid'
import { EyeIcon } from '@heroicons/react/24/solid'

export default ({ onCancel, onPostCreated, onPanelClick }) => {
    console.debug('// AddPostModal  -> Render')

    const { alert, freeze, unfreeze, navigate } = useAppContext()

    const emptyImage = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs"

    const imageInputRef = useRef(null);

    const [previewImage, setPreviewImage] = useState(emptyImage);

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleCreatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            freeze()

            createPost(image, text)
                .then(onPostCreated)
                .catch(error => alert(error.message))
            unfreeze()

        } catch (error) {
            alert(error.message)

        }
        unfreeze()
    }

    const handleImagePreview = (event) => {
        event.preventDefault()
        setPreviewImage(imageInputRef.current.value);
    }

    const handlePanelClick = (event) => {
        onPanelClick(event)
    }

    return <PanelBackgroundClose onCancel={handleCancel}>
        <section id="edit-post-modal" className='center-xy '>
            <h2 className="mb-2 text-center ">Shoot your post!</h2>

            <Panel id="panel" tag='form' className=" self-center p-4 drop-shadow-lg z-50" onSubmit={handleCreatePost} onClick={handlePanelClick}>

                <TopLine></TopLine>

                <label htmlFor="add-post-image" className=" ">Your awesome pic:</label>

                <img src={previewImage} className="grayscale m-2 w-40 bg-gray-400 rounded-xl aspect-square self-center" alt="Preview" />

                <div className="flex justify-normal items-center mt-1">

                    <input type="url" name="image" placeholder="Paste image URL in here." ref={imageInputRef} />


                    <ButtonAction onClick={handleImagePreview} className="mx-2 mb-4">Preview<EyeIcon id="preview-icon" className='h-6' /></ButtonAction>

                </div>
                <TopLine></TopLine>
                <label htmlFor="add-post-text" className="">Say something:</label>
                <textarea type="text" name="text" rows="5" placeholder="Write whatever you want in here."></textarea>

                <TopLine></TopLine>


                <div className="flex justify-evenly mt-2">
                    <ButtonAction onClick={handleCancel}>Cancel<ArrowSmallLeftIcon id="cancel-icon" className='h-6' /></ButtonAction>
                    <ButtonAction className="text-[0px] text-white hover:text-red" type="submit">Save <CheckIcon id="save-icon" className='h-6' /> </ButtonAction>
                </div>

            </Panel>
        </section>

    </PanelBackgroundClose>

}