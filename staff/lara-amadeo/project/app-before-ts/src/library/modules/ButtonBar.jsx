import Button from '../components/Button'
import Link from '../components/Link'
import './ButtonBar.css'

export default function ButtonBar({ firstButton, secondButton, link }) {

    return <>
        <div className='buttonbar-container'>
            {firstButton && <Button type={'primary'} size={'small'} label={firstButton.label} onClick={firstButton.onClick} />}
            {secondButton && <Button type={'primary'} size={'small'} label={secondButton.label} onClick={secondButton.onClick} />}
            {link && <Link label={link.label} state={'default'} onClick={link.onClick} />}
        </div>

    </>
}