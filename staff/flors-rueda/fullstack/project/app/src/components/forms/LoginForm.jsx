import inLogger from '../../inLogger';


const LoginForm = ({ onRegister, onLoginUser, formRef }) => {
    const onRegisterClick = (event) => {
        event.preventDefault();
        onRegister();
    };

    const handleUsernameChange = (event) => {
        const inputValue = event.target.value;
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;

        if (!alphanumericRegex.test(inputValue)) {
            event.target.setCustomValidity('Only letters and numbers are allowed.');
        } else {
            event.target.setCustomValidity('');
        }
    };



    return (
        <div className="w-full bg-secondary600 rounded-lg shadow mt-5 sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-primary100 md:text-2xl">
                    Login
                </h1>
                <form className="space-y-4 md:space-y-6" action="POST" ref={formRef}>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-secondary100">
                            Your username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="bg-light500 border border-light100 text-secondary200 sm:text-sm rounded-lg focus:outline-none focus:ring-secondary300 focus:border-secondary300 block w-full p-2.5"
                            placeholder="UserName123"
                            required={true}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-secondary100">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            className="bg-light500 border border-light100 text-secondary200 sm:text-sm rounded-lg focus:outline-none focus:ring-secondary300 focus:border-secondary300 block w-full p-2.5"
                            required={true}
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full text-primary100 bg-light500 hover:bg-light400 focus:ring-4 focus:outline-none focus:ring-primary300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={(event) => onLoginUser(event)}
                    >
                        Sign in
                    </button>
                    <p className="text-sm text-secondary300">
                        You are new here?
                        <button onClick={onRegisterClick} className="font-medium text-primary200 hover:underline pl-2">
                            Register now!
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default inLogger(LoginForm);
