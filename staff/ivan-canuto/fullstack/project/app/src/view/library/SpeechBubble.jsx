export default function SpeechBubble({ role, content, className }) {
    return <section className={`speechBubble w-full flex ${role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
        {/* {console.log(content)} */}
        <div className={`p-4 mx-4 my-2 rounded-lg ${className ? className : ''} ${role === 'assistant' ? 'bg-green-300 rounded-tl-none' : 'bg-blue-300 rounded-tr-none'}`}>
            {content}
        </div>
    </section>
}