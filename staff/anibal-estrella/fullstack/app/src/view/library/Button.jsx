export default function Button({ children, tag: Tag = "button", className, ...props }) {
    console.debug(`///// Button -> render`)
    return <Tag className={`my-6 rounded-full w-max px-6 py-3 text-sm tracking-widest uppercase text-white drop-shadow-sm bg-gradient-to-l from-blue_dark to-red hover:drop-shadow-lg hover:bg-gradient-to-r active:drop-shadow-none active:bg-none active:bg-red focus:outline-none  ${className ? `${className} ` : ''}`} {...props}>
        {children}
    </Tag>
}