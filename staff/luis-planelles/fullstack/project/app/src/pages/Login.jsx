import loginUser from '../logic/loginUser';

const Login = () => {
  
  const handleLogin = (event) => {
    event.preventDefault()
    
    const email = event.target.email.value,
    password = event.target.password.value;

    try {
      loginUser(email, password)
      .then(() => navigate('/'))
      .catch((error) => alert(error.message))

    }catch (error) {
      alert(error.message)
    }
  };

  return (
    <div className="login page container">
      <h1 className="title">Login</h1>

      <form className="form" onSubmit={handleLogin}>
        <input className="input" type="email" name="email" placeholder="email"/>
        <input className="input" type="password" name="password" placeholder="password"/>
        <button className="button"type="submit"> Login </button>
      </form>
      
    </div>
  );
}

export default Login 