import "./EmptyState.css"

type Props = {
    src: string,
    title: string,
    description: string
}

export default function EmptyState({ src, title, description }: Props) {

    return <>
        <img className='illustration-gif' src={src} style={{ marginBottom: '-32px' }}></img>
        <p className='heading-s' style={{ textAlign: 'center' }}>{title}</p>
        <p className='body-text grey-700' style={{ marginBottom: '16px', marginTop: '8px', textAlign: 'center', width: '90%' }}>{description}</p>
    </>
}
