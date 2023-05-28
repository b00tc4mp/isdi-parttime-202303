export default function Profile(){

    console.log('Profile -> render')

    return <section className='profile container'>
    <h1 className= 'title'>Update avatar</h1>
    <form className='profile-avatar-form'>
        <input className='input' type='url' name='url'/>
        <button className='button update' type='submit'> Update</button>
    </form>

    <h1 className='title'>Update password</h1>
    
    <form className='profile-password-form'>
        <input className='input' type='password' name='password' placeholder='Old password*'/>
        <input className='input' type='password' name='newPassword' placeholder='New password*'/>
        <input className="input" type="password" name='newPasswordConfirm' placeholder='Confirm new password*'/>
        <button className='button update' type='submit'>Update</button>

    </form>
</section>
}