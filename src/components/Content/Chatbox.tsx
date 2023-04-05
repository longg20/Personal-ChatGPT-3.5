import Message from "./Message";
import TextInput from "./TextInput";
import { StyledChatboxWrapper } from "./styles";

const Chatbox = () => {
    return (
        <StyledChatboxWrapper>
            <Message />
            <TextInput />
        </StyledChatboxWrapper>
    );
}

export default Chatbox;