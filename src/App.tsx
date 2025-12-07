
import { ToastContainer } from 'react-toastify'
import './App.css'
import RouterConfig from './config/RouterConfig'
import "react-toastify/dist/ReactToastify.css";
import Spinner from './component/Spinner';
import Navbar from './component/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import { useEffect } from 'react';
import { calculateTotals } from './redux/basketSlice';
import BasketDetails from './component/BasketDetails';


function App() {

  const { currentUser } = useSelector((state: RootState) => state.app);

  const { basketItems } = useSelector((state: RootState) => state.basket)

  const dispatch = useDispatch();

  useEffect(() => {//sepet her güncellendiğinde hesaplamalar da güncellensin
    dispatch(calculateTotals())
  }, [basketItems, dispatch])

  return (
    <div>

      {
        currentUser && <Navbar />
      }


      <RouterConfig />
      <ToastContainer autoClose={2500} />
      <Spinner />
      <BasketDetails />
    </div>
  )
}

export default App
