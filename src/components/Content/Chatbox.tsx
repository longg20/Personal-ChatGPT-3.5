import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Message from "./Message";
import TextInput from "./TextInput";
import { StyledChatboxHeader, StyledChatboxWrapper } from "./styles";
import { useDispatch } from 'react-redux';
import { clearMessage } from '../../redux/chatbotSlice';
import { WarningModal } from '../Modals/WarningModal';

const Chatbox = () => {
    const dispatch = useDispatch();
    const [isShowWarningModal, setIsShowWarningModal] = useState<boolean>(false);

    return (
        <>
            <StyledChatboxWrapper>
                <StyledChatboxHeader>
                    <DeleteIcon onClick={() => setIsShowWarningModal(true)} />
                </StyledChatboxHeader>
                <Message />
                <TextInput />
            </StyledChatboxWrapper>

            <WarningModal
                title="Clear Messages"
                open={isShowWarningModal}
                onOk={() => dispatch(clearMessage())}
                hideModal={() => setIsShowWarningModal(false)}
                description="Confirm clear all messages?"

            />
        </>
    );
}

export default Chatbox;