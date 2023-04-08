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
    const isLoading = useSelector((state: RootState) => state.chatbot.isLoading);
    const dispatch = useDispatch<AppDispatch>();

    const callOpenAIAPI = async (input: string) => {
        if (!_.isEmpty(input)) {
            setInput('');
            dispatch(sendMessage(input));
        };
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