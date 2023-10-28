import createPost from '../logic/createPost'

export default function AddPostModal({ onCancel, onPostCreated }) {
    console.log('AddPostModal -> render')

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleCreatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            createPost(image, text, error => {
                if (error) {
                    alert(error.message)

                    return
                }

                onPostCreated()
            })
        } catch(error) {
            alert(error.message)
        }
    }

    console.debug('AddPostModal -> render')

    return <section className="modal">
        <form onSubmit={handleCreatePost}>
            <input className="input" type="url" name="image" placeholder="URL de imagen" />
            <textarea className="input" name="text" cols="30" rows="10" placeholder="Tus pensamientos e ideas"></textarea>
            <button className='boton boton--primario' type="submit">Publicar</button>
            <button className='boton boton--primario' type="button" onClick={handleCancel}>Cancelar</button>
        </form>
    </section>
}