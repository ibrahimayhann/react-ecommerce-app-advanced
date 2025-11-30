import React, { useEffect, useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { setLoading, setProducts } from '../redux/appSlice';
import CategoryService from '../services/CategoryService';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import type { ProductType } from '../types/Types';

function Category() {
    const [categories, setCategories] = useState<string[]>();
    const dispatch = useDispatch();

    const getAllCategories = async () => {
        try {
            dispatch(setLoading(true))
            const categories: string[] = await CategoryService.getAllCategories();
            setCategories(categories)

        } catch (error) {
            toast("Kategoriler alınamadı :" + error)

        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    const handleCategory = async (e: React.ChangeEvent<HTMLInputElement>, categoryName: string) => {

        try {
            dispatch(setLoading(true))
            if (e.target.checked) {
                //kategoriye göre ürünleri getir
                const response: ProductType[] = await CategoryService.getProductsByCategory(categoryName)
                response && dispatch(setProducts(response))
            } else {
                //tüm ürünleri getir
                const response: ProductType[] = await productService.getAllProducts();
                response && dispatch(setProducts(response))

            }
        } catch (error) {
            toast("Kategoriler alınamadı :" + error)

        } finally {
            dispatch(setLoading(false))
        }

    }

    return (
        <FormGroup>
            {
                categories && categories.map((category: string, index: number) => (

                    <FormControlLabel
                        key={index}
                        control={<Checkbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCategory(e, category)} />}
                        label={category}
                        sx={{ color: 'text.primary' }}
                    />

                ))
            }

        </FormGroup>
    )
}

export default Category