import "./Chip.css"

export default function Chip({ label, state, ...props }) {

    return <>
        <div className={`chip-container 
                ${state === "warning" && "chip-warning"}
                ${state === "success" && "chip-success"}
                ${state === "info" && "chip-info"}
                ${state === "critical" && "chip-critical"}
                ${state === "neutral" && "chip-neutral"}`}{...props}>
            <p className="small-text-bold chip-label">{label}</p>
        </div>
    </>
}