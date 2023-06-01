export default function Button({children, className, ...props}) {
    return <button className={`py-2 px-2 rounded-lg bg-[var(--primary)] text-white border-none ${className? className : ''}`} {...props}>{children}</button>
}