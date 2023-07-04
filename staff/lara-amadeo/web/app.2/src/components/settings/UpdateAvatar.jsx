import { updateAvatar } from '../../logic/updateAvatar'
import { context, generateToast, successToast, errorToast } from '../../ui'


export default function UpdateAvatar(props){

    function onCancel(event){
        event.preventDefault()

        props.onCancelUpdateAvatarClick()
    }

    function handleUpdateAvatar(event){
        event.preventDefault()

        const imageUrl = event.target.avatar.value
        try{
            updateAvatar(context.userId, imageUrl, (error) => {
                if(error){
                    generateToast({
                        message: error.message,
                        type: errorToast
                    })
                    return
                }
                context.userAvatar = imageUrl
                
                props.onSaveUpdateAvatarClick()

                generateToast({
                    message: 'Avatar updated!',
                    type: successToast
                })
            })

        } catch(error){
            generateToast({
                message: error.message,
                type: errorToast
            })
        }
    }
    
    return <div className="update-avatar">
            
    <div className="centered-containers">
        <h1 className="title">Profile settings</h1>
        <h2 className="subtitle">Avatar update</h2>
    
        <form className="centered-form" onSubmit={handleUpdateAvatar}>

            <label htmlFor='avatar' className="avatar text-field-label">Select an image url for your avatar</label>
            <input type="text" className='text-field' name="avatar"/>
            {/* <div className="update-avatar-image-preview-container">
            <img src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=" className="update-avatar-image-preview"/>
            </div> */}

            <div className="button-bar">
            <button className="button-S secondary-button" id="cancel-update-avatar" type="button" onClick={onCancel}>Cancel</button>
            <button className="button-S primary-button" id="save-update-avatar" type="submit">Save</button>
            </div>
        </form>
    </div>
</div>
}