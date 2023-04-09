import { useState } from "react";
import { useDispatch } from 'react-redux';
import { StyledSendButton, StyledTextInput, StyledTextInputWrapper } from "./styles";
import SendIcon from '@material-ui/icons/Send';
import _ from 'lodash'; 
import { CircularProgress } from "@material-ui/core";
import { sendMessage } from "../../redux/chatbotSlice";
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../redux/store";

const TextInput = () => {
    const [input, setInput] = useState<string>('');
    const selectedConvKey = useSelector((state: RootState) => state.chatbot.selectedConvKey);
    const conversations = useSelector((state: RootState) => state.chatbot.conversations);
    const isLoading = useSelector((state: RootState) => state.chatbot.isLoading);
    const dispatch = useDispatch<AppDispatch>();

    const callOpenAIAPI = async (input: string) => {
        if (!_.isEmpty(input) && !isLoading) {
            setInput('');
            dispatch(sendMessage(input));
        };
    };

    const getLastMessageByConvKey = () => {
        const mssg = conversations.find((conv) => conv.key === selectedConvKey)?.messages;
        if (mssg) return mssg[mssg.length - 1];
    };

    return (
        <StyledTextInputWrapper>
            <StyledTextInput
                disabled={isLoading || getLastMessageByConvKey()?.status === 'rejected'}
                style={{ resize: 'none' }}
                value={isLoading ? '' : input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={
                    event => {
                        if (event.key === 'Enter') {
                            callOpenAIAPI(input);
                        }
                    }
                }
            />
            <StyledSendButton
                disabled={getLastMessageByConvKey()?.status === 'rejected'}
                onClick={() => callOpenAIAPI(input)}
            >
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