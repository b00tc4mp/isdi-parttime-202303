"use client";

import { FormEvent } from 'react'
import { login } from '@/utils';
import useStorage from '@/hooks/useStorage';
import { useRouter } from 'next/navigation'

const Login = () => {
    const { setItem, getItem } = useStorage();
    const router=useRouter();
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const target = event.target as typeof event.target & {
            email: { value: string }
            password: { value: string }
        }

        const email = target.email.value;
        const password = target.password.value;
        //console.log(`${title} ${name} ${email} ${message}`);

       const token = await login(email, password);
       setItem('token',token);
       console.log(getItem('token'));
       router.push('/home');
       
    }
    return (
        <div className="max-w-[1440px] w-full flex flex-col">
            <div className="flex flex-col content-center">
                <h1 className="font-bold justify-self-center text-2xl p-4 bg-blue-100">Login</h1>
                <div className='p-8 justify-center items-center h-fit w-auto flex'>
                    <form className='flex flex-col gap-6 w-full justify-center justify-items-center' onSubmit={onSubmit}>
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 email' id='email' type='email' aria-label='email' placeholder='Email' />
                        <input className='bg-gray-200 shadow-inner rounded-l p-2 flex-1 password' id='password' type='password' aria-label='password' placeholder='Password' />
                        <button className='bg-slate-700 hover:bg-blue-100 duration-300 text-white hover:text-black shadow p-2 rounded-md sm:w-52' type='submit'>
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
