import { context } from '../../context';
import { updatePassword } from '../../logic/update-password';
import './Form.css'

export default function PasswordForm({ onSaveClick }) {
  
  const handleSave = (event) => {
    event.preventDefault();
    try {
      const newPassword = event.target.password.value;
      const repeatPassword = event.target.repeatPassword.value;
      const oldPassword = event.target.oldPassword.value;
      updatePassword(context.userAuth, oldPassword, repeatPassword, newPassword, error => {
        if(error){
          console.log(`update password error: ${error.message}`);
          return;
        }
        onSaveClick();
      })
    } catch (error) {
      console.log(`update password error: ${error.message}`);
    }
  }
  
    return <article className="settings-form">
    <form onSubmit={handleSave}>
          <input className="settings-form--input" name="password" type="password" placeholder="your new password" required />
          <input className="settings-form--input" name="repeatPassword" type="password" placeholder="repeat your new password" required />
          <input className="settings-form--input" name="oldPassword" type="password" placeholder="your old password" required />
      <div className="settings-form--save">
      <button type="submit" className="success">save</button>
      </div>
    </form>
  </article>
}