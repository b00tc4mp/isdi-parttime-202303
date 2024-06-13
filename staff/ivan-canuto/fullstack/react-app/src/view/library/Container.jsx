export default function Container({ children, tag: Tag = "div", className, type, ...props }) {
  return <>
  <Tag className={`Container w-screen h-screen flex flex-col justify-center items-center ${type ? `Container--${type}` : ''}`} {...props}>
    {children}
  </Tag>
  </>
}