import { Button, Layout } from 'antd';
import styled from 'styled-components';

const { Sider } = Layout;

export const StyledSidebar = styled(Sider)`
    overflow: hidden;
    height: calc(100vh - 65px);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    .ant-menu-item-only-child {
    }
`;

export const StyledAddButton = styled(Button)<{ collapsed: number }>`
    width: calc(100% - 32px);
    margin: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    white-space: nowrap;
    overflow: hidden;
    padding: 0;

    svg {
        margin: ${(props) => props.collapsed ? '0' : '0 5px 0 -10px'};
    }
`;