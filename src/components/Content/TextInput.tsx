import { useState } from "react";
import { useDispatch } from 'react-redux';
import { StyledSendButton, StyledTextInput, StyledTextInputWrapper } from "./styles";
import SendIcon from '@material-ui/icons/Send';
import _ from 'lodash'; 
import { CircularProgress } from "@material-ui/core";
import { addNewMessage } from "../redux/chatbotSlice";
import { api } from "../../requestMethod";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const TextInput = () => {
    const [input, setInput] = useState<string>('');
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
                'messages': [
                    ...messages, 
                    userMessage,
                ],
                'model': "gpt-3.5-turbo",
                'temperature': 0.8,
                'max_tokens': 500,
            })
            .then(response => {
                const assistantMessage = {
                    content: response.data.choices[0].message.content,
                    role: 'assistant',
                };
                dispatch(addNewMessage(assistantMessage));
            })
            .catch(error => {
                console.error(error);
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
                isLoading={isLoading}
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