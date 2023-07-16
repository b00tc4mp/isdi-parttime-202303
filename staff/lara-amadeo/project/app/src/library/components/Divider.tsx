import "./Divider.css"
type Props = {
    width: string
}

export default function Divider({ width }: Props): JSX.Element {

    return <>
        <div style={{ width: `${width}` }} className="divider-container"></div>
    </>
}