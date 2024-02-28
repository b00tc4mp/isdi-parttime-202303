export default function PanelBackgroundCloseClose({ children, tag: Tag = "div", className, type, ...props }) {
    console.debug(`///// PanelBackgroundClose -> render`)
    return <Tag id='Panel-Background-Close' className={` bg-gray-400/80 fixed top-0 left-0 w-full h-full cursor-pointer backdrop-blur-lg z-20 p-8 center-xy ${className ? `${className} ` : ''}${type ? `Container--${type}` : ''}`} {...props} >
        {children}
    </Tag>
}

