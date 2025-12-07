import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoading } from '../redux/appSlice';
import ProductService from '../services/ProductService';
import type { ProductType } from '../types/Types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import QuantitySelector from './QuantitySelector';
import '../css/ProductDetails.css'
import { addToBasket, calculateTotals } from '../redux/basketSlice';

function ProductDetails() {

    const { productId } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState<ProductType>();


    const getProductById = async (productId: number) => {
        try {
            dispatch(setLoading(true))
            const product: ProductType = await ProductService.getProductById(productId)
            setProduct(product)
        } catch (error) {
            toast.error("Ürün alınamadı: " + error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        getProductById(Number(productId))
    }, [])

    useEffect(() => {
        const user = localStorage.getItem("currentUser");
        if (user) {
            dispatch(setCurrentUser(JSON.parse(user)));
        }
    }, []);


    const [fav, setFav] = useState(false);

    const [itemCount, setItemCount] = useState(1);
    const sizes = ["S", "M", "L", "XL"];
    const [selectedSize, setSelectedSize] = useState<string>();

    const addBasket = () => {
        if (product && selectedSize != null) {
            const payload: ProductType = {
                ...product,
                quantity: itemCount,
                size: selectedSize
            }
            dispatch(addToBasket(payload))
            dispatch(calculateTotals())
            toast.success("Ürün sepete eklendi")

        }
    }

    //Product varsa {} içindeki kodları çalıştır
    return (
        <Container maxWidth="lg" className="product-details-container">
            {product && (
                <div className="product-card">

                    <div className="product-image-wrapper">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="product-image"
                        />
                    </div>

                    <div className="product-info">
                        <h1 className="product-title">{product.title}</h1>

                        <p className="product-description">
                            {product.description}
                        </p>


                        <div className="product-price-row">
                            <span className="product-price">{product.price} ₺</span>
                            {fav ? (
                                <MdFavorite
                                    onClick={() => setFav(false)}
                                    className="favorite-icon favorite-icon-active"
                                />
                            ) : (
                                <MdFavoriteBorder
                                    onClick={() => setFav(true)}
                                    className="favorite-icon"
                                />
                            )}
                        </div>


                        <div className="product-sizes">
                            <span className="product-size-label">Beden:</span>

                            <div className="size-btn">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`size-btn-margin ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ADET + SEPETE EKLE (DAHA ALTA) */}
                        <div className="product-actions-row">
                            <div className="quantity-wrapper">
                                <QuantitySelector
                                    count={itemCount}
                                    onIncrease={() => setItemCount(itemCount + 1)}
                                    onDecrease={() => itemCount > 1 && setItemCount(itemCount - 1)}
                                />
                                {/* itemCount NET GÖRÜNSÜN DİYE YAZI DA KOYDUK */}
                                <span className="quantity-text">Adet: {itemCount}</span>
                            </div>

                            <Button
                                onClick={addBasket}
                                variant="contained"
                                className="add-to-basket-btn"
                            >
                                Sepete ekle
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    )
}

export default ProductDetails
