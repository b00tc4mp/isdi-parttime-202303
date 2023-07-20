import { useState, useRef } from 'react';
import { createPost } from "../logic"
import { useAppContext } from "../hooks"

import Panel from '../library/Panel'
import PanelBackground from '../library/PanelBackground'


import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid'
import { CheckIcon } from '@heroicons/react/24/solid'
import { EyeIcon } from '@heroicons/react/24/solid'

export default ({ onCancel, onPostCreated }) => {
    console.debug('// AddPostModal  -> Render')

    const { alert } = useAppContext()

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
            createPost(image, text)
                .then(onPostCreated)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }


    const handleImagePreview = (event) => {
        event.preventDefault()

        setPreviewImage(imageInputRef.current.value);
    }


    return <PanelBackground>
        <h3 className="modal-post-headline">Shoot your post!</h3>
        <Panel className={"p-4 drop-shadow-lg z-30 "}>
            <form onSubmit={handleCreatePost}>

                <label htmlFor="add-post-image" className=" ">Your awesome pic:</label>

                <img src={previewImage} className="grayscale m-2 w-40 bg-gray-400 rounded-xl aspect-square self-center" alt="Preview" />
                <div className="flex justify-normal items-center mt-1">
                    <input type="url" name="image" className="" placeholder="Paste image URL in here." ref={imageInputRef} />
                    <button className="text-[0px] ml-4 text-white transition ease-in-out hover:text-red duration-500" onClick={handleImagePreview}>Preview<EyeIcon className="eye icon" /></button>
                </div>

                <label htmlFor="add-post-text" className="border-top-gradient">tell us something:</label>
                <textarea type="text" name="text" rows="5" placeholder="Write whatever you want in here."></textarea>
                <div className="modal-actions-container border-top-gradient">
                    <button className="text-[0px] text-white transition ease-in-out hover:text-red duration-500" onClick={handleCancel}>Cancel<ArrowSmallLeftIcon className="cancel icon" /></button>
                    <button className="text-[0px] text-white transition ease-in-out hover:text-red duration-500" type="submit">Save <CheckIcon className="save icon" /> </button>
                </div>

            </form>
        </Panel>

        <div className="overlay-panel-close" onClick={handleCancel}></div>
    </PanelBackground>

}