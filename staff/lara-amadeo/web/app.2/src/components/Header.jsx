import './Header.css'

export default function Header({onPrimaryButton, onSecondaryButton, title, primaryButtonText, secondaryButtonText }){

    const handlePrimaryButton = () => {
       onPrimaryButton()
    }

    const handleSecondaryButton = () => {
        onSecondaryButton()
    }

    return  <div className="header">
    <p className="heading-M-bold">{title}</p>
    {primaryButtonText && <button className="button-S primary-button" onClick={handlePrimaryButton}>{primaryButtonText}</button>}
    {secondaryButtonText && <button className="button-S secondary-button" onClick={handleSecondaryButton}>{secondaryButtonText}</button>}
    </div>
}