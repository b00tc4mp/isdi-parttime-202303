import { MessageProps } from "@/types";

interface MessageProp {
    message: MessageProps
}
const Message = ({ message }: MessageProp) => {

    const { title, author, email, text, status } = message;

    return (
        <div className="max-w-[1440px] w-full flex flex-col">
            <div className="flex flex-col content-center">
                <h1 className="font-bold justify-self-center text-xl p-4 bg-slate-700 text-white">{title}</h1>
                <div className="w-full p-6 justify-center flex flex-col gap-4">
                    <p className="text-justify">{author}</p>
                    <p className="text-justify">{email}</p>
                    <p className="text-justify whitespace-pre-line">{text}</p>
                </div>
            </div>
        </div>
    )
}

export default Message;