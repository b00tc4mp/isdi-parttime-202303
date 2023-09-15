export default function ModalWindow({children, tag: Tag = 'div', className, ...props}) {
    return <>
        <Tag className={`ModalWindow flex flex-col justify-around items-center bg-white p-3 rounded-lg ${className ? className : ''}`} {...props}>
            {children}
        </Tag>
    </>
}