import { useState } from "react"
import { Header } from "../components"
import { Container, Button } from "../library"
import { useHandleErrors } from "../hooks"

export default function Chatbot() {
    const handleErrors = useHandleErrors()

    const [modal, setModal] = useState(null)
    const [menu, setMenu] = useState(false)
    const [openedMenu, setOpenedMenu] = useState(false)

    const handleOpenProfile = () => {
        document.body.classList.add("fixed-scroll")
        setModal("profile")
    }

    const handleToggleMenu = () => {
        if(!menu) {
            setMenu(!menu)
            setOpenedMenu(!openedMenu)
        } else {
            setTimeout(() => {
            setMenu(!menu)
            }, 400);
            setOpenedMenu(!openedMenu)
        }
    }

    const handleUserInput = event => {
        event.preventDefault()
        
        const userInput = event.target.userInput.value

        

        handleErrors(async () => {
            const response = await fetchReply()

            await renderTypeWirterText(response)
        })

    }

    return <Container className="absolute top-0 bg-[url(src/images/chatbot-3.1.jpg)] bg-fixed bg-center bg-cover">
        <Header
            handleOpenProfile={handleOpenProfile}
            handleToggleMenu={handleToggleMenu}
        />

        <section className="conversation-container absolute top-24 w-full overflow-y-hidden">
            <div className="border-t border-b p-6 border-black bg-gray-300 bg-opacity-70">
                <p>How can I help you?</p>
            </div>
        </section>

        {modal === "profile" && (
          <Profile
            onUpdatedAvatar={handleUpdatedAvatar}
            onCancel={handleCloseModal}
          />
        )}

        {menu && (
          <SideBarMenu
            // showHomePage={handleReturnToHome}
            showOwnPosts={showOwnPosts}
            showSavedPosts={showSavedPosts}
            openedMenu={openedMenu}
            handleToggleMenu={handleToggleMenu}
          />
        )}

        <form className="border-black border-2 flex flex-row p-2 absolute bottom-8 gap-2" onSubmit={handleUserInput}>
            <textarea className="w-72 p-4 focus:outline-none overflow-y h-6 max-h-[200px]" type='text' name='userInput' placeholder='Send a message' autoFocus />
            <Button><span className="material-symbols-outlined">send</span></Button>
        </form>

    </Container>
}