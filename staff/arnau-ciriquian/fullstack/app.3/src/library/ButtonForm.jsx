export default function ButtonForm({ children, className, ...props }) {
    return <button className={`text-black font-bold w-[100px] h-[40px] rounded-full bg-[var(--form-button-color)] ${className? className : ""}`} {...props}>
        {children}
    </button>
}