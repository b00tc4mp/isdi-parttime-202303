export default function Container({ children, tag: Tag = "div", className, type, ...props }) {
    return (
        <Tag className={`mx-auto flex flex-col w-max gap-4 m-20 ${className ? className : ''} ${type ? `Container--${type}` : ''}`} {...props}>
            {children}
        </Tag>
    );
}


