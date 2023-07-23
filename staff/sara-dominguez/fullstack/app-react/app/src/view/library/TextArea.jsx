export default function TextArea({ className, ...props }) {
    return <textarea className={`px-3 py-0 rounded bg-teal-100 text-black ${className ? className : ''}`} {...props}>
    </textarea>
}