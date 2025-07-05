import './App.css';
import { Outlet } from 'react-router';
import { Nav, Footer } from './components';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='app'>
      <Nav />
      <div className='h-[80vh]'>
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;
