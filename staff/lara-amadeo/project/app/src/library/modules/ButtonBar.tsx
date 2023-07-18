import Button from '../components/Button'
import Link from '../components/Link'
import './ButtonBar.css'

type Props = {
    firstButton?: { label: string, onClick: (event: React.SyntheticEvent) => void },
    secondButton?: { label: string, onClick: (event: React.SyntheticEvent) => void },
    link?: { label: string, onClick: (event: React.SyntheticEvent) => void, icon?: JSX.Element }
}

export default function ButtonBar({ firstButton, secondButton, link }: Props): JSX.Element {

    return <>
        <div className='buttonbar-container'>
            {firstButton && <Button type={'primary'} size={'small'} label={firstButton.label} onClick={firstButton.onClick} />}
            {secondButton && <Button type={'primary'} size={'small'} label={secondButton.label} onClick={secondButton.onClick} />}
            {link && <Link label={link.label} state={'default'} onClick={link.onClick} icon={link.icon} />}
        </div>

    </>
}