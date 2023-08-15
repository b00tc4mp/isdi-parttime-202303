import './Container.css'

export default function Container({ children, tag: Tag = "div", className, type, ...props }) {
    return <Tag className={`Container className="personalInformation w-[600px] h-[706px] bg-neutral-100 rounded-[7px] shadow bg-neutral-200 bg-white ${className ? className : ''} ${type ? `Container--${type}` : ''}`} {...props}>
        {children}

    </Tag>

}