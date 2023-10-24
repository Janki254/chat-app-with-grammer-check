// websocketService.js
// import { useDispatch } from 'react-redux';
import io from 'socket.io-client';

// import { receiveMessage } from '../store/ChatSlice';

export const socket = io('http://localhost:4000');
// socket.on(
//     'message',
//     (message: {content: string; timestamp: number; sender: string}) => {
//         const dispatch = useDispatch();
//         dispatch(receiveMessage(message));
//     },
// );
const sendChatMessage = (message: string) => {
    socket.emit('message', {
        content: message,
        timestamp: Date.now(),
        sender: 'current-user',
    });
};

export {sendChatMessage};
