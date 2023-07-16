import './Avatar.css'

type Props = {
    image: String,
    size: String
}

export default function Avatar({ image, size }: Props): JSX.Element {
    return <>
        <div className={`avatar-container `}>
            <img className={` ${size === 'small' && 'avatar-s'} ${size === 'medium' && 'avatar-m'} ${size === 'large' && 'avatar-l'}`} src={`${image}`}></img>
        </div>
    </>
}
