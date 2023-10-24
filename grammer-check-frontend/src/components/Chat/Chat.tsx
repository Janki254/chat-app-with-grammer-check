import React, {useEffect, useState} from 'react';

// import {useDispatch, useSelector} from 'react-redux';
import {messageContent} from '../../App';
import {socket} from '../../services/websocketService';
// import { addMessage } from '../../store/ChatSlice';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatInput from './ChatInputBox.tsx/ChatInput';
import ChatWindow from './ChatWindow/ChatWindow';

interface propType {
    username: string;
    chatroom: string;
}

const Chat: React.FC<propType> = ({username, chatroom}) => {
    // const dispatch = useDispatch();
    // const messageList = useSelector((state: RootState) => state.chat.messages);
    const [messageList, setMessageList] = useState<messageContent[]>([]);

    const messageSendHandler = async (message: string) => {
        const messageDetails = {
            room: chatroom,
            username: username,
            message: message,
            timestamp: Date.now(),
        };

        await socket.emit('send_message', messageDetails);
        setMessageList((list) => [...list, messageDetails]);
    };

    useEffect(() => {
        const getMessages = () => {
            socket.on('receive_message', (data) => {
                setMessageList((list) => [...list, data]);
            });
        };

        return () => getMessages();
    }, [socket]);

    return (
        <div>
            <ChatHeader chatroomID={chatroom} />
            <ChatWindow chat_messages={messageList} author={username} />
            <ChatInput onSendMessage={messageSendHandler} />
        </div>
    );
};

export default Chat;
