export default function Input({ className, ...props }) {
    return <input className={`w-full rounded-lg border-gray-light p-4 pe-12 text-sm shadow-sm  ${className ? className : ''}`} {...props}>
    </input>
}


