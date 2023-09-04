import ModalContainer from '../library/ModalContainer'

export default function Alert({ error, level, onAccept }) {
    console.log(error)

    let color = 'lightblue'

    if (level === 'warning')
        color = 'yellow'
    else if (level === 'error')
        color = 'red'

    console.log('Alert -> render')

    return <ModalContainer className='absolute z-50 top-0'>
        <div className="min-w-40 min-h-20 p-4 flex flex-col items-center justify-center gap-4 rounded bg-white absolute z-10 h-60 w-10/12" >
            {(level === 'warning' || level === 'error') ?
                <div className='w-full flex justify-center items-center gap-2'>
                    <h1 className='text-3xl'>Oops!</h1>
                    <img src="src/images/warning.png" alt="alert-image" className='h-10'/>
                </div>
            :
                <div className='w-full flex justify-center items-center'>
                    <h1 className='text-2xl'>Well done!</h1>
                    <img src="src/images/emoticon.png" alt="alert-image" className='h-14'/>
                </div>
            }
            <p className={`p-4 rounded bg-${level === 'error' ? 'red' : level === 'warning' ? 'yellow' : 'blue'}-300 text-center`}>{error.message}</p>
            <button className="px-2 py-1 hover:bg-gray-300 w-fit rounded-md text-black bg-gray-200" onClick={onAccept}>Accept</button>
        </div>
        <div className='w-full h-full absolute bg-slate-600 opacity-50' onClick={onAccept}></div>
    </ModalContainer>
}