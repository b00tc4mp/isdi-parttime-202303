export function Alert({ message, onAccept }) {

    console.log('Alert -> render')

    return <>
        <section className="alert overlay">
            <p>{message}</p>
            <button onClick={onAccept}>Accept</button>
        </section>
    </>
}