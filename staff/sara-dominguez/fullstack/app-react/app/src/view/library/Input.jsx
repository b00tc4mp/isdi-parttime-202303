export default function Input({ className, ...props }) {
    return <input className={`px-3 py-0 rounded bg-teal-100 text-black ${className ? className : ''}`} {...props}>
    </input>
}