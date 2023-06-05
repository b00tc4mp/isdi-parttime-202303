export default function TextArea(children, className, ...props) {
  return <textarea className={`w-full h-40 ${className}`} {...props}>{children}</textarea>
}