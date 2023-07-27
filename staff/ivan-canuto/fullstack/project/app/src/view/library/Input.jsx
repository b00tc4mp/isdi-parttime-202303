export default function Input({className, type, ...props}) {
    return <>
        <input className={`border-2 p-2 rounded-lg text-black border-black `} type={type} {...props}>
        </input>
    </>
}