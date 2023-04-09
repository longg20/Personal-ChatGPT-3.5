import { useState, useEffect } from 'react';
import { Menu } from "antd";
import { StyledAddButton, StyledSidebar } from "./styles";
import { Add } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { addNewConversation, switchConversation } from '../../redux/chatbotSlice';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const conversations = useSelector((state: RootState) => state.chatbot.conversations);
  const isLoading = useSelector((state: RootState) => state.chatbot.isLoading);
  const dispatch = useDispatch();

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
        <Menu
            mode="inline"
            defaultSelectedKeys={[conversations[0].key]}
            style={{ height: '100%', borderRight: 0 }}
            disabled={isLoading}
            items={conversations.map((conv) => ({
              key: conv.key,
              label: conv.label,
              onClick: (e) => dispatch(switchConversation(e.key))
            }))}
        />
      </StyledSidebar>
  );
}

export default Sidebar;