// export default function Form({ children, ...props }) {
//     return <form className="flex flex-col gap-2 w-full sm:w-auto" {...props}>
//         {children}
//     </form>
// }

export default function Form({ children, ...props }) {
    return <form {...props}>
        {children}
    </form>
}