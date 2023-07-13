import "./DaySelector.css"

export default function DaySelector({ label, state, ...props }) {

    return <>
        <div className={`day-selector-container ${state === 'default' ? 'day-selector-default' : 'day-selector-selected'}`} {...props}>
            <p className={`tiny-text-bold ${state === 'default' ? 'day-selector-label-default' : 'day-selector-label-selected'}`}>{label}</p>
        </div>
    </>
}