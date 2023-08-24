import './Logo.css'

export default function Logo(): JSX.Element {

    return <>
        <div className='logo-container'>
            <img src="/logo.svg"></img>
            <p className='logo-label grey-700'>Yuper</p>
        </div>

    </>
}