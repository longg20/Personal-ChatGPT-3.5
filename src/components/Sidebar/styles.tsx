import { Button, Layout, Menu } from 'antd';
import styled from 'styled-components';

const { Sider } = Layout;

export const StyledSidebar = styled(Sider)`
    overflow: hidden;
    height: calc(100vh - 65px);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
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

export const StyledMenu = styled(Menu)`
    li {
        padding-left: 16px !important;
    }

    .ant-menu-item-selected {
        .edit-icon {
            opacity: 0.5;
        }
    }
`;

export const StyledMenuItem = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 25px;

    &:hover {
        svg {
            opacity: 0.5;
        }
    }

    svg {
        opacity: 0;
        position: absolute;
        right: 15px;
        top: 7px;

        &:hover {
            border: 1px solid rgba(0,0,0,0.05);
            border-radius: 50%;
            opacity: 0.7;
        }
    
        &:active {
            transform: translateY(1px);
        }
    }
`;