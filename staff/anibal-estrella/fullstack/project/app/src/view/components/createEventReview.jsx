import React, { useState } from 'react'
import { Button } from '../library'
// import uploadMedia from '../../logic/'


function CreateEventReview() {
    console.log('CreateEventReview => RENDER');

    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);

        // Determine the type of file based on its MIME type
        const mimeType = event.target.files[0].type;
        if (mimeType.startsWith('image')) {
            setFileType('image');
        } else if (mimeType.startsWith('audio')) {
            setFileType('audio');
        } else if (mimeType.startsWith('video')) {
            setFileType('video');
        }
    };

    const handleUpload = async () => {
        if (file && fileType) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const fileData = event.target.result;

                try {
                    const response = await fetch('/upload', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ fileData, fileType }),
                    });

                    const data = await response.json();
                    console.log(`${fileType} uploaded successfully`, data);
                } catch (error) {
                    console.error(`Error uploading ${fileType}`, error);
                }
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <section id='create-review' className='flex flex-col'>
            <div>
                <h3>Choose images, audio or video to share.</h3>
                <input
                    onChange={handleFileChange}
                    accept="image/*"
                    type="file"
                    multiple
                    className='
                    block max-w-fit h-full text-sm pl-0 font-normal
                    file:font-normal 
                    file:mr-4
                    file:py-2
                    file:px-4
                    file:rounded-full file:border-0
                    file:text-xs
                    file:text-white
                    file:uppercase
                    file:bg-lime-300 
                    hover:file:bg-violet-100
                    '
                />
                <Button onClick={handleUpload} className={'max-w-fit'}> Upload</Button>
            </div>
        </section>
    )
}

export default CreateEventReview
