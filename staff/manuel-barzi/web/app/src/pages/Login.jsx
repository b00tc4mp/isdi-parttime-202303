export default function Login(props) {
    function handleRegisterClick(event) {
        event.preventDefault()
  
        props.onRegisterClick()
    }
  
    return <div className="login page container">
        <h1 className="title">Login</h1>
  
        <form className="form">
            <input className="input" type="email" name="email" placeholder="email" />
            <input className="input" type="password" name="password" placeholder="password" />
            <button className="button" type="submit">Login</button>
        </form>
  
        <p>Go to <a href="" onClick={handleRegisterClick}>Register</a></p>
    </div>
  }