import './Header.css'

export default function Header({ text }) {

    return <>
        <div className='header-container'>
            <p className='title header-label grey-700'>{text}</p>
        </div>

    </>
}