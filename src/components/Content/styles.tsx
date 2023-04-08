import styled from 'styled-components';
import { Content } from 'antd/es/layout/layout';
import { Input, Button, Image } from 'antd';
import { Refresh } from '@mui/icons-material';

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
`;

export const StyledChatboxHeader = styled.div`
    border-bottom: 1px solid rgba(0,0,0,0.1);
    margin: -16px -16px 0 -16px;
    padding: 16px;
    box-shadow: 1px 2px 9px -5px #B8B8B8;
    display: flex;
    justify-content: flex-end;

    svg {
        width: 40px;
        color: #C8C8C8;

        &:hover {
            color: #A8A8A8;
            cursor: pointer;
        }
    }
`;

export const StyledTextInputWrapper = styled.div`
    height: 70px;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-top: auto;
`;

export const StyledTextInput = styled(TextArea)`
    height: 100%;
    padding: 8px;
    box-shadow: 1px 2px 9px #C8C8C8;
    background-color: #fff;
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
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 16px;

    .user {
        align-self: flex-end;
      }
      
    .assistant {
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
    padding: 16px;
    background-color: #E8E8E8;
    border: 1px solid #D0D0D0;
    border-radius: 8px;
    white-space: pre-wrap;
    margin-left: 70px;
    margin-top: 22px;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-top: 15px solid #E8E8E8;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        top: 0;
        left: -15px;
    }

    &:before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-top: 17px solid #D0D0D0;
        border-left: 16px solid transparent;
        border-right: 16px solid transparent;
        top: -1px;
        left: -17px;
    }
`;

export const StyledLeftMessageWrapper = styled.div`
    position: relative;
    max-width: 70%;
`;

export const StyledLeftAvatar = styled(Image)`
    border-radius: 50%;
    position: absolute;
`;

export const StyledLeftName = styled.div`
    position: absolute;
    left: 72px;
    font-weight: bold;
`;

export const StyledRightMessageWrapper = styled.div`
    position: relative;
    max-width: 70%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 12px;
`;

export const StyledRightMessageBubble = styled.div`
    display: inline-block;
    padding: 16px;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,0.1);
    border-radius: 8px;
    white-space: pre-wrap;
`;

export const StyledRightMessageWarning = styled.span`
    color: red;
    margin-top: 6px;
    cursor: pointer;
    text-decoration: underline;
    opacity: 0.7;

    svg {
        vertical-align: middle;
        font-size: 16px;
        margin-left: 3px;
    }

    &:hover {
        opacity: 1;
    }

    &:active {
        transform: translateY(1px);
    }
`;

export const StyledRefreshButton = styled(Refresh)`
    position: absolute;
    top: calc(50% + 8px);
    right: -30px;
    background-color: white;
    opacity: 0.4;

    &:hover {
        opacity: 1;
        cursor: pointer;
    }

    &:active {
        transform: translateY(1px);
    }
`;