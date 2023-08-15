
export default function menuItem({ children, tag: Tag = "div", className, type, ...props }) {
    console.debug(`///// menuItem -> render`)
    return <li className="mb-4 sm:mb-0 sm:pr-2">
        <Tag className={`text-gray-400 transition duration-200 hover:text-red hover:ease-in-out focus:text-red disabled:text-gray-500/30 motion-reduce:transition-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400 sm:px-2 [&.active]:text-gray-500/90 dark:[&.active]:text-zinc-400 ${className ? `${className}` : ''} ${type ? `Container--${type}` : ''}`} {...props}>
            {children}
        </Tag>
    </li>
}