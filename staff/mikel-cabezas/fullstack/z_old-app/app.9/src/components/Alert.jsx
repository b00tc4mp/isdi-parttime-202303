export function Alert({ message, onAccept }) {

    console.log('Alert -> render')

    return <>
        <section className="alert overlay">
            <div className="form p-8 pb-3 rounded-3xl w-auto max-w-sm flex-col bg-[var(--container-bg)] text-center gap-3">
                <p className="mb-2">{message}</p>
                <button onClick={onAccept}>Accept</button>
            </div>
        </section>
    </>
}