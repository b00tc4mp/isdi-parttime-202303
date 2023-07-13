import "./TextField.css"

export default function TextField({ label, type, name, description, disabled, placeholder, ...props }) {

    return <>
        <div className={`text-field-container ${disabled && "disabled"}`}{...props}>
            <div className="label-clarification">
                <p className='body-text grey-700'>{label}</p>
                {description && <p className='small-text grey-500'>{description}</p>}
            </div>
            <input type={`${type}`} name={`${name}`} placeholder={placeholder && placeholder} className="input-field"></input>
        </div>
    </>
}