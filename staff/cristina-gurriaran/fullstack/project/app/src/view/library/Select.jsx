export default function Select({ className, ...props }) {
    return <select className={`w-full rounded-lg border-gray-dark p-4 pe-12 text-sm shadow-sm  ${className ? className : ''}`} {...props}>
    </select>
}

