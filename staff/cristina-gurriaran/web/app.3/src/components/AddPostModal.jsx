
export default function AddPostModal(props){

    function handleCancel(event){
        event.preventDefault()

        props.onCancel()
    }


     return <section className="add-post container">
        <form className="container">
            <input className="input" type="url" name="image" placeholder="image url" />
            <textarea className="input" name="text" cols="30" rows="10" placeholder="text"></textarea>
            <button className="button" type="submit">Create</button>
            <button className="button cancel" type="button" onClick={handleCancel}>Cancel</button>
        </form>

</section>
}
