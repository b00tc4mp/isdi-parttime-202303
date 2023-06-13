import { context } from '../../ui';
import updateMail from '../../logic/update-mail';
import './Form.css';
import inLogger from '../../inLogger';
import Context from '../../Context';
import { useContext } from 'react';

const MailForm = ({ onSaveClick, user }) => {
  const { alert } = useContext(Context);

  const handleSave = (event) => {
    event.preventDefault();
    try {
      const mail = event.target.mail.value;
      updateMail(mail, context.userAuth, error => {
        if (error) {
          alert(`update mail ${error.message}`, 'danger');
          return;
        }
        onSaveClick();
      });
    } catch (error) {
      alert(`update mail ${error.message}`, 'danger');
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
};

export default inLogger(MailForm)