import { Layout } from "antd";
import Header from "./components/Header/Header";
import ChatbotContent from "./components/Content/ChatbotContent";

function App() {
  return (
    <Layout style={{height:"100vh"}}>
      <Header />
      <ChatbotContent />
    </Layout>
  );
}

export default App;
