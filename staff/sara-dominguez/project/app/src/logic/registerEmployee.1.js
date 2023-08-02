// import context from './context'

export default (name, firstSurname, secondSurname, birthDate, idCardNumber, tssNumber, adress, personalPhoneNumber, bankAccountNumber, avatar, employeeNumber, startOfEmploymentData, endOfEmploymentData, lengthOfEmployment, typeOfContract, jobPosition, department, salaryLevel, centerAttached, superiorHierachicalManager, roll, professionalPhoneNumber, professionalEmail, accessPermissions, employeePasssword) => {
    return fetch(`${import.meta.env.VITE_API_URL}/employees`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, firstSurname, secondSurname, birthDate, idCardNumber, tssNumber, adress, personalPhoneNumber, bankAccountNumber, avatar, employeeNumber, startOfEmploymentData, endOfEmploymentData, lengthOfEmployment, typeOfContract, jobPosition, department, salaryLevel, centerAttached, superiorHierachicalManager, roll, professionalPhoneNumber, professionalEmail, accessPermissions, employeePasssword })
    })
        .then(res => {
            if (res.status === 201)
                return
            return res.json()
                .then(({ error: message }) => { throw new Error(message) })
        })
}