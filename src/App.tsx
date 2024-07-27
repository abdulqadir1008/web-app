import { BrowserRouter } from 'react-router-dom';
import './App.css';
// import './assets/global.css';
import './MainCSS.css';
import BottomMenu from './components/BottomMenu';
import ChatBox from './components/ChatBox';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import Body from './Routes/BodyRoutes';
import { Provider } from 'react-redux';
import configureStore from './redux/store';

function App() {
  // const apiKey = process.env.REACT_APP_API_KEY;
  // const import.meta.env.VITE_BACKEND_BASE_URL = process.env.REACT_APP_BASE_URL;

  // const ErrorHandler1 =( error:any,errorInfo:any) =>{
  //   // alert(error)
  // }
  const store = configureStore();
  return (
    <Provider store={store}>
      <div className="body-color">
        <BrowserRouter>
          <div className="sticky-top">
            <Header />
          </div>
          <div className="container-fluid min-vh-100  p-0  mobile-screen" style={{ marginBottom: '5rem' }}>
            <Body />
          </div>
          <ChatBox />
          <BottomMenu />
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
