import "./Container.css"

export default function Container({ children, width, height, type, elevation, ...props }) {

    return <>
        <div style={{ width: `${width}`, height: `${height}` }} className={`container-comp ${type === 'border' && 'container-border'}${type === 'shadow' && 'container-shadow'} ${elevation === '1' && 'elevation-1'} ${elevation === '2' && 'elevation-2'} ${elevation === '3' && 'elevation-3'} ${elevation === '4' && 'elevation-4'}`}{...props}>
            {children}
        </div>
    </>
}