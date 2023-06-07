import './Header.css'

export default function Header({onPrimaryButton, onSecondaryButton, title, primaryButtonText, secondaryButtonText }){

    const handlePrimaryButton = () => {
       onPrimaryButton()
    }

    const handleSecondaryButton = () => {
        onSecondaryButton()
    }

    return  <div className="flex justify-between w-full pb-[16px] border-b border-[--grey-100] mb-[32px]">
    <p className="text-[--grey-700] text-3xl font-medium h-fit m-0">{title}</p>
    {primaryButtonText && <button className="button-S primary-button" onClick={handlePrimaryButton}>{primaryButtonText}</button>}
    {secondaryButtonText && <button className="button-S secondary-button" onClick={handleSecondaryButton}>{secondaryButtonText}</button>}
    </div>
}