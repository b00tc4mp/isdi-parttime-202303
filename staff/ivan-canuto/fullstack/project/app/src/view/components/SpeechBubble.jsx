import { createPost } from "../../logic"
import { useState } from "react"

export default function SpeechBubble({ role, content, className, responseValue }) {
    const [showButton, setShowButton] = useState(false)

    const handleToggleButton = () => setShowButton(!showButton)

    const handleCreatePost = () => createPost(responseValue)

    return <section className={`w-full flex ${role === 'assistant' ? 'justify-start' : role === 'user' ? 'justify-end' : 'justify-center'}`}>
        <div className={`speechBubble p-4 mx-4 my-2 rounded-lg ${className ? className : ''} ${role === 'assistant' ? 'bg-green-300 rounded-tl-none' : role === 'user' ? 'bg-blue-300 rounded-tr-none' : 'bg-red-300'}`}>
            <p>{content}</p>
            {role === 'assistant' && typeof content === 'string' && <div className={`${showButton ? 'bg-white' : ''} flex gap-2 w-fit pr-4 pl-1 mt-2 rounded-lg`}>
                {showButton && <button className='px-1 py-0' onClick={handleCreatePost}>Generate post</button>}
                <div className={`mx-[-10px] mt-1 h-fit rounded-full w-6 flex items-center`} onClick={handleToggleButton}><span className="material-symbols-outlined">more_vert</span></div>
            </div>}
        </div>
    </section>
}