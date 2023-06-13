import { context } from '../../ui';
import updateName from '../../logic/update-name';
import './Form.css';
import inLogger from '../../inLogger';
import Context from '../../Context';
import { useContext } from 'react';

const NameForm = ({ onSaveClick, user }) => {
  const { alert } = useContext(Context);

  const handleSave = (event) => {
    event.preventDefault();
    try {
      const name = event.target.name.value;
      updateName(name, context.userAuth, error => {
        if (error) {
          alert(`update name ${error.message}`, 'danger');
          return;
        }
        onSaveClick();
      });
    } catch (error) {
      alert(`update name ${error.message}`, 'danger');
    }
    //TODO update defautValue
  }
  return <article className="settings-form">
    <form onSubmit={handleSave}>
      <input className="settings-form--input" name="name" type="text" placeholder="your new name" defaultValue={user.name} maxLength="15" required />
      <div className="settings-form--save">
        <button type="submit" className="success">save</button>
      </div>
    </form>
  </article>
}

export default inLogger(NameForm)