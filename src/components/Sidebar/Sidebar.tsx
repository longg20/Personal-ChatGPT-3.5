import { useState, useEffect } from 'react';
import { Dropdown, MenuProps } from "antd";
import { StyledAddButton, StyledMenu, StyledMenuItem, StyledSidebar } from "./styles";
import { Add, ChatBubbleOutline, Edit } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { addNewConversation, changeConversationName, deleteConversation, duplicateConversation, switchConversation } from '../../redux/chatbotSlice';
import { InputModal } from '../Modals/InputModal';
import { WarningModal } from '../Modals/WarningModal';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const conversations = useSelector((state: RootState) => state.chatbot.conversations);
  const selectedConvKey = useSelector((state: RootState) => state.chatbot.selectedConvKey);
  const isLoading = useSelector((state: RootState) => state.chatbot.isLoading);
  const [isShowInputModal, setIsShowInputModal] = useState<boolean>(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: `Change conversation's name`,
      onClick: () => setIsShowInputModal(true),
    },
    {
      key: '2',
      label: `Duplicate conversation`,
      onClick: () => dispatch(duplicateConversation()),
    },
    {
      key: '3',
      label: `Delete conversation`,
      onClick: () => setIsShowDeleteModal(true),
    },
  ];

  return (
      <StyledSidebar
        theme='light'
        width={250}
        collapsible
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
      >
        <StyledAddButton collapsed={collapsed ? 1 : 0} icon={<Add />} onClick={() => dispatch(addNewConversation())}>
          { !collapsed ? 'New conversation' : ' ' }
        </StyledAddButton>

        <StyledMenu
            mode="inline"
            defaultSelectedKeys={[conversations[0].key]}
            selectedKeys={[selectedConvKey]}
            style={{ height: '100%', borderRight: 0 }}
            disabled={isLoading}
            items={conversations.map((conv) => ({
              key: conv.key,
              label: (
                <StyledMenuItem>
                  {conv.label}
                  <Dropdown menu={{ items }} placement="bottomLeft" arrow trigger={['click']}>
                    <Edit className='edit-icon' />
                  </Dropdown>
                </StyledMenuItem>
              ),
              icon: <ChatBubbleOutline />,
              onClick: (e) => dispatch(switchConversation(e.key))
            }))}
        />

        <InputModal
          title='Change conversation name'
          open={isShowInputModal}
          onOk={(name) => dispatch(changeConversationName(name))}
          hideModal={() => setIsShowInputModal(false)}
          initialInput={conversations.find((conv) => conv.key === selectedConvKey)?.label}
        />

        <WarningModal
          title='Delete Conversation'
          open={isShowDeleteModal}
          onOk={() => {
            dispatch(deleteConversation());
            dispatch(switchConversation(conversations[0].key));
          }}
          hideModal={() => setIsShowDeleteModal(false)}
          description='Confirm delete conversation?'
        />
      </StyledSidebar>
  );
}

export default Sidebar;