export default function Button({ children, tag: Tag = "button", className, ...props }) {
    console.debug(`///// Button -> render`)
    return <Tag className={` bg-white tracking-tight text-gray-400 text-xs uppercase rounded-full min-w-max h-12  px-4 hover:drop-shadow-lg hover:opacity-75 active:drop-shadow-none active:bg-lime-200 focus:outline-none  ${className ? `${className} ` : ''}`} {...props}>
        {children}
    </Tag>
}