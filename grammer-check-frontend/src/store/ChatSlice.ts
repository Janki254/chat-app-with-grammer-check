import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { messageContent } from '../App';

interface chatlist {
    messages: messageContent[];
}

const initialState: chatlist = {
    messages: [],
};
const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<messageContent>) => {
            state.messages.push(action.payload);
        },
    },
});

export const {addMessage} = ChatSlice.actions;
export default ChatSlice.reducer;
