import './ModalWindow.css'

export default function ModalWindow({ children, tag:Tag = 'div', className, type, ...props }) {
  return <>
    <Tag className={`ModalWindow ${className} ${type ? `ModalWindow--${type}` : ''}`} {...props}>
      {children}
    </Tag>
  </>
}