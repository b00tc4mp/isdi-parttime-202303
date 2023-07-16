import "./EmptyPhoto.css"
import React from "react"

type EmptyPhotoRef = React.Ref<HTMLImageElement>;

interface EmptyPhotoProps {
    id: string;
    src: string;
}

const EmptyPhoto = React.forwardRef<HTMLImageElement, EmptyPhotoProps>((props, ref) => {

    return <>
        <div className="empty-photo-container" {...props}>
            <img className="photo-container" id={props.id} ref={ref} src={props.src ? props.src : '../public/empty-photo.svg'}></img>
        </div>
    </>
})

export default EmptyPhoto