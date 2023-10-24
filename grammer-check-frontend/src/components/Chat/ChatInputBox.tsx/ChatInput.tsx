import React, {ChangeEvent, useState} from 'react';

import {handleGrammerCheck} from '../../../services/grammerCheckService';
import styles from './ChatInput.module.css';

interface messageProps {
    onSendMessage: (message: string) => void;
}
const ChatInput: React.FC<messageProps> = ({onSendMessage}) => {
    const [message, setMessage] = useState<string>('');

    const [grammarCheckedMessage, setGrammarCheckedMessage] =
        useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const GrammerCheckHandler = async (current_message: string) => {
        const checkedMessage = await handleGrammerCheck(current_message);
        setGrammarCheckedMessage(checkedMessage);
    };

    const copyCorrectMessage = () => {
        setMessage(grammarCheckedMessage);
        setGrammarCheckedMessage('');
    };

    const handleSendClick = () => {
        if (message.trim() !== '') {
            onSendMessage(message);
            setMessage('');
        }
    };
    return (
        <>
            <div className={styles.messageInputArea}>
                <div className={styles.input_box}>
                    <input
                        type='text'
                        value={message}
                        onChange={handleInputChange}
                        placeholder='Type your message...'
                        onKeyPress={(e) => {
                            e.key === 'Enter' && handleSendClick();
                        }}
                    />

                    <button
                        onClick={() => GrammerCheckHandler(message)}
                        className={styles.check_btn}
                    >
                        Check Grammer
                    </button>
                    <button onClick={handleSendClick}>Send &#9658;</button>
                </div>
                {grammarCheckedMessage && (
                    <div className={styles.correct_message}>
                        <p>{grammarCheckedMessage}</p>
                        <button onClick={copyCorrectMessage}>copy</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ChatInput;
