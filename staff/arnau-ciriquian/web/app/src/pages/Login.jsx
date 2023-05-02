export default function Login(props) {
    function handleRegisterClick(event) {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <div className="login">
    <header className="main-tittle">
        <img className="main-logo" src="../images/PunIntendedMain.png" />
    </header>
    <div className="page">
        <h1 className="text">Login</h1>
        <form className="login__form">
            <div className="inputs__box">
                <input className="form__input" type="email" name="email" placeholder="email" />
                <div className="password-container">
                    <input className="form__input login__password" type="password" name="password" placeholder="password" />
                    <i className="login-eye fa-solid fa-eye"></i>
                </div>
            </div>
            <button className="form__button" type="submit">Login</button>
        </form>    
        <p className="text">Go to <a className="login__anchor--register" href="" onClick={handleRegisterClick}>Register</a></p>
    </div>
</div>
}