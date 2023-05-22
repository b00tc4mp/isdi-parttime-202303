import { context } from '../../context'
import { updateName } from '../../logic/update-name';
import './Form.css'

export default function NameForm({ onSaveClick, user}) {
  
  const handleSave = (event) => {
    event.preventDefault();
    try {
      const name = event.target.name.value;
      updateName(name, context.userAuth, error => {
        if(error) {
          console.log(`update name ${error.message}`);
          return;
        }
        onSaveClick();
      });
    } catch (error) {
      console.log(`update name ${error.message}`);
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