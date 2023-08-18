export default function Container({ children, tag: Tag = "div", className, type, ...props }) {
    return (
        <Tag className={`flex flex-col w-max m-8 gap-4 ${className ? className : ''} ${type ? `Container--${type}` : ''}`} {...props}>
            {children}
        </Tag>
    );
}


