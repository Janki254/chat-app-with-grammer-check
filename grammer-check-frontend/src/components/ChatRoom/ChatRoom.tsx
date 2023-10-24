import React, {useState} from 'react';

import {socket} from '../../services/websocketService';
import Chat from '../Chat/Chat';
import styles from './ChatRoom.module.css';

const ChatRoom = () => { 
    const [username, setUserName] = useState<string>('');
    const [chatroom, setChatroom] = useState<string>('');

    const [showChats, setShowChats] = useState<boolean>(false);

    const joinRoomHandler = () => {
        if (username.trim() !== '' && chatroom.trim() !== '') {
            socket.emit('join_room', chatroom);
            setShowChats(true);
        }
    };

    return (
        <React.Fragment>
            {!showChats ? (
                <div className={styles.chatroom_container}>
                    <h3>Join Chat Room</h3>
                    <div className={styles.chatroom_details}>
                        <div className={styles.chatRoom}>
                            <label>Username &nbsp;:</label>
                            <input
                                type='text'
                                placeholder='Enter Your name'
                                onChange={(event) =>
                                    setUserName(event.target.value)
                                }
                            />
                        </div>
                        <div className={styles.chatRoom}>
                            <label>ChatRoom :</label>
                            <input
                                type='text'
                                placeholder='Enter Chat Room ID'
                                onChange={(event) =>
                                    setChatroom(event.target.value)
                                }
                            />
                        </div>
                        <button
                            className={styles.join_button}
                            onClick={joinRoomHandler}
                        >
                            Join Room
                        </button>
                    </div>
                </div>
            ) : (
                <Chat username={username} chatroom={chatroom} />
            )}
        </React.Fragment>
    );
};

export default ChatRoom;
