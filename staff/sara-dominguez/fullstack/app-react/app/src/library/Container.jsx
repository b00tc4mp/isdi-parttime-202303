import './Container.css'

export default function Container({children, tag: Tag = "div", className, type, ...props}) {
    return <Tag className={`Container ${className? className: ''} ${type? `Container--${type}`: '' }`} {...props}>
        {children}

    </Tag>

}