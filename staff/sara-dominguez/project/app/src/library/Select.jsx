export default function Select({ className, ...props }) {
    return <select className={`block w-3/6 h-5/6 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 drop-shadow-md text-center bg-neutral-50 ${className ? className : ''}`} {...props}>
    </select>
}