//lo importaré en el compo padre más alto, en este caso en APP que engloba Register, Login y Home

export default function Alert({ message, level,  onAccept }) {
    console.debug('Alert => render ')

    console[level][message]

    let color = 'orange'

    if(level === 'warn'){
        color = 'tomato'
    }else if(level === 'error'){
        color = 'orange'
    }

    return <section className="modal container">
            <p style={{backgrounColor: color}}>{message}</p>
            <button onClick={onAccept}>Accept</button>
        </section>

}
    


