import loginUser from '../../logic/loginUser'
import { useAppContext, useHandleErrors } from '../hooks'

export default function Login() {
    console.debug('Login -> render')

    const { navigate } = useAppContext()

    const handleErrors = useHandleErrors()

    const handleLogin = event => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        handleErrors(async () => {
            await loginUser(email, password)

            navigate('/')
        })
    }

    return <div tag="main" className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-lg flex flex-col items-center gap-2">
            <h1 className="text-2xl font-bold sm:text-3xl"> Welcome</h1>

            <div className="flex flex-row gap-2">
                <h2 className="text-md text-gray"> New to RoamDesk?</h2>
                <a className="underline font-bold" href="/register">Sign up</a>
            </div>
        </div>

        <form onSubmit={handleLogin} className="mx-auto mb-0 mt-8 max-w-md space-y-4" >

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

            <button type="submit" className="block w-full rounded-lg bg-indigo-dark px-5 py-3 text-sm font-medium text-white"> Log in </button>

        </form>
    </div>

    // return (
    //     <div className="flex flex-row gap-4 justify-center">
    //         <div className="border indigo-dark w-40 h-40 flex flex-row gap-10">
    //             <div className="bg-indigo-light w-5 h-10"></div>
    //             <div className="bg-indigo-light w-5 h-10"></div>
    //             <div className="bg-indigo-light w-5 h-10"></div>
    //             <div className="bg-indigo-light w-5 h-10"></div>

    //         </div>
    //         <div className="border indigo-dark w-40 h-40"></div>
    //         <div className="border indigo-dark w-40 h-40"></div>
    //         <div className="border indigo-dark w-40 h-40"></div>            
    //     </div>
    // )
}
