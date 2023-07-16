import "./IconButton.css"
type Props = {
    icon: JSX.Element,
    type: String,
    onClick?: () => void
}

export default function IconButton({ icon, type, onClick, ...props }: Props): JSX.Element {

    return <>
        <div className={`icon-button-container pointer ${type === 'primary' && 'icn-button-primary'} ${type === 'secondary' && 'icn-button-secondary'} ${type === 'critical' && 'icn-button-critical'}`} onClick={onClick}{...props}>
            <div className={`icn-button-icon`}>{icon}</div>
        </div>
    </>
}