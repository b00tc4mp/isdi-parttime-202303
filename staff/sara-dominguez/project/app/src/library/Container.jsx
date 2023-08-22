import './Container.css'

export default function Container({ children, tag: Tag = "div", className, type, ...props }) {
    return <Tag className={`Container className="personalInformation w-[1300px] h-[560px] bg-neutral-100 rounded-[15px] shadow bg-neutral-200 bg-slate-200 ml-12 mr-5 flex flex-col  ${className ? className : ''} ${type ? `Container--${type}` : ''}`} {...props}>
        {children}

    </Tag>
}