import "./DataItem.css"

export default function DataItem({ label, description, ...props }) {

    return <>
        <div className="data-item-container"{...props}>
            <p className="body-text data-item-label">{label}</p>
            <p className="body-text-bold data-item-description">{description}</p>
        </div>
    </>
}