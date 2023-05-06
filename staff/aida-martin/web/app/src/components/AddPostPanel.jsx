export default function AddPostPanel () {
  return (
    <div className='modal'>
      <form className='posts form'>
        <h2>CREATE A NEW POST</h2>
        <input
          className='input'
          type='url'
          name='image'
          placeholder='Image url'
        />
        <textarea
          className='textarea'
          name='text'
          cols='30'
          rows='10'
          placeholder='Text'
        />

        <p className='add-post-error error off' />

        <button className='button' type='submit'>CREATE</button>
        <button className='button cancel' type='button'>CANCEL</button>
      </form>
    </div>
  )
}
