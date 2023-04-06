import { Layout } from "antd";
import Header from "./components/Header/Header";
import ChatbotContent from "./components/Content/ChatbotContent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Layout style={{height:"100vh"}}>
      <ToastContainer 
        position="top-center"
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
      <ChatbotContent />
    </Layout>
  );
}

export default App;
