import { createSlice } from "@reduxjs/toolkit";
import { botData } from "../contexts/botData";

interface botDataType {
    key: string,
    name: string,
    avatar: string,
    firstPrompt: string,
    slice: number,
}

interface message {
    content: string,
    role: string,
}

const initialBot = botData[0];
const initialState = {
    bot: initialBot as botDataType,
    messages: JSON.parse(localStorage.getItem(initialBot.key) || initialBot.firstPrompt) as message[],
};

export const chatbotSlice = createSlice({
    name: 'states',
    initialState,
    reducers: {
        switchBot: (state, action) => {
            state.bot = action.payload;
            state.messages = JSON.parse(localStorage.getItem(action.payload.key) || action.payload.firstPrompt) as message[];
        },
        addNewMessage: (state, action) => {
            state.messages = [...state.messages, action.payload];
        },
        clearMessage: (state) => {
            state.messages = JSON.parse(state.bot.firstPrompt);
            localStorage.setItem(state.bot.key, state.bot.firstPrompt);
        },
    },
});

export const { switchBot, addNewMessage, clearMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;