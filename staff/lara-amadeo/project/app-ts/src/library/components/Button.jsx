import "./Button.css"
export default function Button({ type, size, icon, label, ...props }) {

    return <>
        <button type="submit" className={`
            ${size === "small" && "button-container-small"}
            ${size === "extrasmall" && "button-container-extrasmall"}
            ${size === "medium" && "button-container-medium"}
            ${type === "primary" && "primary"}
            ${type === "secondary" && "secondary"}
            ${type === "critical" && "critical"}`} {...props}>
            {icon && <p className="body-text-bold">i</p>}
            <p className={`body-text-bold ${type === "critical" ? "label-critical" : "label"}`}>{label}</p>
        </button>
    </>
}