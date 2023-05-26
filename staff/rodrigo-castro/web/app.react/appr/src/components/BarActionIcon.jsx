export default function BarActionIcon({ actionOnClick, overallClass = '', iconClass, icon, textClass, text }) {
    return <>
        <li onClick={actionOnClick} className={`${overallClass}`}>
            <span className={`${iconClass}`}>{icon}</span>
            {text && <span className={`${textClass}`}>{text}</span>}
        </li>
    </>
}