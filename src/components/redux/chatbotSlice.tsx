import { createSlice } from "@reduxjs/toolkit";

interface message {
    content: string,
    role: string,
}

const initialState = {
    messages: [
        {
            content: 'Hello, how may I assist you today?',
            role: 'assistant',
        },
    ] as message[],
};

export const chatbotSlice = createSlice({
    name: 'states',
    initialState,
    reducers: {
        addNewMessage: (state, action) => {
            state.messages = [...state.messages, action.payload];
        },
    },
});

export const { addNewMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;