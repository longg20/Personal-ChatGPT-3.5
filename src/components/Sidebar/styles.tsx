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

export const StyledAddButton = styled(Button)`
    width: calc(100% - 32px);
    margin: 16px;
    display: flex;
    align-items: center;
    height: 50px;

    svg {
        margin-right: 5px;
    }
`;