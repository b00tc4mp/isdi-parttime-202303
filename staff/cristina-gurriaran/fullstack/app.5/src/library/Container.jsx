
export default function Container({ children, tag: Tag = "div", ...props }) {
    return <Tag className="min-w-fit flex flex-col bg-[var(--pink)] py-2 px-2 rounded-lg grid justify-items-center gap-2"
    {...props}>
        {children}
    </Tag>
}