import { Routes, Route } from 'react-router-dom'
import HomePage from '../page/HomePage.tsx'
import LoginPage from '../page/LoginPage.tsx'
import RegisterPage from '../page/RegisterPage.tsx'
import ProductDetails from '../component/ProductDetails.tsx'


function RouterConfig() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/product-details/:productId' element={<ProductDetails />} />
        </Routes>
    )
}

export default RouterConfig