import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "../types/Types";


export interface BasketSliceType {
    basketItems: ProductType[],
    totalAmount: number,
    totalCount: number,
    isDrawerOpen: boolean
}


const getBasketFromLocalStorage = () => {
    const basketItems = localStorage.getItem("basketItems")
    if (basketItems) {
        return JSON.parse(basketItems);
    }
    return [];
}



const initialState: BasketSliceType = {
    basketItems: getBasketFromLocalStorage(),
    totalAmount: 0,
    totalCount: 0,
    isDrawerOpen: false,

};

const writeToLocalStorage = (basketItems: ProductType[]) => {
    localStorage.setItem("basketItems", JSON.stringify(basketItems))
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {

        //sepete ekle
        addToBasket: (state: BasketSliceType, action: PayloadAction<ProductType>) => {
            const itemIndex = state.basketItems.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0) {
                //ürün vardır quantity artır not:>0 kullanımı doğru 0. indexte de olabilir ürün
                state.basketItems[itemIndex].quantity += 1
            }
            else {
                //ürün ilk defa eklenecek quantity 1 yap
                state.basketItems.push({ ...action.payload, quantity: 1 })
            }
            writeToLocalStorage(state.basketItems)
        },

        //sepeti azalt
        decreaseItem: (state: BasketSliceType, action: PayloadAction<ProductType>) => {
            const itemIndex = state.basketItems.findIndex((item) => item.id === action.payload.id)
            if (itemIndex === -1) return;//dizide bu indexli item yoksa dokunmadan çık

            if (state.basketItems[itemIndex].quantity > 1) {
                //ürün 1 den fazla varsa azalt
                state.basketItems[itemIndex].quantity -= 1;//burada atama yok ama bi altta atama var
            }
            else {
                //ürün 1 ise tamamen çıkart
                state.basketItems = state.basketItems.filter((item) => item.id !== action.payload.id);

            }
            writeToLocalStorage(state.basketItems)
        },

        //sepetten 1 ürün  sil
        removeItem: (state: BasketSliceType, action: PayloadAction<ProductType>) => {
            state.basketItems = state.basketItems.filter((item) => item.id !== action.payload.id);
            writeToLocalStorage(state.basketItems)
        },

        //sepeti tamamen temizle
        clearBasket: (state: BasketSliceType) => {
            state.basketItems = []
            writeToLocalStorage([])//initial state zaten  storageden çektiği için gerek olmayabilir
            state.totalAmount = 0;
            state.totalCount = 0;
        },

        //hem toplam fiyat hem toplam count beraber hesapla
        calculateTotals: (state: BasketSliceType) => {
            const { totalAmount, totalCount } = state.basketItems.reduce((total, item) => {
                // Her ürünün toplam fiyatı → price * quantity
                total.totalAmount += item.price * item.quantity

                // Toplam ürün adedi → quantity toplamı

                total.totalCount += item.quantity;

                return total
            },
                {
                    totalAmount: 0, // başlangıç toplam fiyat
                    totalCount: 0,  // başlangıç toplam adet
                }
            )

            // Kuruşları yuvarla ve sonra toplam ücreti state yazdır
            state.totalAmount = Math.round(totalAmount * 100) / 100;

            // Toplam ürün adedini state’e yaz
            state.totalCount = totalCount
        },
        handleDrawer: (state: BasketSliceType) => {
            //tersini atayarak aç kapa mantığı
            state.isDrawerOpen = !state.isDrawerOpen
        }

    }
})

export const { addToBasket, decreaseItem, removeItem, clearBasket, calculateTotals, handleDrawer } = basketSlice.actions
export default basketSlice.reducer