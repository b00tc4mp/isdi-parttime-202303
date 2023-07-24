import "./Loader.css"

export default function Loader() {
    console.debug(`///// LOADER -> render`)

    return <div className="loader-container">
        <div className="loader">
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
        </div>
    </div>


}