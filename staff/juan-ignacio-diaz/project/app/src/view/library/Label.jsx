export default function Label({children, ...props}) {
    return <label className="py-1 px-1 rounded-lg italic font-sans text-left" {...props}>{children}</label>
}