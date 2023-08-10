import useStorage from '../hooks/useStorage'

const { setItem } = useStorage()

import { validateEmail, validatePassword } from '../com'

interface LoginUserProps {
  email: string
  password: string
}

export default function loginUser({
  email,
  password,
}: LoginUserProps): Promise<void> {
  validateEmail(email)
  validatePassword(password)

  return (async () => {
    const res = await fetch('http://localhost:3000/api/user/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (res.status === 200) {
      const token = await res.json()

      // context.token = token

      setItem('token', token, 'session')

      return
    }

    const { message } = await res.json()

    throw new Error(message)
  })()
}