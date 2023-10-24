import React from 'react';

import {messageContent} from '../../../App';
import styles from './ChatWindow.module.css';

interface messageProp {
    message: messageContent;
    messageAuthor: string;
}
const ChatMessage: React.FC<messageProp> = ({message, messageAuthor}) => {
    const {username, timestamp, message: messagecontent} = message;
    return (
        <div className={styles.message}>
            <p
                className={
                    messageAuthor === username
                        ? styles.sender_name
                        : styles.receiver_name
                }
            >
                {username}
            </p>
            <p
                className={`${styles.message_content} ${
                    messageAuthor === username ? styles.sender : styles.receiver
                }`}
            >
                {messagecontent}
                <span className={styles.timestamp}>
                    {new Date(timestamp).toLocaleTimeString()}
                </span>
            </p>
        </div>
    );
};

export default ChatMessage;
