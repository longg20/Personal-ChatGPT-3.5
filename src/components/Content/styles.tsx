import styled from 'styled-components';
import { Content } from 'antd/es/layout/layout';
import { Input, Button } from 'antd';

const { TextArea } = Input;

export const StyledChatbotContent = styled(Content)`
    padding: 16px;
    height: 100%;
    display: flex;
    justify-content: center;
`;

export const StyledChatboxWrapper = styled.div`
    height: 100%;
    width: 800px;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 5px;
    box-shadow: 1px 2px 9px #B8B8B8;
    background-color: #ffffff;
    padding: 16px;
    gap: 16px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const StyledTextInputWrapper = styled.div`
    height: 70px;

    display: flex;
    justify-content: space-between;
    gap: 8px;
`;

export const StyledTextInput = styled(TextArea)<{ isLoading: boolean }>`
    height: 100%;
    padding: 8px;
    box-shadow: 1px 2px 9px #C8C8C8;

    background-color: ${props => props.isLoading ? '#E8E8E8' : '#ffffff'}
`;

export const StyledSendButton = styled(Button)`
    width: 100px;
    height: 100%;
    background-color: #3f51b5;
    box-shadow: 1px 2px 9px #C8C8C8;

    svg {
        color: #ffffff;
    }
`;

export const StyledMessageWrapper = styled.div`
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 16px;

    div:nth-child(even) {
        align-self: flex-end;
      }
      
    div:nth-child(odd) {
        align-self: flex-start;
    }

    &::-webkit-scrollbar {
        width: 12px;
    }

    // &::-webkit-scrollbar-track {
    //     background-color: #EDEDED;
    // }

    &::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 1px solid transparent;
        background-clip: padding-box;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }
`;

export const StyledLeftMessageBubble = styled.div`
    max-width: 70%;
    padding: 16px;
    background-color: #E8E8E8;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 8px;
    white-space: pre-wrap;
`;

export const StyledRightMessageBubble = styled.div`
    max-width: 70%;
    padding: 16px;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 8px;
    margin-right: 12px;
    white-space: pre-wrap;
`;