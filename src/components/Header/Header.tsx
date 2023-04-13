import { StyledHeader, StyledMenu } from "./styles";
import { useDispatch } from "react-redux";
import { switchBot } from "../../redux/chatbotSlice";
import { botData } from "../../contexts/botData";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const Header = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.chatbot.isLoading);

    return (
        <StyledHeader className="header">
            Long's Miscellany
            <StyledMenu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['chatgpt']}
                onClick={(e) => dispatch(switchBot(botData.find((bots) => bots.key === e.key)))}
                disabled={isLoading}
                items={[
                    {
                        key: 'chatgpt',
                        label: 'ChatGPT-3.5',
                    },
                    {
                        key: 'dogbot',
                        label: 'DogBot',
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