import './Container.css'

export default function Container({ children, tag: Tag = "div", type, className, ...props }) {
    return <Tag className={`container ${className ? className : ''} ${type ? `container--${type}` : ''}`} {...props}>
        {children}
    </Tag>
}