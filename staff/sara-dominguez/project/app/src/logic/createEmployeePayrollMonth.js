


export default function createEmployeePayrollMonth(employeeId, payrollYear, payrollMonth) {
    //TODO validators and errors
    // validateEmployeeNumber(employeeNumber)
    // validateEmployeePassword(employeePassword)

    return fetch(`${import.meta.env.VITE_API_URL}/payrollMonths`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ employeeId, payrollYear, payrollMonth })
    })
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else
                return res.json()
                    .then(({ error: message }) => { throw new Error(message) })
            // .then(body => {
            //     throw new Error(body.error)
            // })
        })
}