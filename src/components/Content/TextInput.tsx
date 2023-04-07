import { useState } from "react";
import { useDispatch } from 'react-redux';
import { StyledSendButton, StyledTextInput, StyledTextInputWrapper } from "./styles";
import SendIcon from '@material-ui/icons/Send';
import _ from 'lodash'; 
import { CircularProgress } from "@material-ui/core";
import { addNewMessage } from "../../redux/chatbotSlice";
import { api } from "../../api/requestMethod";
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";
import { toast } from 'react-toastify';

const TextInput = () => {
    const [input, setInput] = useState<string>('');
    const bot = useSelector((state: RootState) => state.chatbot.bot);
    const messages = useSelector((state: RootState) => state.chatbot.messages);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const callOpenAIAPI = async (input: string) => {
        if (!_.isEmpty(input)) {
            setIsLoading(true);
            setInput('');
            const userMessage = {
                content: input,
                role: 'user',
            };
            dispatch(addNewMessage(userMessage));

            api.post('/v1/chat/completions', { 
                messages: [
                    messages[0], //remember the first system prompt
                    ...messages.slice(1).slice(-4), //remember the last 4 messages minus the first system prompt
                    userMessage,
                ],
                model: "gpt-3.5-turbo",
                temperature: 0.8,
                max_tokens: 1000,
            })
            .then(response => {
                const assistantMessage = {
                    content: response.data.choices[0].message.content,
                    role: 'assistant',
                };
                dispatch(addNewMessage(assistantMessage));
                localStorage.setItem(bot.key, JSON.stringify([...messages, userMessage, assistantMessage]));
            })
            .catch(error => {
                toast.error(error.response.data.error.message, {
                    position: "top-center",
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    };

    return (
        <StyledTextInputWrapper>
            <StyledTextInput
                style={{ resize: 'none' }}
                value={isLoading ? '' : input}
                isloading={isLoading ? 1 : 0}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={
                    event => {
                        if (event.key === 'Enter') {
                            callOpenAIAPI(input);
                        }
                    }
                }
            />
            <StyledSendButton onClick={() => callOpenAIAPI(input)}>
                {
                    !isLoading
                    ?
                    <SendIcon />
                    :
                    <CircularProgress size={20} />
                }
            </StyledSendButton>
        </StyledTextInputWrapper>
    );
}

export default TextInput;