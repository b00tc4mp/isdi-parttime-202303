import './Avatar.css'

export default function Avatar({ image, size }) {
    return <>
        <div className={`avatar-container `}>
            <img className={` ${size === 'small' && 'avatar-s'} ${size === 'medium' && 'avatar-m'} ${size === 'large' && 'avatar-l'}`} src={`${image}`}></img>
        </div>
    </>
}
