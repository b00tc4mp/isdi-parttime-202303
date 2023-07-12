import './ModalContainer.css'

export default function ModalContainer({ children, tag: Tag = "div", className, type, ...props }) {
  return <>
  <Tag className={`ModalContainer w-screen h-screen flex flex-col justify-center items-center ${className? className : ''} ${type ? `ModalContainer--${type}` : ''}`} {...props}>
    {children}
  </Tag>
  </>
}