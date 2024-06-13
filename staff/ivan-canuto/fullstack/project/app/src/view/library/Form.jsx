export default function Form({children, className, ...props}) {
    return <>
        <form className={`flex flex-col gap-2 p-1 justify-around items-center rounded-lg ${className ? className : ''}`} {...props}>
            {children}
        </form>
    </>
}