import React, { useState } from 'react'

function createEventReview() {
    console.log('createEventReview => RENDER');

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
        <section id='create-review' className=''>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>
        </section>
    )
}

export default createEventReview
