import './Container.css'

export default function Container({ children, className, type, ...props }) {
  return <>
  <section className={`Container ${className} ${type ? `Container--${type}` : ''}`} {...props}>
    {children}
  </section>
  </>
}