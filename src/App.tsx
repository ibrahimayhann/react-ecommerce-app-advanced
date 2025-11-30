
import { ToastContainer } from 'react-toastify'
import './App.css'
import RouterConfig from './config/RouterConfig'
import "react-toastify/dist/ReactToastify.css";
import Spinner from './component/Spinner';
import Navbar from './component/Navbar';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/store';


function App() {

  const { currentUser } = useSelector((state: RootState) => state.app);

  return (
    <div>

      {
        currentUser && <Navbar />
      }


      <RouterConfig />
      <ToastContainer autoClose={2500} />
      <Spinner />
    </div>
  )
}

export default App
