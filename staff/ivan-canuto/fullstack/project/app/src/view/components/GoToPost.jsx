import { Button, Form, ModalContainer, ModalWindow } from "../library";


export default function GoToPost({ handleCloseModal }) {


    const handleGoToPost = () => {

    }

    return <ModalContainer onClick={event => {
        if(event.target === document.querySelector('.ModalContainer')) handleCloseModal()
    }}>
        <ModalWindow>
            <p>If you want to modify this suggestion you need to got to the post, do you want to go?</p>
            <Form onSubmit={handleGoToPost}>
                <Button>Go</Button>
                <Button type='button' onClick={handleCloseModal}>Cancel</Button>
            </Form>
        </ModalWindow>
    </ModalContainer>
}