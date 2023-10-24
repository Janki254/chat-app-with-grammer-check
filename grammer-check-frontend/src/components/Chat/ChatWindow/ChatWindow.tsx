import React from 'react';

import {messageContent} from '../../../App';
import ChatMessage from './ChatMessage';
import styles from './ChatWindow.module.css';

interface ChatWindowProps {
    chat_messages: messageContent[];
    author: string;
}
const ChatWindow: React.FC<ChatWindowProps> = ({chat_messages, author}) => {
    return (
        <div className={styles.chat_window}>
            {chat_messages.map((message: messageContent, indx) => (
                <ChatMessage
                    key={indx}
                    message={message}
                    messageAuthor={author}
                />
            ))}
        </div>
    );
};

export default ChatWindow;
