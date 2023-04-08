import { Layout } from "antd";
import Header from "./components/Header/Header";
import ChatbotContent from "./components/Content/ChatbotContent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <Layout style={{height:"100vh"}}>
      <ToastContainer
        position="top-center"
        style={{ width: 570 }}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Header />
      
      <Layout>
        <Sidebar />
        <ChatbotContent />
      </Layout>
    </Layout>
  );
}

export default App;
