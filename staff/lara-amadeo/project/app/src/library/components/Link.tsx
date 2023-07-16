import "./Link.css"
type Props = {
    label: string,
    state: string,
    onClick: () => void
}

export default function Link({ label, state, onClick, ...props }: Props): JSX.Element {

    return <>
        <p className={`body-text-bold pointer ${state === 'default' ? 'link-default' : 'link-critical'}`}{...props} onClick={onClick}>{label}</p>
    </>
}