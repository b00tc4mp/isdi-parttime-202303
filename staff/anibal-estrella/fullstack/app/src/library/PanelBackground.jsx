export default function PanelBackground({ children, tag: Tag = "div", className, type, ...props }) {
    console.debug(`///// PanelBackground -> render`)
    return <Tag className={`fixed top-0 left-0 flex flex-col w-screen h-screen z-10 backdrop-blur-md bg-gray-400/90 p-4 justify-center${className ? `${className} ` : ''}${type ? `Container--${type}` : ''}`} {...props}>
        {children}
    </Tag>
}
