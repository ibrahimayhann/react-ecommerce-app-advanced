import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { addToBasket, handleDrawer, decreaseItem, removeItem, clearBasket } from '../redux/basketSlice';
import type { ProductType } from '../types/Types';
import QuantitySelector from './QuantitySelector';
import Button from '@mui/material/Button';
import '../css/BasketDetails.css';

function BasketDetails() {

    const dispatch = useDispatch();
    const { isDrawerOpen, basketItems, totalCount, totalAmount } = useSelector((state: RootState) => state.basket)

    const drawerControl = () => {
        dispatch(handleDrawer())
    }

    const hasItems = basketItems && basketItems.length > 0;

    return (
        <Drawer open={isDrawerOpen} anchor="right" onClose={drawerControl}>
            <div className="basket-drawer">
                <h2 className="basket-title">Sepetim</h2>

                {!hasItems && (
                    <p className="basket-empty">Sepetiniz şu an boş.</p>
                )}

                {hasItems && (
                    <>
                        <div className="basket-items">
                            {basketItems.map((product: ProductType) => (
                                <div className="basket-item" key={product.id}>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="basket-item-image"
                                    />

                                    <div className="basket-item-content">
                                        <div className="basket-item-header">
                                            <h4 className="basket-item-title">{product.title}</h4>
                                            <Button
                                                onClick={() => dispatch(removeItem(product))}
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                className="basket-remove-btn"
                                            >
                                                Sil
                                            </Button>
                                        </div>

                                        <div className="basket-item-middle">
                                            <QuantitySelector
                                                count={product.quantity}
                                                onIncrease={() => dispatch(addToBasket(product))}
                                                onDecrease={() => dispatch(decreaseItem(product))}
                                            />
                                            <span className="basket-item-size">
                                                Beden: {product.size}
                                            </span>
                                        </div>

                                        <div className="basket-item-bottom">
                                            <span className="basket-item-price">
                                                {product.price} ₺
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="basket-footer">
                            <div className="basket-summary">
                                <div className="basket-summary-row">
                                    <span>Toplam ürün</span>
                                    <span>{totalCount}</span>
                                </div>
                                <div className="basket-summary-row basket-summary-total">
                                    <span>Toplam tutar</span>
                                    <span>{totalAmount} ₺</span>
                                </div>
                            </div>

                            <div className="basket-footer-actions">
                                <Button
                                    onClick={() => dispatch(clearBasket())}
                                    variant="outlined"
                                    color="inherit"
                                    className="basket-clear-btn"
                                >
                                    Sepeti boşalt
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="basket-checkout-btn"
                                >
                                    Ödemeye geç
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Drawer>
    )
}

export default BasketDetails;
