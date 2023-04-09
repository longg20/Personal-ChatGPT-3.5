import { useState } from 'react';
import { Menu } from "antd";
import { StyledAddButton, StyledSidebar } from "./styles";
import { Add } from '@mui/icons-material';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
      <StyledSidebar
        theme='light'
        width={250}
        collapsible
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
      >
        <StyledAddButton icon={<Add />}>
          New conversation
        </StyledAddButton>
        <Menu
            mode="inline"
            defaultSelectedKeys={['chatgpt1']}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                key: 'chatgpt1',
                label: `ChatGPT-3.5 Chat 1`,
              },
              {
                key: 'chatgpt2',
                label: `ChatGPT-3.5 Chat 2`,
              },
            ]}
        />
      </StyledSidebar>
  );
}

export default Sidebar;