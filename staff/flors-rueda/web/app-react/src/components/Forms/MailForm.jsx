import { context } from '../../context'
import { updateMail } from '../../logic/update-mail';
import './Form.css'

export default function MailForm({ onSaveClick, user}) {

  const handleSave = (event) => {
    event.preventDefault();
    try {
      const mail = event.target.mail.value;
      updateMail(mail, context.userAuth, error => {
        if(error){
          console.log(`update mail ${error.message}`);
          return;
        }
        onSaveClick();
      });
    } catch (error) {
      console.log(`update mail ${error.message}`);
    }
    //TODO update defautValue
  }
  return <article className="settings-form">
    <form onSubmit={handleSave}>
      <input className="settings-form--input" name="mail" required type="email" placeholder="your new mail" defaultValue={user.mail} />
      <div className="settings-form--save">
        <button type="submit" className="success">save</button>
      </div>
    </form>
  </article>
}