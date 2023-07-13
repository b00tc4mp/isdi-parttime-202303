import "./TextArea.css"

export default function TextArea({ label, name, description, disabled, placeholder, ...props }) {

    return <>
        <div className={`text-field-container ${disabled && "disabled"}`}{...props}>
            <div className="label-clarification">
                <p className='body-text grey-700'>{label}</p>
                {description && <p className='small-text grey-500'>{description}</p>}
            </div>
            <textarea type="text" name={`${name}`} placeholder={placeholder && placeholder} className="input-field-text-area"></textarea>
        </div>
    </>
}