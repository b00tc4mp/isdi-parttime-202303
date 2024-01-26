import { context } from '../../ui';
import deleteUser from '../../logic/delete-user';
import './Form.css';
import inLogger from '../../inLogger';
import Context from '../../Context';
import { useContext } from 'react';

//TODO find why delete gives bad request

const DeleteForm = ({ onDeleteClick }) => {
  const { alert } = useContext(Context);

  const handleDelete = (event) => {
    event.preventDefault();
    try {
      const password = event.target.password.value;
      deleteUser(context.userAuth, password, error => {
        if (error) {
          alert(`delete user error: ${error.message}`, 'danger');
          return;
        }
        onDeleteClick();
        alert('We will miss you! We hope you comeback soon.', 'goodbye')
      })
    } catch (error) {
      alert(`delete user error: ${error.message}`, 'danger');
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

export default inLogger(DeleteForm)