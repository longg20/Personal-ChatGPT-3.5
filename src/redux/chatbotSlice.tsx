import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { botData } from "../contexts/botData";
import { api } from "../api/requestMethod";
import { AppDispatch, RootState } from "./store";
import { toast } from "react-toastify";
import _ from "lodash";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState
    dispatch: AppDispatch
    rejectValue: any
}>();

interface botDataType {
    key: string,
    name: string,
    avatar: string,
    firstPrompt: string,
    slice: number,
};

interface message {
    id: string,
    content: string,
    role: 'user' | 'assistant' | 'system',
    status: 'pending' | 'fulfilled' | 'rejected',
};

const initialBot = botData[0];
const initialState = {
    bot: initialBot as botDataType,
    messages: JSON.parse(localStorage.getItem(initialBot.key) || initialBot.firstPrompt) as message[],
    isLoading: false,
};

export const sendMessage = createAppAsyncThunk('messages/sendMessage', async (input: string, { dispatch, getState, rejectWithValue }) => {
    const { messages } = getState().chatbot;
    const userMessage: message = {
        id: _.uniqueId(),
        content: input,
        role: 'user',
        status: 'pending',
    };
    dispatch(addNewMessage(userMessage));
    const data = await api.post('/v1/chat/completions', { 
        messages: [
            messages[0], //remember the first system prompt
            ...messages.slice(1).slice(-10), //remember the last 10 messages minus the first system prompt
            userMessage,
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        max_tokens: 1000,
    }).catch((error) => {
        return rejectWithValue(error);
    });
    return data;
});

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
        removeMessageById: (state, action) => {
            state.messages = state.messages.filter((message) => message.id !== action.payload);
        },
        clearMessage: (state) => {
            state.messages = JSON.parse(state.bot.firstPrompt);
            localStorage.setItem(state.bot.key, state.bot.firstPrompt);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendMessage.pending, (state) => {
          state.isLoading = true;
        });
    
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.isLoading = false;
            const assistantMessage: message = {
                id: _.uniqueId(),
                content: action?.payload?.data?.choices?.[0].message?.content,
                role: 'assistant',
                status: 'fulfilled',
            };
            state.messages[state.messages.length - 1].status = 'fulfilled';
            state.messages = [...state.messages, assistantMessage];
            localStorage.setItem(state.bot.key, JSON.stringify(state.messages));
        });
    
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.isLoading = false;
            state.messages[state.messages.length - 1].status = 'rejected';
            toast.error(action?.payload?.response?.data?.error?.message, {
                position: "top-center",
            });
        });
    },
});

export const { switchBot, addNewMessage, removeMessageById, clearMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;