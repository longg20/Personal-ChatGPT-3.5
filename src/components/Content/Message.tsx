import { useEffect, useRef } from 'react';
import { StyledLeftAvatar, StyledLeftMessageBubble, StyledLeftMessageWrapper, StyledLeftName, StyledMessageWrapper, StyledNavigateBeforeButton, StyledNavigateButtonsWrapper, StyledNavigateNextButton, StyledRightMessageBubble, StyledRightMessageWarning, StyledRightMessageWrapper } from "./styles";
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { Refresh } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { messageDataType, removeMessageById, sendMessage, swipeMessage, swipeNewMessage } from '../../redux/chatbotSlice';
import _ from 'lodash';

const Message = () => {
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const bot = useSelector((state: RootState) => state.chatbot.bot);
    const selectedConvKey = useSelector((state: RootState) => state.chatbot.selectedConvKey);
    const conversations = useSelector((state: RootState) => state.chatbot.conversations);
    const dispatch = useDispatch<AppDispatch>();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [selectedConvKey, conversations]);

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
    };

    const getMessagesByConvKey = () => {
      const mssgs = conversations.find((conv) => conv.key === selectedConvKey)?.messages;
      return mssgs;
    };

    const getLastMessageByConvKey = () => {
      const mssg = conversations.find((conv) => conv.key === selectedConvKey)?.messages;
      if (mssg) return mssg[mssg.length - 1];
    };

    const resendMessage = () => {
      if (getLastMessageByConvKey()?.status === 'rejected') {
        dispatch(removeMessageById(getLastMessageByConvKey()?.id));
        dispatch(sendMessage(getLastMessageByConvKey()?.content!));
      }
    };

    const handleSwipeBefore = () => {
      if (getLastMessageByConvKey()?.swipeIndex !== -1) {
        dispatch(swipeMessage(-1));
      }
    };

    const handleSwipeNext = () => {
      if (_.isEmpty(getLastMessageByConvKey()?.swipe) || getLastMessageByConvKey()?.swipeIndex === getLastMessageByConvKey()?.swipe?.length! - 1) {
        dispatch(swipeNewMessage());
      } else {
        dispatch(swipeMessage(1));
      }
    };
 
    return (
        <StyledMessageWrapper>
            {getMessagesByConvKey()?.filter((mssg) => mssg.role !== 'system').map((message, index, messages) => (
                message.role === 'user'
                ?
                <StyledRightMessageWrapper className='user' key={index}>
                  <StyledRightMessageBubble dangerouslySetInnerHTML={{__html: getMarkupFromPseudoMarkdown(message.content)}} />
                  {
                    getLastMessageByConvKey()?.status === 'rejected' 
                    &&
                    <StyledRightMessageWarning onClick={() => resendMessage()}>
                      Connection error! Try again
                      <Refresh />
                    </StyledRightMessageWarning> 
                  }
                </StyledRightMessageWrapper>
                :
                message.role === 'assistant'
                ?
                <StyledLeftMessageWrapper className='assistant' key={index}>
                    <StyledLeftAvatar src={bot.avatar} />
                    <StyledLeftName>{bot.name}</StyledLeftName>
                    <StyledLeftMessageBubble dangerouslySetInnerHTML={{__html: getMarkupFromPseudoMarkdown(
                      (!message.swipe || message.swipeIndex === -1) ? message.content : message.swipe?.[message.swipeIndex || 0] || ''
                    )}} />
                    {
                      (index !== 0 && index === messages.length - 1)
                      &&
                      <StyledNavigateButtonsWrapper>
                        { (message.swipe && message.swipeIndex !== -1) && <StyledNavigateBeforeButton onClick={() => handleSwipeBefore()} /> }
                        { (message.swipe && _.isNumber(message.swipeIndex)) && `${message?.swipeIndex + 2}/${message?.swipe?.length + 1}`}
                        <StyledNavigateNextButton onClick={() => handleSwipeNext()} />
                      </StyledNavigateButtonsWrapper>
                    }
                </StyledLeftMessageWrapper>
                : null
            ))}
            <div ref={messagesEndRef} />
        </StyledMessageWrapper>
    );
}

export default Message;