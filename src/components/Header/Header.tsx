import { Menu } from "antd";
import { StyledHeader, StyledMenu } from "./styles";
import { useDispatch } from "react-redux";
import { switchBot } from "../../redux/chatbotSlice";
import { botData } from "../../contexts/botData";

const Header = () => {
    const dispatch = useDispatch();

    return (
        <StyledHeader className="header">
            Long's Miscellany
            <StyledMenu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['chatgpt']}
                onClick={(e) => dispatch(switchBot(botData.find((bots) => bots.key === e.key)))}
                items={[
                    {
                        key: 'chatgpt',
                        label: 'ChatGPT-3.5',
                    },
                    {
                        key: 'nahidabot',
                        label: 'NahidaBot',
                    },
                    {
                        key: 'tsunbot',
                        label: 'TsunBot',
                    },
                ]}
            />
        </StyledHeader>
    );
}

export default Header;