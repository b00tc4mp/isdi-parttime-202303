export default function SpeechBubble({ role, content, className }) {
    return <section className={`speechBubble w-full flex ${role === 'assistant' ? 'justify-start' : role === 'user' ? 'justify-end' : 'justify-center'}`}>
        {/* {console.log(content)} */}
        <div className={`p-4 mx-4 my-2 rounded-lg ${className ? className : ''} ${role === 'assistant' ? 'bg-green-300 rounded-tl-none' : role === 'user' ? 'bg-blue-300 rounded-tr-none' : 'bg-slate-200'}`}>
            {content}
        </div>
    </section>
}