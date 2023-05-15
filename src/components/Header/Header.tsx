import { StyledHeader, StyledLock, StyledMenu } from "./styles";
import { useDispatch } from "react-redux";
import { switchBot, unlockBot } from "../../redux/chatbotSlice";
import { botData } from "../../contexts/botData";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { InputModal } from "../Modals/InputModal";
import { useState } from "react";

const Header = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.chatbot.isLoading);
    const isUnlocked = useSelector((state: RootState) => state.chatbot.isUnlocked);
    const [isShowInputModal, setIsShowInputModal] = useState<boolean>(false);

    const items = [
        {
            key: 'chatgpt',
            label: 'ChatGPT-3.5',
            disabled: false,
        },
        {
            key: 'dogbot',
            label: 'DogBot',
            disabled: false,
        },
        {
            key: 'nahidabot',
            label: 'NahidaBot',
            disabled: !isUnlocked,
        },
        {
            key: 'tsunbot',
            label: 'TsunBot',
            disabled: !isUnlocked,
        },
    ];

    return (
        <>
            <StyledHeader className="header">
                Long's Miscellany
                <StyledMenu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['chatgpt']}
                    onClick={(e) => dispatch(switchBot(botData.find((bots) => bots.key === e.key)))}
                    disabled={isLoading}
                    items={items.filter((item) => !item.disabled)}
                />
                
                {isUnlocked === false ? <StyledLock onClick={() => setIsShowInputModal(true)} /> : null}
            </StyledHeader>

            <InputModal
                title='Unlock Password'
                open={isShowInputModal}
                onOk={(input) => dispatch(unlockBot(input))}
                hideModal={() => setIsShowInputModal(false)}
            />
        </>
    );
}

export default Header;