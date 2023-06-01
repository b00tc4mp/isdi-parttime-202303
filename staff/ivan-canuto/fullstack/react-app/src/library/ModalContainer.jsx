import './ModalContainer.css'

export default function ModalContainer({ children, tag: Tag = "div", className, type, ...props }) {
  return <>
  <Tag className={`ModalContainer ${className} ${type ? `ModalContainer--${type}` : ''}`} {...props}>
    {children}
  </Tag>
  </>
}