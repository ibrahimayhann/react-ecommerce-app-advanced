import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { ProductType, UserType } from '../types/Types';
import { setCurrentUser, setLoading, setProducts } from '../redux/appSlice';
import productService from '../services/ProductService';
import { toast } from 'react-toastify';
import type { RootState } from '../redux/store';
import ProductCard from '../component/ProductCard';
import Container from '@mui/material/Container';
import Category from '../component/Category';


function HomePage() {
    const dispatch = useDispatch();

    const { products } = useSelector((state: RootState) => state.app);

    const getAllProducts = async () => {
        try {
            dispatch(setLoading(true))
            const response: ProductType[] = await productService.getAllProducts();
            if (response) {
                dispatch(setProducts(response))

            }


        } catch (error) {
            toast.error("Ürünler alınamadı:" + error)
        } finally {

            dispatch(setLoading(false))

        }
    }

    useEffect(() => {

        getAllProducts();

    }, [])






    //sayfa refresh yapıldığında currentuserı storagedean alıp state setliyoruz
    useEffect(() => {
        const result = localStorage.getItem("currentUser")
        if (result) {
            const currentUser: UserType = JSON.parse(result) as UserType;
            dispatch(setCurrentUser(currentUser))
        }
    }, [])

    return (
        <div>
            <Category />
            <Container maxWidth='xl'>


                <div className='homeCards'>
                    {
                        products && products.map((product: ProductType, index: number) => (
                            <ProductCard key={index} product={product} />
                        ))
                    }
                </div>


            </Container>

        </div>
    )
}

export default HomePage