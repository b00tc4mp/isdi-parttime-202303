import { useEffect, useState } from 'react'
import context from '../logic/context'
import { utils } from 'com'
import retrieveEmployee from '../logic/retrieveEmployee'
import useAppContext from '../hooks/useAppContext'
const { extractSubFromToken } = utils

export default function Header() {
    console.log('rendering Header')

    const [employee, setEmployee] = useState()

    const { alert } = useAppContext()

    useEffect(() => {
        async function fetchEmployee() {
            try {
                const employeeId = extractSubFromToken(context.token)

                const employee = await retrieveEmployee(employeeId)

                setEmployee(employee)
            } catch (error) {
                alert(error.message)
            }
        }
        fetchEmployee()
    }, [])

    const { name, firstSurname, secondSurname, professionalPhoneNumber, professionalEmail, centerAttached } = employee || {}

    return <header style={{ backgroundColor: '#808080', color: '#ffffff' }}>
        {employee ? (
            <>
                <h4 className="text-xl font-bold">{name} {firstSurname} {secondSurname}</h4>

                <h4>{professionalPhoneNumber}</h4>
                <h4> {professionalEmail}</h4>
                <h4>{centerAttached}</h4>
            </>
        ) : (
            <h4>Loading...</h4> // 
        )}
        {/* /*ç<h4>{firstSurname}</h4>
<h4>{secondSurname}</h4> */}

    </header>
}