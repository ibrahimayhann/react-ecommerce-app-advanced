
import { ToastContainer } from 'react-toastify'
import './App.css'
import RouterConfig from './config/RouterConfig'
import "react-toastify/dist/ReactToastify.css";
import Spinner from './component/Spinner';

function App() {

  return (
    <div>

      <RouterConfig />
      <ToastContainer autoClose={2500} />
      <Spinner />
    </div>
  )
}

export default App
