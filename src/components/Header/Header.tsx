import { Menu } from "antd";
import { StyledHeader, StyledMenu } from "./styles";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { switchBot } from "../../redux/chatbotSlice";
import { botData } from "../../contexts/botData";

const Header = () => {
    const dispatch = useDispatch();

    return (
        <StyledHeader>
            Long's Miscellany
            <StyledMenu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['chatgpt']}
                onClick={(e) => dispatch(switchBot(botData.find((bots) => bots.key === e.key)))}
            >
                <Menu.Item key="chatgpt"><Link to={"/chatgpt"}>ChatGPT-3.5</Link></Menu.Item>
                <Menu.Item key="nahidabot"><Link to={"/nahidabot"}>NahidaBot</Link></Menu.Item>
                <Menu.Item key="tsunbot"><Link to={"/tsunbot"}>TsunBot</Link></Menu.Item>
            </StyledMenu>
        </StyledHeader>
    );
}

export default Header;