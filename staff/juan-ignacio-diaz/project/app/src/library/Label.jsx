export default function Label({children, ...props}) {
    return <label className="py-2 px-2 rounded-lg italic font-sans text-left" {...props}>{children}</label>
}