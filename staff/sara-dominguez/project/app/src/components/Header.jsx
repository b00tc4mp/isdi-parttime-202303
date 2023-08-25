import { useEffect, useState } from 'react'
import context from '../logic/context'
import { utils } from 'com'
import retrieveEmployeeLogged from '../logic/retrieveEmployeeLogged'
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

                const employee = await retrieveEmployeeLogged(employeeId)

                setEmployee(employee)
            } catch (error) {
                alert(error.message)
            }
        }
        fetchEmployee()
    }, [])

    const { name, firstSurname, secondSurname, professionalPhoneNumber, professionalEmail, centerAttached } = employee || {}

    return <header className="bg-amber-500 pt-1 pb-1 rounded-t-lg mb-3">
        {employee ? (
            <>
                <div className="bg-amber-500 ml-4">
                    <h4 className="text-ml font-bold">{name} {firstSurname} {secondSurname}</h4>
                    <h4 className="text-xs font">Email: {professionalEmail}</h4>
                    <h4 className="text-xs font">Mobile Phone:{professionalPhoneNumber}</h4>
                    <h4 className="text-xs font">Center Attached: {centerAttached}</h4>
                </div>
            </>
        ) : (
            <h4>Loading...</h4> // 
        )}
    </header>
}