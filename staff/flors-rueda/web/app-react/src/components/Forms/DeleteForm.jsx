import { context } from '../../context'
import { deleteUser } from '../../logic/deleteUser';
import './Form.css'

export default function DeleteForm({ onDeleteClick }) {

  const handleDelete = (event) => {
    event.preventDefault();
    try {
      const password = event.target.password.value;
      deleteUser(context.userAuth, password, error => {
        if(error){
          console.log(`delete user error: ${error.message}`);
          return;
        }
        onDeleteClick();
      })
    } catch (error) {
      console.log(`delete user error: ${error.message}`);
    }
  }

  return <article className="settings-form">
    <div className="delete-info"><b>!!</b> if you delete your account all your posts, favs and likes will be gonne forever...</div>
    <form onSubmit={handleDelete}>
    <input className="settings-form--input" name="password" type="password" placeholder="confirm with your password" required />
      <div className="settings-form--save">
        <button className="danger" type="submit">delete</button>
      </div>
    </form>
  </article>
}