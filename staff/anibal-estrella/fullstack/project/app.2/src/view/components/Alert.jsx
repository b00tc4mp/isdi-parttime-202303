import { Panel, Button, PanelBackgroundClose } from '../library'

export default function alert({ onPanelClick, onCancel, message, onAccept }) {
    console.debug(`//// Alert -> render`)

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    const handlePanelClick = (event) => {
        onPanelClick(event)
    }

    return <PanelBackgroundClose>

        <Panel type="div p-4" onClick={handlePanelClick}>

            <p className="alert-message border-top-gradient">{message}</p>
            <Button className="" onClick={onAccept}>OK</Button>

        </Panel>

        <div className="overlay-panel-close" onClick={onAccept}></div>

    </PanelBackgroundClose>
}
