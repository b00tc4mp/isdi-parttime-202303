export default function CheckboxContainer({ children, tag: Tag = "div", className, type, ...props }) {
    return (
        <div className={`className="flex rounded-lg p-4 bg-white shadow-md gap-4 w-full border-gray-light" ${className ? className : ''}`} {...props}>
            {children}
        </div>
    );
}

