import updateEmployeeAvatar from '../logic/updateEmployeeAvatar'

export default function PersonalInformationModal({ onEmployeeAvatarUpdated }) {

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
                <form className="personalInformation-password-form">
                    <input className="input" type="password" name="password" placeholder="Password" />
                    <input className="input" type="password" name="newPassword" placeholder="New password" />
                    <input className="input" type="password" name="newPasswordConfirm" placeholder="New password confirmation" />
                    <button className="button" type="submit">Update</button>
                </form>
                <h5>Update your adress</h5>
                <form className="personalInformation-adress-form">
                    <input className="input" type="text" name="street" placeholder="Street" />
                    <input className="input" type="text" name="postalCode" placeholder="Postal code" />
                    <input className="input" type="text" name="city" placeholder="City " />
                    <input className="input" type="text" name="country" placeholder="Country" />
                    <button className="button" type="submit">Update</button>
                </form>
                <h5>Update your bank account</h5>
                <form className="personalInformation-bankAccountNumber-form" >
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
