export default function Button({children, className, ...props}) {
    return <>
        <button className={`py-2 px-2 rounded-lg text-black active:bg-gray-200 flex justify-center items-center ${className ? className : ''}`} {...props}>
            {children}
        </button>
    </>
}