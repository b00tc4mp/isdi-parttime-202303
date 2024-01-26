import './Container.css'

export default function Container({ children, tag: Tag = "div", className, type, ...props }) {
    return <Tag className={`Container w-[1200px] h-[600px] bg-neutral-100 rounded-[15px] drop-shadow bg-neutral-200 bg-slate-200 ml- mr-10 flex flex-col  ${className ? className : ''} ${type ? `Container--${type}` : ''}`} {...props}>
        {children}

    </Tag>
}