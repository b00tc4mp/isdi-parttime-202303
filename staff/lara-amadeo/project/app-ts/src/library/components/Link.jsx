import "./Link.css"

export default function Link({ label, state, ...props }) {

    return <>
        <p className={`body-text-bold pointer ${state === 'default' ? 'link-default' : 'link-critical'}`}{...props}>{label}</p>
    </>
}