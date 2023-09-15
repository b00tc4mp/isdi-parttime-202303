export default function Input({className, type, ...props}) {
    return <>
        <input className={`border p-2 rounded-lg text-black border-gray-400 ${className ? className : ''}`} type={type} {...props}>
        </input>
    </>
}