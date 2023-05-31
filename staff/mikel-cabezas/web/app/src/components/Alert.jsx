export function Alert({ message, onAccept }) {

    console.log('Alert -> render')


    return <>

    <section>
        <p>{message}</p>
        <button onClick={onAccept}>Accept</button>
    </section>

    </>
}