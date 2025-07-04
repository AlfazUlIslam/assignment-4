import './App.css';
import { Outlet } from 'react-router';
import { Nav, Footer } from './components';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='app'>
      <Nav />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
