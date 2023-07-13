import "./Spinner.css"

export default function Spinner({ size, ...props }) {

    return <>
        <div className={`${size === 'small' && 'custom-loader-small'} ${size === 'medium' && 'custom-loader-medium'}`}></div>
    </>
}