import Button from "../library/components/Button"
import ContextualModalMenu from "../library/modules/ContextualModalMenu"
import './DeleteModal.css'
import deleteMeal from "../logic/deleteMeal"

type Props = {
    mealId: string,
    handleClose: () => void,
    handleGoToProfile: () => void

}

export default function DeleteModal({ mealId, handleClose, handleGoToProfile }: Props) {

    const handleDeleteMeal = () => {
        (async () => {
            try {
                await deleteMeal(mealId)
                handleGoToProfile()
            } catch (error) {
                console.log(error)
            }
        })()
    }

    return <>
        <div className='contextualModal-overlay' onClick={handleClose}></div>
        <ContextualModalMenu >
            <>
                <div className="delete-modal-text">
                    <p className="title grey-700">Are you sure you want to delete this meal?</p>
                    <p className="body-text grey-500">This action cannot be undone. If any order is pending you will need to contact your customer to beware of situation.</p>
                </div>
                <div className="delete-modal-button-bar">
                    <Button type={"critical"} size={"medium"} label={"Delete meal"} onClick={handleDeleteMeal} />
                    <Button type={"secondary"} size={"medium"} label={"Cancel"} onClick={handleClose} />
                </div>
            </>
        </ContextualModalMenu>
    </>
}