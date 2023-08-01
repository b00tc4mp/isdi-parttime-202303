import "./TextField.css"

type Props = {
    label: string,
    type: string,
    name: string,
    description?: string,
    disabled?: boolean,
    placeholder?: string,
    value?: string
}
export default function TextField({ label, type, name, description, disabled, placeholder, value, ...props }: Props): JSX.Element {

    return <>
        <div className={`text-field-container ${disabled && "disabled"}`}{...props}>
            <div className="label-clarification">
                <p className='body-text grey-700'>{label}</p>
                {description && <p className='small-text grey-500'>{description}</p>}
            </div>
            <input type={`${type}`} name={`${name}`} placeholder={placeholder && placeholder} defaultValue={value} className="input-field"></input>
        </div>
    </>
}