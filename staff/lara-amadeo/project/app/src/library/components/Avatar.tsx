import './Avatar.css'

type Props = {
    image: String,
    width: String
}

export default function Avatar({ image, width }: Props): JSX.Element {
    return <>
        <div className={`avatar-container `}>
            <img className="avatar-img" style={{ width: `${width}`, height: `${width}` }} src={`${image}`}></img>
        </div>
    </>
}
