export default function AddPostModal ({onCancel}){
    console.log('AddPostModal')

    function handleCancel (event) {
        event.preventDefault()

        onCancel()
    }

    return <section className="add-post container">
        <form className="add-post-form container">
            <input className="input" type="url" name="imageUrl" placeholder="image url" />
            <textarea className="input" name="text" cols="30" rows="10" placeholder="text"></   textarea>
            <button className="button" type="submit">Create</button>
            <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button> 
        </form>
    </section>

}