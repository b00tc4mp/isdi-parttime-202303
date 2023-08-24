export default function Container({children, tag: Tag = 'div', className, ...props}) {
    return <>
        <Tag className={`Container w-full h-full flex flex-col justify-center items-center ${className ? className : ''}`} {...props}>
            {children}
        </Tag>
    </>
}