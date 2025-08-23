import { useEffect, useRef, useState } from "react"
import { createSocket } from "../utils/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null)
    const { toUserId } = useParams();
    const user = useSelector((store) => store?.user);
    const userId = user?._id;
    const [targetUserProfile, setTargetUserProfile] = useState(null);

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        const socket = createSocket();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            userId,
            toUserId,
            text: newMessage,
        });
        setNewMessage("");
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchChats = async () => {
        try {
            const chats = await axios.get(`${import.meta.env.VITE_BASE_URL}/chat/${toUserId}`, { withCredentials: true });
            const chatMessages = chats?.data?.messages.map((msg) => {
                const { senderId, text } = msg;
                return {
                    firstName: senderId?.firstName,
                    text
                }
            })
            setMessages(chatMessages);
        } catch (err) {
            console.log(err);
        }
    }
    const fetchTargetProfile = async () => {
        try {
            const targetUser = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/chat/${toUserId}`, { withCredentials: true })
            console.log(targetUser.data);
            setTargetUserProfile(targetUser?.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchTargetProfile();
        fetchChats();
    }, [])
    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = createSocket();

        socket.emit("joinChat", {
            firstName: user.firstName,
            userId,
            toUserId,
        });

        socket.on("receivedMessage", ({ firstName, text }) => {
            setMessages((messages) => [...messages, { firstName, text }]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, toUserId]);
    return (
        <div className="w-full">
            <div className="flex gap-2 items-center bg-base-300 py-2 px-1 fixed top-0 w-full z-99">
                <div className="avatar avatar-offline">
                    <div className="w-10 rounded-full">
                        <img src={targetUserProfile?.photoUrl} />
                    </div>
                </div>
                <div>
                    <div className="text-white">{targetUserProfile?.firstName}</div>
                    <div className="text-gray-400 text-sm">Age: {targetUserProfile?.age}</div>
                </div>
            </div>
            <div className="w-full md:w-2/3 mx-auto h-screen lg:h-[75vh] flex flex-col justify-between pb-1 md:bg-base-200">
                <div className="overflow-scroll mt-15">
                    {messages.length > 0 ? (
                        <>
                            {messages.map((msg, index) =>
                                <div key={index} className={`chat ${msg?.firstName === user?.firstName ? "chat-end" : "chat-start"}`}>
                                    <div className={`chat-bubble ${msg?.firstName === user?.firstName ? "chat-bubble-primary" : "chat-bubble-secondary"}`}>
                                        {msg?.text}
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            No messages yet. Start a conversation!
                        </div>
                    )}
                </div>
                <div className="w-full flex px-1 justify-between gap-0.5">
                    <input value={newMessage} onKeyPress={handleKeyPress} onChange={(e) => setNewMessage(e.target.value)} type="text" placeholder="Type here" className="input w-full" />
                    <button onClick={sendMessage} className="btn btn-info">Sent</button>
                </div>
            </div>
        </div>
    )
}

export default Chat