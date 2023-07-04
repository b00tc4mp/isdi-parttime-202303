export default function Register(props) {
    function handleLogInClick(event){
        event.preventDefault()

        props.onLogInClick()
    }


    return <div className="registration">
    <div className="centered-containers">
        <h1 className="title">Welcome stranger!</h1>
        
        <form className="centered-form">

            <label htmlFor="username" className="text-field-label">Username</label>
            <input type="text" name="username" className="text-field" />

            <label htmlFor="email" className="text-field-label">Email</label>
            <input type="text" name="email" className="text-field" />

            <label htmlFor="password" className="text-field-label">Password</label>
            <input type="password" name="password" className="text-field" />

            <label htmlFor="rep-password" className="text-field-label">Repeat password</label>
            <input type="password" name="rep-password" className="text-field" />
            
            <button className="button-S primary-button" type="submit">Sign up</button>
        </form>
        
        <div className="already-account-container">
            <p className="already-account">Already have an account? <a href="" className="link" onClick = {handleLogInClick}>Log in</a></p>           
        </div>
    </div>
</div>
}