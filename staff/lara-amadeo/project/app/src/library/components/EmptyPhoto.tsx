import "./EmptyPhoto.css"

export default function EmptyPhoto({ ...props }): JSX.Element {

    return <>
        <div className="empty-photo-container" {...props}>
            <img src="../public/empty-photo.svg"></img>
        </div>
    </>
}