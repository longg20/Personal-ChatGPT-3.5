import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import { Lock } from '@mui/icons-material';

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
`;

export const StyledLock = styled(Lock)`
    position: absolute;
    top: 20px;
    right: 20px;

    opacity: 0.7;
    cursor: pointer;

    &:hover {
        opacity: 1;
    }

    &:active {
        transform: translateY(1px);
    }
`;