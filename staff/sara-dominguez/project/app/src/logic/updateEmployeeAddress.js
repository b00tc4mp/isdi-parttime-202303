import { validators, errors } from 'com'
import context from './context'
const { validateAddress } = validators

/**
* Update an employee's address in the database.
*
* @param {string} employeeId - The ID of the employee to update.
* @param {string} employeeStreet - The new street address of the employee.
* @param {string} employeePostalCode - The new postal code of the employee's address.
* @param {string} employeeCity - The new city of the employee's address.
* @param {string} employeeCountry - The new country of the employee's address.
* 
* @returns {Promise} A promise that resolves to the result of updating the employee's address.
* 
* @throws {TypeError} On non-string employeeId or employeeNewAddress
* @throws {ContentError} On employeeId doesn't have 24 characters or not hexadecimal or invalid format for employeeNewAddress
* @throws {ExistenceError} Throws an error if the specified employee is not found in the database.
* @throws {PropertyError} Throws an error if the new address is the same as the current address.
*/

export default function updateEmployeeAddress(employeeStreet, employeePostalCode, employeeCity, employeeCountry) {
    const employeeNewAddress = `${employeeStreet}` + ' ' + `${employeePostalCode}` + ' ' + `${employeeCity}` + ' ' + `${employeeCountry}`
    validateAddress(employeeNewAddress)

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/employees/updateAddress`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${context.token}`
            },
            body: JSON.stringify({ employeeStreet, employeePostalCode, employeeCity, employeeCountry })
        })

        if (res.status === 204) {
            return
        } else {
            const { type, message } = await res.json()

            const clazz = errors[type]

            throw new clazz(message)
        }
    })()
}