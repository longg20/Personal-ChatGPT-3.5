import { useEffect, useRef } from 'react';
import { StyledLeftAvatar, StyledLeftMessageBubble, StyledLeftMessageWrapper, StyledLeftName, StyledMessageWrapper, StyledRefreshButton, StyledRightMessageBubble } from "./styles";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Message = () => {
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const bot = useSelector((state: RootState) => state.chatbot.bot);
    const messages = useSelector((state: RootState) => state.chatbot.messages);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages.length]);

    function getMarkupFromPseudoMarkdown(value: string) {
        return value
          .split(/(\*)/)
          .reduce((accumulator: string, currentValue: string, index: number, matchList: string[]) => {
            if (currentValue !== '*') {
              if (
                matchList[index - 1] === '*' &&
                matchList[index + 1] === '*' &&
                currentValue.substring(0, 1) !== ' '
              ) {
                accumulator = `${ accumulator } <i style="color:#B8B8B8">${ currentValue }</i>`;
              } else {
                accumulator = `${ accumulator }${ currentValue }`;
              }
            }
            return accumulator;
          })
          .replace(/\n/g, '<br\/>')
          .replace(/\s+/g, ' ')
          .trim();
    }

    return (
        <StyledMessageWrapper>
            {messages.map((message, index) => (
                message.role === 'user'
                ?
                <StyledRightMessageBubble className='user' key={index} dangerouslySetInnerHTML={{__html: getMarkupFromPseudoMarkdown(message.content)}} />
                :
                message.role === 'assistant'
                ?
                <StyledLeftMessageWrapper className='assistant' key={index}>
                    <StyledLeftAvatar width={50} src={bot.avatar} />
                    <StyledLeftName>{bot.name}</StyledLeftName>
                    <StyledLeftMessageBubble key={index} dangerouslySetInnerHTML={{__html: getMarkupFromPseudoMarkdown(message.content)}} />
                    <StyledRefreshButton />
                </StyledLeftMessageWrapper>
                : null
            ))}
            <div ref={messagesEndRef} />
        </StyledMessageWrapper>
    );
}

export default Message;