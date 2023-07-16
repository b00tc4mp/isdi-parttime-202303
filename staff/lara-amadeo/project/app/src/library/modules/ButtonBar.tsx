import Button from '../components/Button'
import Link from '../components/Link'
import './ButtonBar.css'

type Props = {
    firstButton?: { label: string, onclick: () => void },
    secondButton?: { label: string, onclick: () => void },
    link?: { label: string, onclick: () => void }
}

export default function ButtonBar({ firstButton, secondButton, link }: Props): JSX.Element {

    return <>
        <div className='buttonbar-container'>
            {firstButton && <Button type={'primary'} size={'small'} label={firstButton.label} onClick={firstButton.onclick} />}
            {secondButton && <Button type={'primary'} size={'small'} label={secondButton.label} onClick={secondButton.onclick} />}
            {link && <Link label={link.label} state={'default'} onClick={link.onclick} />}
        </div>

    </>
}