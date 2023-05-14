import { context } from '../context';
import ProfileCard from './ProfileCard';


export default function Profile() {
  console.log('Profile -> render')

  try {
    return <ProfileCard userId={context.userAuth} />
  } catch (error) {
    alert(`posts error: ${error.message}`)
  }
}