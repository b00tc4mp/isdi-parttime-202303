import Container from "../library/Container"

export default function Alert({ message, onAccept }) {

    // export default function Alert({ message, level, onAccept }) {
    console.debug('Alert -> render')

    // console[level](message)

    let color = 'orange'

    // if (level === 'warn')
    //     color = 'gold'
    // else if (level === 'error')
    //     color = 'tomato'

    return <section className="modal fixed top-0 w-full h-full opacity-90 ml-auto mb-1 mr-auto z-40  mb-20 shadow-md bg-neutral-200 bg-slate-50 rounded-[7px]">
        <div className="fixed inset-y-1/2 inset-x-1/3 w-[400px] h-[100px] drop-shadow-2xl">
            <div className="rounded-t-[7px]  h-4/6">
                <p className="w-full h-full p-2 flex items-center justify-center rounded-t-[7px] text-sm font-semibold" style={{ backgroundColor: color }}>{message}</p>
            </div>
            <div className="h-2/6">
                <button className="w-full h-full bg-white opacity-100 rounded-b-[7px]" onClick={onAccept}>Accept</button>
            </div>
        </div>
    </section >

    // console.debug('Alert -> render')

    // return <Container tag="section" className="modal container">
    //     <p>{message}</p>
    //     <button onClick={onAccept}>Accept</button>

    // </Container>

}