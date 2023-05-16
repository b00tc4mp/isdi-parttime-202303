import { context } from '../../../../context'
import { retrieveUser } from '../../../../logic/retrieve-user'
import { updateName } from '../../../../logic/update-name';
import './Form.css'

export default function NameForm({ onSaveClick }) {
  
  const handleSave = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    updateName(name, context.userAuth);
    onSaveClick();
  }
    return <article className="settings-form">
    <form onSubmit={handleSave}>
          <input className="settings-form--input" name="name" type="text" placeholder="your new name" defaultValue={retrieveUser(context.userAuth).name}
                        maxLength="15" required />
      <div className="settings-form--save">
      <button type="submit">save</button>
      </div>
    </form>
  </article>
}