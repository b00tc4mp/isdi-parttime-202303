export default function Register({ onLoginClick }) {
    function handleLoginClick(e) {
        e.preventDefault();

        onLoginClick()
    }

    console.log('Register -> render')

    return <div className="register page container">
        <h1 className="title">Register</h1>

        <form className="form">
            <input className="input" type="text" name="name" placeholder="name" />
            <input className="input" type="email" name="email" placeholder="email" />
            <input className="input" type="password" name="password" placeholder="password" />
            <button className="button" type="submit">Register</button>
        </form>

        <p>Go to <a href="" onClick={handleLoginClick}>Login</a></p>
    </div>
}