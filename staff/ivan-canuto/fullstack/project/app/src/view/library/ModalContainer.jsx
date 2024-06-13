export default function ModalContainer({children, tag: Tag = 'div', className, ...props}) {
    return <>
        <Tag className={`ModalContainer w-screen h-screen flex flex-col justify-center items-center ${className ? className : ''}`} {...props}>
            {children}
        </Tag>
    </>
}