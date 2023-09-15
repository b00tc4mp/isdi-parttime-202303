export default function ModalWindow({ children, tag:Tag = 'div', className, type, ...props }) {
  return <>
    <Tag className={`ModalWindow flex flex-col justify-around items-center bg-white p-3 rounded-lg w-96 h-72 ${className ? className : ''} ${type ? `ModalWindow--${type}` : ''}`} {...props}>
      {children}
    </Tag>
  </>
}