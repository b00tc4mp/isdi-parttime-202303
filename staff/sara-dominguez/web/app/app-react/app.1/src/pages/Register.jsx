export default function Register(props) {
    function handleLoginClick(event) {
        event.preventDefault()

        props.onLoginClick()
    }


    return <div className="register container">
        <h1>Register</h1>
        <form className="register-form">
            <input className="register-input" type='text' name='name' placeholder='name' />
            <input className="register-input" type='text' name='email' placeholder='email' />
            <input className="register-input" type='text' name='password' placeholder='password' />
            <button className="register-button" type="submit">Register</button>
        </form>
        <p className="register-text-goToLogin"><a href="" onClick={handleLoginClick}> Go to login</a></p>
    </div>

}