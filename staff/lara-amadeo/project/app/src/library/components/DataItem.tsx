import "./DataItem.css"

type Props = {
    label: string
    description: String
}

export default function DataItem({ label, description, ...props }: Props): JSX.Element {

    return <>
        <div className="data-item-container"{...props}>
            <p className="body-text data-item-label">{label}</p>
            <p className="body-text-bold data-item-description">{description}</p>
        </div>
    </>
}