import ProfileCard from './ProfileCard';
import './Profile.css'
import Posts from '../Posts/Posts';


export default function Profile(userId) {
  console.log('Profile -> render')

  try {
    return <section className="user-profile">
      <ProfileCard userId={userId} />
      <Posts type={userId} />
    </section>
    
    
  } catch (error) {
    alert(`posts error: ${error.message}`)
  }
}