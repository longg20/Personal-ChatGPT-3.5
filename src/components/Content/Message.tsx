import { useEffect, useRef } from 'react';
import { StyledLeftMessageBubble, StyledMessageWrapper, StyledRightMessageBubble } from "./styles";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Message = () => {
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const messages = useSelector((state: RootState) => state.chatbot.messages);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages.length]);

    return (
        <StyledMessageWrapper>
            {messages.map((message, index) => (
                message.role === 'user'
                ?
                <StyledRightMessageBubble key={index}>{message.content}</StyledRightMessageBubble>
                :
                <StyledLeftMessageBubble key={index}>{message.content}</StyledLeftMessageBubble>
            ))}
            <div ref={messagesEndRef} />
        </StyledMessageWrapper>
    );
}

export default Message;