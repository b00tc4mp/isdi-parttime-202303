import updateEmployeeAvatar from '../logic/updateEmployeeAvatar'
import updateEmployeePassword from '../logic/updateEmployeePassword'
import updateEmployeeAdress from '../logic/updateEmployeeAdress'
import updateEmployeeBankAccountNumber from '../logic/updateEmployeeBankAccountNumber'

export default function PersonalInformationModal({ onEmployeeAvatarUpdated, onEmployeePasswordUpdated, onEmployeeAdressUpdated, onEmployeeBankAccountNumberUpdated }) {

    const handleUpdateAvatar = event => {
        event.preventDefault()

        const url = event.target.url.value

        try {

            updateEmployeeAvatar(url)

                .then(() => {

                    onEmployeeAvatarUpdated()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)

        }
    }
    const handleUpdatePassword = event => {
        event.preventDefault()

        const employeePassword = event.target.employeePassword.value
        const employeeNewPassword = event.target.employeeNewPassword.value
        const employeeNewPasswordConfirm = event.target.employeeNewPasswordConfirm.value

        try {

            updateEmployeePassword(employeePassword, employeeNewPassword, employeeNewPasswordConfirm)

                .then(() => {

                    onEmployeePasswordUpdated()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)

        }
    }

    const handleUpdateAdress = event => {
        event.preventDefault()

        const street = event.target.street.value
        const postalCode = event.target.postalCode.value
        const city = event.target.city.value
        const country = event.target.country.value

        try {
            updateEmployeeAdress(street, postalCode, city, country)

                .then(() => {

                    onEmployeeAdressUpdated()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleUpdateBankAccountNumber = event => {
        event.preventDefault()

        const bankAccountNumber = event.target.bankAccountNumber.value

        try {
            updateEmployeeBankAccountNumber(bankAccountNumber)

                .then(() => {

                    onEmployeeBankAccountNumberUpdated()
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return <section className="add-post">
        <div>
            <header>
                <h5>Sara FistName SecondName</h5>
                <h5>CEO</h5>
                <h5>Phone:698349859</h5>
                <h5>Email: sara.firstname@b-elevenzsd.com</h5>
                <h5>22-07-2023</h5>
                <h5>Barcelona</h5>
            </header>
            <main>
                <h4>Personal Information</h4>
                <h5>Update your avatar</h5>
                <form className="personalInformation-avatar-form" onSubmit={handleUpdateAvatar}>
                    <input className="input" type="url" name="url" />
                    <button className="button" type="submit">Update</button>
                </form>
                <h5>Update your password</h5>
                <form className="personalInformation-password-form" onSubmit={handleUpdatePassword}>
                    <input className="input" type="password" name="employeePassword" placeholder="Password" />
                    <input className="input" type="password" name="employeeNewPassword" placeholder="New password" />
                    <input className="input" type="password" name="employeeNewPasswordConfirm" placeholder="New password confirmation" />
                    <button className="button" type="submit">Update</button>
                </form>
                <h5>Update your adress</h5>
                <form className="personalInformation-adress-form" onSubmit={handleUpdateAdress}>
                    <input className="input" type="text" name="street" placeholder="Street" />
                    <input className="input" type="text" name="postalCode" placeholder="Postal code" />
                    <input className="input" type="text" name="city" placeholder="City " />
                    <input className="input" type="text" name="country" placeholder="Country" />
                    <button className="button" type="submit">Update</button>
                </form>
                <h5>Update your bank account</h5>
                <form className="personalInformation-bankAccountNumber-form" name="bankAccountNumber" onSubmit={handleUpdateBankAccountNumber} >
                    <input className="input" type="text" name="bankAccountNumber" placeholder="Bank Account Number" />
                    <button className="button" type="submit">Update</button>
                </form>
            </main>
            <footer>
                <h5 className="">Logout</h5>
            </footer>
        </div>
    </section>
}
