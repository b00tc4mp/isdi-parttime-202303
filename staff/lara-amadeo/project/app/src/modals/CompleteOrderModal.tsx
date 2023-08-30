import Button from "../library/components/Button"
import ContextualModalMenu from "../library/modules/ContextualModalMenu"
import './DeleteModal.css'
import markAsCompleted from "../logic/markAsCompleted"
import useHandleError from "../logic/hooks/useHandleError"

type Props = {
    serial: string,
    chefId: string
    handleClose: () => void,
    onComplete: () => void

}

export default function CompleteOrderModal({ serial, chefId, handleClose, onComplete }: Props) {

    const handleErrors = useHandleError()

    const handleConfirmComplete = () => {
        (async () => {
            try {
                await markAsCompleted(serial, chefId)
                console.log('works')
            } catch (error: any) {
                handleErrors(error)
            }
        })()
    }

    return <>

    </>
}