import styled from 'styled-components';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

export const StyledHeader = styled(Header)`
    height: 65px;
    color: #ffffff;
    font-size: 18px;

    display: flex;
    gap: 36px;
`;

export const StyledMenu = styled(Menu)`
    .ant-menu-item {
        font-size: 15px;
    }

    .ant-menu-item-selected {
        background-color: #003364 !important;
    }
`