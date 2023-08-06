import Button from '../components/Button'
import Link from '../components/Link'
import './ButtonBar.css'

type Props = {
    firstButton?: { label: string, onClick: (event: React.SyntheticEvent) => void },
    secondButton?: { label: string, onClick: (event: React.SyntheticEvent) => void },
    link?: { label: string, onClick: (event: React.SyntheticEvent) => void, icon?: JSX.Element },
    className?: string,
    children?: JSX.Element
}

export default function ButtonBar({ firstButton, secondButton, link, className, children }: Props): JSX.Element {

    return <>
        <div className={`buttonbar-container ${className}`} >
            {children}
            {firstButton && <Button type={'primary'} size={'small'} label={firstButton.label} onClick={firstButton.onClick} />}
            {secondButton && <Button type={'secondary'} size={'small'} label={secondButton.label} onClick={secondButton.onClick} />}
            {link && <Link label={link.label} state={'default'} onClick={link.onClick} icon={link.icon} />}
        </div>

    </>
}