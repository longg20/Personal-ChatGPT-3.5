import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { botData } from "../contexts/botData";
import { api } from "../api/requestMethod";
import { AppDispatch, RootState } from "./store";
import { toast } from "react-toastify";
import { uuidv4 } from "../api/uuidv4";

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
};

interface conversationDataType {
    key: string,
    label: string,
    messages: messageDataType[],
}

interface messageDataType {
    id: string,
    content: string,
    role: 'user' | 'assistant' | 'system',
    status: 'pending' | 'fulfilled' | 'rejected',
};

const initialBot: botDataType = botData[0];
const localStoredConversations = localStorage.getItem(initialBot.key);
const initialConversations: conversationDataType[] = localStoredConversations ? JSON.parse(localStoredConversations) : [
    { 
        key: uuidv4(initialBot.key),
        label: initialBot.name + ' Chat 1',
        messages: JSON.parse(initialBot.firstPrompt),
    }
];

const initialState = {
    bot: initialBot,
    selectedConvKey: initialConversations[0].key,
    conversations: initialConversations,
    isLoading: false,
};

export const sendMessage = createAppAsyncThunk('messages/sendMessage', async (input: string, { dispatch, getState, rejectWithValue }) => {
    const { selectedConvKey, conversations } = getState().chatbot;
    const conversation = conversations.find((conv) => conv.key === selectedConvKey) || initialConversations[0];
    const userMessage = {
        id: uuidv4('msg'),
        content: input,
        role: 'user',
        status: 'pending',
    };
    dispatch(addNewMessage(userMessage));
    const data = await api.post('/v1/chat/completions', { 
        messages: [
            conversation.messages[0], //remember the first system prompt
            ...conversation.messages.slice(1).slice(-6).map((mssg) => ({ content: mssg.content, role: mssg.role })), //remember the last 6 messages minus the first system prompt
            { content: userMessage.content, role: userMessage.role },
        ],
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        max_tokens: 1024,
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
            const localStoredConversations = localStorage.getItem(initialBot.key);
            const initialConversations: conversationDataType[] = localStoredConversations ? JSON.parse(localStoredConversations) : [
                { 
                    key: uuidv4(initialBot.key),
                    label: initialBot.name + ' Chat 1',
                    messages: JSON.parse(initialBot.firstPrompt),
                }
            ];
            state.bot = action.payload;
            state.conversations = initialConversations;
        },
        switchConversation: (state, action) => {
            state.selectedConvKey = action.payload;
        },
        addNewConversation: (state) => {
            let newConversation = { 
                key: uuidv4(state.bot.key),
                label: initialBot.name + ' Chat ' + (state.conversations.length + 1),
                messages: JSON.parse(state.bot.firstPrompt),
            };
            state.conversations = [...state.conversations, newConversation];
            localStorage.setItem(state.bot.key, JSON.stringify(state.conversations));
        },
        addNewMessage: (state, action) => {
            let newConversations = [...state.conversations];
            let index = newConversations.findIndex((conv) => conv.key === state.selectedConvKey);
            newConversations[index].messages = [...newConversations[index].messages, action.payload];
            state.conversations = newConversations;
        },
        removeMessageById: (state, action) => {
            let newConversations = [...state.conversations];
            let index = newConversations.findIndex((conv) => conv.key === state.selectedConvKey);
            newConversations[index].messages = newConversations[index].messages.filter((mssg) => mssg.id !== action.payload);
            state.conversations = newConversations;
            localStorage.setItem(state.bot.key, JSON.stringify(state.conversations));
        },
        clearMessage: (state) => {
            let newConversations = [...state.conversations];
            let index = newConversations.findIndex((conv) => conv.key === state.selectedConvKey);
            newConversations[index].messages = JSON.parse(initialBot.firstPrompt);
            state.conversations = newConversations;
            localStorage.setItem(state.bot.key, JSON.stringify(state.conversations));
        },
    },
    extraReducers: (builder) => {
        builder.addCase(sendMessage.pending, (state) => {
          state.isLoading = true;
        });
    
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.isLoading = false;
            const assistantMessage: messageDataType = {
                id: uuidv4('msg'),
                content: action?.payload?.data?.choices?.[0].message?.content,
                role: 'assistant',
                status: 'fulfilled',
            };
            let newConversations = [...state.conversations];
            let index = newConversations.findIndex((conv) => conv.key === state.selectedConvKey);
            newConversations[index].messages = [...newConversations[index].messages, assistantMessage];
            state.conversations = newConversations;
            localStorage.setItem(state.bot.key, JSON.stringify(state.conversations));
        });
    
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.isLoading = false;
            let newConversations = [...state.conversations];
            let index = newConversations.findIndex((conv) => conv.key === state.selectedConvKey);
            newConversations[index].messages[newConversations[index].messages.length - 1].status = 'rejected';
            state.conversations = newConversations;
            toast.error(action?.payload?.response?.data?.error?.message);
        });
    },
});

export const { switchBot, switchConversation, addNewConversation, addNewMessage, removeMessageById, clearMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;