import inLogger from '../../inLogger';

const PasswordForm = ({ onUpdatePassword, formRef }) => {
    const handlePasswordChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue < 8) {
            event.target.setCustomValidity('This password is too short.');
        } else {
            event.target.setCustomValidity('');
        }
        event.target.reportValidity();
    };

    return (
        <div className="w-full bg-secondary600 rounded-lg shadow mt-5 sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-primary100 md:text-2xl">
                    Change your password
                </h1>
                <form className="space-y-4 md:space-y-6" action="POST" ref={formRef}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-secondary100">
                            New password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            minLength={8}
                            className="bg-light500 border border-light100 text-secondary200 sm:text-sm rounded-lg focus:outline-none focus:ring-secondary300 focus:border-secondary300 block w-full p-2.5"
                            required={true}
                            onChange={handlePasswordChange}
                        />
                        <input
                            type="password"
                            name="repeatPassword"
                            id="repeatPassword"
                            minLength={8}
                            placeholder="confirm your password"
                            className="bg-light500 border border-light100 text-secondary200 sm:text-sm rounded-lg focus:outline-none focus:ring-secondary300 focus:border-secondary300 block w-full p-2.5"
                            required={true}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="oldPassword" className="block mb-1 text-sm font-medium text-secondary100">
                            Confirm with your old password
                        </label>
                        <input
                            type="password"
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="••••••••"
                            minLength={8}
                            className="bg-light500 border border-light100 text-secondary200 sm:text-sm rounded-lg focus:outline-none focus:ring-secondary300 focus:border-secondary300 block w-full p-2.5"
                            required={true}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full text-primary100 bg-light500 hover:bg-light400 focus:ring-4 focus:outline-none focus:ring-primary300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={(event) => onUpdatePassword(event)}
                    >
                        Change password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default inLogger(PasswordForm);


