import { ModalContainer } from "../library";
import { useState, useEffect } from "react";
import { useHandleErrors } from "../hooks";
import { deleteAllConversations, deleteConversation } from "../../logic";
import { context } from "../../ui";

export default function SideBarMenu({
    chatbotOptions,
    homeOptions,
    page,
    openedMenu,
    lastPostsUpdate,
    handleToggleMenu,
    handleLastPostsUpdate,
    openedProfile,
    setOpenedProfile,
    scrollToTop
}) {
    const handleErrors = useHandleErrors()

    const [, setForceUpdate] = useState();
    const [conversationId, setconversationId] = useState()

    useEffect(() => {
        setForceUpdate();
        setconversationId()
    }, [lastPostsUpdate]);

    const handleConfirmDelete = (_conversationId) => setconversationId(_conversationId)

    const handleDeleteConversation = () => {
        handleErrors(async () => {
            await deleteConversation(conversationId)

            setconversationId(null)

            if (conversationId === context.conversationId) context.conversationId = null

            handleLastPostsUpdate()
        })
    }

    const handleCancelDelete = () => setconversationId(null)

    const handleDeleteAllConversations = () => {
        handleErrors(async () => {
            await deleteAllConversations()

            setconversationId(null)

            context.conversationId = null

            handleLastPostsUpdate()

            handleToggleMenu()
        })
    }

    return (
        <ModalContainer
            className="absolute top-0 left-0 z-20"
            onClick={(event) => {
                if (event.target === document.querySelector(".ModalContainer"))
                    handleToggleMenu();
            }}
        >
            <ul
                className={`w-44 h-full bg-white fixed top-24 bottom-0 z-20 border-t-2 border-white overflow-scroll ${openedMenu ? "opened-menu" : "closed-menu"
                    }`}
            >
                {page === "Chatbot" &&
                    chatbotOptions && <>
                        {chatbotOptions.map((option, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`conversation-${index} ${index === chatbotOptions.length - 1 ? 'h-24 bg-white' : `${option.text.length > 38 ? 'h-fit' : 'h-16'} bg-gray-100`} w-full border-2 border-t-0 border-white flex justify-center items-center`}
                                    onClick={event => {
                                        if (event.target.tagName.toLowerCase() !== 'span' && !event.target.classList.contains('deleteAllChatsText')) {
                                            option.onClick();

                                            handleToggleMenu();
                                        }
                                    }}
                                >
                                    <div className="flex items-center justify-between w-full h-fit">
                                        {option.id !== 'deleteAllChatsId' ?
                                            <p className="text-center w-full">{option.text}</p>
                                            :
                                            <p className="deleteAllChatsText flex items-center justify-center w-full gap-2" onClick={() => handleConfirmDelete(option.id)}>{option.text}<span className="material-symbols-outlined">folder_delete</span></p>
                                        }
                                        {option.id !== undefined ?
                                            option.id && conversationId !== option.id ?
                                                option.id !== 'deleteAllChatsId' && <span className="material-symbols-outlined pr-1" onClick={() => handleConfirmDelete(option.id)}>more_vert</span>
                                                :
                                                <div className="flex flex-col gap-1 overflow-hidden pr-2">
                                                    <span className="material-symbols-outlined" onClick={option.id === 'deleteAllChatsId' ? handleDeleteAllConversations : handleDeleteConversation}>delete</span>
                                                    <span className="material-symbols-outlined" onClick={handleCancelDelete}>close</span>
                                                </div>
                                            :
                                            ''
                                        }

                                    </div>
                                </li>
                            );
                        })}
                    </>
                }
                {(page === "Home" || page === 'Suggestions' || page === 'OwnPostsSuggestions') &&
                    homeOptions &&
                    homeOptions.map((option, index) => {
                        return <li
                            key={index}
                            className="h-16 bg-slate-100 w-full border-2 border-t-0 border-white flex justify-center overflow-auto items-center px-4 text-center"
                            onClick={() => {
                                option.onClick();

                                handleToggleMenu();

                                if (openedProfile) setOpenedProfile(false)

                                scrollToTop()
                            }}
                        >
                            {option.text === 'Chatbot page' ?
                                <p className='w-full flex justify-left items-center gap-2'><span className="material-symbols-outlined text-lg">smart_toy</span>{option.text}</p>
                                :
                                option.text === 'Home page' ? 
                                <p className='w-full flex justify-left items-center gap-2'><span className="material-symbols-outlined text-lg">Home</span>{option.text}</p>
                                :
                                option.text === 'Own posts' ? 
                                <p className='w-full flex justify-left items-center gap-2'><span className="material-symbols-outlined text-lg">copyright</span>{option.text}</p>
                                :
                                option.text === 'Saved posts' ? 
                                <p className='w-full flex justify-left items-center gap-2'><span className="material-symbols-outlined text-lg">bookmark</span>{option.text}</p>
                                :
                                option.text === 'Seen lately' ? 
                                <p className='w-full flex justify-left items-center gap-2'><span className="material-symbols-outlined text-lg">visibility</span>{option.text}</p>
                                :
                                option.text === 'My suggestions' ? 
                                <p className='w-full flex justify-left items-center gap-2'><span className="material-symbols-outlined text-lg">emoji_objects</span>{option.text}</p>
                                :
                                option.text === 'Own posts suggestions' ? 
                                <p className='flex justify-left items-center pr-2'><span className="material-symbols-outlined text-lg">psychology</span>{option.text}</p>
                                :
                                option.text === 'Create a post' ? 
                                <p className='w-full flex justify-left items-center gap-2'><span className="material-symbols-outlined text-lg">post</span>{option.text}</p>
                                :
                                ''
                            }
                        </li>
                    })}
            </ul>
        </ModalContainer>
    );
}
