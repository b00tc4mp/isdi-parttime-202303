import "./IconButton.css"

export default function IconButton({ icon, type, ...props }) {

    return <>
        <div className={`icon-button-container pointer ${type === 'primary' && 'icn-button-primary'} ${type === 'secondary' && 'icn-button-secondary'} ${type === 'critical' && 'icn-button-critical'}`} {...props}>
            <div className={`icn-button-icon`}>{icon}</div>
        </div>
    </>
}