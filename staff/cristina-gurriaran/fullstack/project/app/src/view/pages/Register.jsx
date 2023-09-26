import registerUser from '../../logic/registerUser'
import { useAppContext, useHandleErrors } from '../hooks'

export default function Register() {
    console.log('Register -> render')

    const { navigate } = useAppContext()
    const handleErrors = useHandleErrors()

    const handleRegister = (event) => {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        handleErrors(async () => {
            await registerUser(name, email, password)

            navigate('/login')
        })
    }

    return <div tag="main" className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-lg flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold sm:text-3xl"> Sign up</h1>

            <div className="flex flex-row gap-2">
                <h2 className="text-md text-grayl"> Already have an account?</h2>
                <a className="underline font-bold" href="/login">Log in</a>
            </div>
        </div>

        <form onSubmit={handleRegister} className="mx-auto mb-0 mt-8 max-w-md space-y-4" >
            <div className="relative">
                <input
                    className="w-full rounded-lg border-gray-light p-4 pe-12 text-sm shadow-sm"
                    type="name"
                    name="name"
                    placeholder="Name*"
                />
            </div>

            <div className="relative">
                <input
                    className="w-full rounded-lg border-gray-light p-4 pe-12 text-sm shadow-sm"
                    type="email"
                    name="email"
                    placeholder="Email address*"
                />
            </div>

            <div className="relative">
                <input
                    className="w-full rounded-lg border-gray-light p-4 pe-12 text-sm shadow-sm"
                    type="password"
                    name="password"
                    placeholder="Password (8+ characters)*"
                />
            </div>

            <button type="submit" className="block w-full rounded-lg bg-indigo-dark px-5 py-3 text-sm font-medium text-white"> Create an account </button>

        </form>
    </div>
}

