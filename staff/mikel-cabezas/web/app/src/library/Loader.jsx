import './Loader.css'

export default function Loader() {
    return <>
    <div className="loader-container overlay">
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <h2>Loading...</h2>
    </div>
    </>
}