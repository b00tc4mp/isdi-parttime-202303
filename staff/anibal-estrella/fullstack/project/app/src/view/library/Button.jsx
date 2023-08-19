export default function Button({ children, tag: Tag = "button", className, ...props }) {
    console.debug(`///// Button -> render`)
    return <Tag className={` mt-2 bg-white tracking-tight text-gray-400 text-xs uppercase rounded-full min-w-[6rem] h-10  px-6 hover:drop-shadow-lg hover:opacity-75 active:drop-shadow-none active:bg-lime-200 ${className ? `${className} ` : ''}`} {...props}>
        {children}
    </Tag>
}