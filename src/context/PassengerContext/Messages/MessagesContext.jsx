import { createContext, useEffect, useState } from "react";
import { io } from 'socket.io-client'
import { BASEURL, postRequest, SocketUrl } from "../../../utils/Service";

export const MessageContext = createContext();
export const MessageContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [chats, setChats] = useState([])
    const [message, setMessage] = useState()
    const [chatId, setChatId] = useState()
    const [openChatContainer, setOpenChatContainer] = useState(false)
    const [driverName, setDriverName] = useState()
    const [conversation, setConversation] = useState([])
    const [driverId, setDriverId] = useState()
    const hostname = window.location.hostname;


    useEffect(() => {
        const storedUserInfo = localStorage.getItem("User")
        if (storedUserInfo) {
            try {
                const parsedInfo = JSON.parse(storedUserInfo)
                setUserInfo(parsedInfo)
                console.log("User info set from message page", storedUserInfo);
            } catch (error) {
                console.error("Error parsing user info:", error);
            }
        } else {
            console.log('No user Found in localStorage');
        }
    }, [])


    useEffect(() => {
       const newSokcet = io(SocketUrl)
      //  const newSokcet = io(`https://ridesync-backend.onrender.com`)

        setSocket(newSokcet)
        newSokcet.on("connect", () => {
            console.log("from frontend message page", newSokcet.id);
            if (userInfo && userInfo.id) {
                newSokcet.emit("addNewUser", userInfo.id, newSokcet.id)
            }
        })
        newSokcet.on("getOnlineUsers", (users) => {
            setOnlineUsers(users)
        })
        newSokcet.on("message", (userId, message, driverId) => {
            console.log("Receive Message", userId, message, driverId);
            setConversation((prev) => [...prev, { sender_Id: userId, message: message, timeSend: null }])
        })
    }, [userInfo])

    useEffect(() => {
        const fetchChats = async () => {
            const userId = userInfo?.id;
            if (userId) {
                const response = await postRequest(`${BASEURL}/getChats`, JSON.stringify({ userId, requestFrom: 'passenger' }))
                if (response) {
                    setChats(response)
                } else {
                    console.log("no Chats");
                }
            }
        }
        fetchChats()
    }, [userInfo])

    const openChat = async (chatId, user2_Id, userFn, userLn) => {
        setChatId(chatId)
        setOpenChatContainer(true)
        console.log("chatId:", chatId);
        fetchMessage(chatId)
        setDriverId(user2_Id)
        setDriverName(userFn + " " + userLn)
        console.log("driver Id ", driverId);
    }

    const sendMessage = async (chatId, message, driverId) => {
        const userId = userInfo?.id;
        try {
            if (userId) {
                const response = await postRequest(`${BASEURL}/sendMessage`, JSON.stringify({ chatId, userId, message }))
            }
        } catch (error) {
            console.log(error);
        }
        setConversation((prev) => [...prev, { sender_Id: userId, message: message, timeSend: null }])
        socket.emit('sendMessageTo', userId, message, driverId)
        setMessage("")
    }

    const fetchMessage = async (chatId) => {
        try {
            const userId = userInfo?.id;
            if (userId) {
                const response = await postRequest(`${BASEURL}/getMessages`, JSON.stringify({ userId, chatId }))
                const filteredMessages = response.map(({ sender_Id, message, timeSend }) => ({
                    sender_Id,
                    message,
                    timeStamp: timeSend, // Renaming for consistency if needed
                }));
                setConversation(filteredMessages)
                console.log("Convo:", filteredMessages);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MessageContext.Provider
            value={{
                userInfo,
                chats,
                sendMessage,
                setMessage,
                message,
                openChat,
                chatId,
                openChatContainer,
                conversation,
                driverId,
                driverName
            }}
        >
            {children}
        </MessageContext.Provider>
    )
}
